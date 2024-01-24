import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    content: {
        width: 600,
        height: 800,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    option: {
        transition: '200ms',
        width: '100%',
        height: 40,
        background: 'rgba(0, 0, 0, .35)',
        border: '2px solid transparent',
        backdropFilter: 'blur(3px)',
        marginBottom: 4,
        borderRadius: 10,
        cursor: 'pointer',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&:hover': {
            background: 'rgba(0, 0, 0, .5)',
            transition: '200ms',
        },
    },
    selected: {
        border: '2px solid #565A3A',
        boxShadow: '0px 0px 20px 0px rgba(86, 90, 58, 0.7) inset',
        transition: '200ms',

        '&:hover': {
            background: 'rgba(0, 0, 0, .4)',
            transition: '200ms',
        },
    },
    controls: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backdropFilter: 'blur(3px)',
        color: '#FFFFFF',
        background: 'rgba(0, 0, 0, .35)',
        minWidth: 42,
        height: 42,
        padding: 8,
        borderRadius: 8,
        fontWeight: 500,
        cursor: 'pointer',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0,
        pointerEvents: 'none',
    },
});
