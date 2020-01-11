import palette from '../palette';
import typography from '../typography';

export default {
    root: {
        ...typography.body1,
        borderBottom: `1px solid ${palette.divider}`,
        padding: '14px 16px',
    },
    head: {
        ...typography.body2,
    },
};
