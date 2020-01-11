import {
    AuthState, SIGN_OUT, SIGNED_IN,
} from './types';

const initialState: AuthState = {
    isAuth: false,
    user: null,
};

export default (state = initialState, action): AuthState => {
    switch (action.type) {
        case SIGNED_IN:
            return {
                ...state,
                isAuth: true,
                user: action.payload,
            };

        case SIGN_OUT:
            return {
                ...state,
                isAuth: false,
                user: null,
            };

        default:
            return state;
    }
};
