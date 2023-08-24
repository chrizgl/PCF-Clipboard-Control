import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { Icon } from '@fluentui/react';
import {
    makeStyles,
    mergeClasses,
    tokens,
    shorthands,
    Button,
    FluentProvider,
    webLightTheme,
    Input,
    InputProps,
    useId,
} from '@fluentui/react-components';
import { useEffect, useState } from 'react';

export interface IClipboardProps {
    input: string;
    isPassword: boolean;
    isDisabled: boolean;
    onInputChange: (input: string) => void;
}

const useStyles = makeStyles({
    stack: {
        // must be merged with stackHorizontal or stackVertical
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        height: 'fit-content',
        boxSizing: 'border-box',
        '> *': {
            textOverflow: 'ellipsis',
        },
    },
    stackHorizontal: {
        // overrides for horizontal stack
        flexDirection: 'row',
        marginLeft: '0px',
        '> :not(:last-child)': {
            marginRight: '1px',
        },
    },
    stackVertical: {
        // overrides for vertical stack
        flexDirection: 'column',
        marginLeft: '5px',
        '> :not(:first-child)': {
            marginTop: '10px',
        },
    },
    stackitem: {
        height: 'fit-content',
        width: '100%',
        alignSelf: 'right',
        flexShrink: 1,
    },
    stackitemSliderVertical: {
        alignSelf: 'left',
        marginLeft: '10px',
        flexShrink: 1,
    },
    stackitemBadgeVertical: {
        alignSelf: 'left',
        marginLeft: '5px',
        flexShrink: 1,
    },
    tooltip: {
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
    },
});

const ClipboardControlApp = (props: IClipboardProps): React.JSX.Element => {
    const classes = useStyles();
    const stackClasses = mergeClasses(classes.stack, classes.stackHorizontal);
    const iconOnClick = () => {
        copy(inputValue);
    };
    const id = useId();
    const [inputValue, setInputValue] = useState(props.input);
    const onInputChange: InputProps['onChange'] = (_, data) => {
        setInputValue(data.value);
        props.onInputChange(data.value);
    };
    useEffect(() => {
        if (inputValue !== props.input) {
            setInputValue(props.input);
        }
    }, [props.input, inputValue]);

    return (
        <FluentProvider theme={webLightTheme}>
            <div className={stackClasses}>
                <Input id={id} className={classes.stackitem} value={inputValue} onChange={onInputChange} />
                <Button className={classes.stackitem} icon={<Icon iconName='Copy' onClick={iconOnClick} />}></Button>
            </div>
        </FluentProvider>
    );
};

export default ClipboardControlApp;
