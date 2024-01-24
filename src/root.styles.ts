import { createUseStyles } from 'react-jss';
import background from './background.webp';

export const useStyles = createUseStyles({
    startContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '100vw',
        height: '100vh',
        background: '#565A3A',
        color: '#FFFFFF',
    },
    wrapper: {
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 4,
    },
    subTitle: {
        marginBottom: 36,
    },
    link: {
        color: '#FFFFFF',
        opacity: 0.1,
        marginBottom: 8,
    },
    button: {
        background: '#A8AD8B',
        padding: '12px 24px',
        borderRadius: 16,
        fontWeight: 500,
        cursor: 'pointer',
        zIndex: 2,
    },
    container: {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        color: '#FFFFFF',

        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
    },
    result: {
        width: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        fontSize: 32,
        fontWeight: 600,
    },
    circle: {
        width: 160,
        height: 160,
        marginBottom: 48,
        borderRadius: '50%',
        border: '2px solid #A8AD8B',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        backdropFilter: 'blur(2px)',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percents: {
        fontWeight: 800,
        fontSize: 36,
    },
    characterContainer: {
        width: '100%',
        height: 250,
        pointerEvents: 'all',

        position: 'fixed',
        left: 0,
        bottom: -75,
        zIndex: 1,
    },
    character: {
        height: 250,
    },
    animating: {
        animation: '$vertical-rotate 3s',
    },
    '@keyframes vertical-rotate': {
        '0%': { marginTop: '0' },
        '25%': { marginTop: '-3px' },
        '50%': { marginTop: '0' },
        '75%': { marginTop: '3px' },
        '100%': { marginTop: '0' },
    },
});
