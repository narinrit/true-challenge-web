import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth/reducers';
import viewReducer from './view/reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer,
});

export default function makeStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware)),
    );
}
