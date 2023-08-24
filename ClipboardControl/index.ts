import { IInputs, IOutputs } from './generated/ManifestTypes';
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import ClipboardControlApp, { IClipboardProps } from './Clipboard';

// new imports:
import { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

export class ClipboardControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _notifyOutputChanged: () => void;
    private _root: Root;
    private _props: IClipboardProps = {
        input: '',
        isPassword: false,
        isDisabled: false,
        onInputChange: this.notifyChange.bind(this),
    };
    private _inputValue: string;

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
        this._props.input = context.parameters.input.raw ?? '';
        this._props.isPassword = context.parameters.isSecure.raw == 'hide';
        this._props.isDisabled = context.mode.isControlDisabled;

        this._root.render(createElement(ClipboardControlApp, this._props));
    }

    private notifyChange(newinputvalue: string) {
        this._inputValue = newinputvalue;
        this._notifyOutputChanged();
    }

    public getOutputs(): IOutputs {
        return {
            input: this._inputValue,
        };
    }

    public destroy(): void {
        this._root.unmount();
    }
}
