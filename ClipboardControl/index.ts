import { IInputs, IOutputs } from './generated/ManifestTypes';
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Clipboard, IClipboardProps } from './Clipboard';

// new imports:
import { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

export class ClipboardControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _root: Root;
    private _value: string;
    private _notifyOutputChanged: () => void;
    private _Clipboard: Clipboard;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement,
    ) {
        const textValue = context.parameters.textField.raw || '';
        const isSecure = context.parameters.isSecure.raw == 'hide';
        const props: IClipboardProps = {
            textValue: textValue,
            isPassword: isSecure,
            isDisabled: context.mode.isControlDisabled,
            onChange: (text) => {
                this._value = text;
                this._notifyOutputChanged();
            },
        };
        this._Clipboard = new Clipboard(props);
        this._root = createRoot(container);

        this._notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const textValue = context.parameters.textField.raw || '';
        const isSecure = context.parameters.isSecure.raw == 'hide';

        const props: IClipboardProps = {
            textValue: textValue,
            isPassword: isSecure,
            isDisabled: context.mode.isControlDisabled,
            onChange: (text) => {
                this._value = text;
                this._notifyOutputChanged();
            },
        };
        this._root.render(createElement(this._Clipboard.render, props));
    }

    public getOutputs(): IOutputs {
        return {
            textField: this._value,
        };
    }

    public destroy(): void {
        this._root.unmount();
    }
}
