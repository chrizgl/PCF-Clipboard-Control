import { IInputs, IOutputs } from './generated/ManifestTypes';
import ClipboardControlApp, { IClipboardProps } from './Clipboard';
import { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

export class ClipboardControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _notifyOutputChanged: () => void;
    private _root: Root;
    private _inputValue: string;
    private _isReadOnly: boolean;

    constructor() {}

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement,
    ) {
        this._root = createRoot(container!);
        this._notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const inputValue = context.parameters.input.raw ?? '';
        const isPassword = context.parameters.isSecure.raw == 'hide';
        const isDisabled = context.mode.isControlDisabled;
        const props: IClipboardProps = {
            input: inputValue,
            isPassword: isPassword,
            isDisabled: isDisabled,
            onInputChange: (text) => {
                this._inputValue = text;
                this.onChange();
            },
        };
        this._root.render(createElement(ClipboardControlApp, props));
    }

    public getOutputs(): IOutputs {
        return {
            input: this._inputValue,
        };
    }

    public destroy(): void {
        this._root.unmount();
    }

    private onChange = () => {
        this._notifyOutputChanged();
    };
}
