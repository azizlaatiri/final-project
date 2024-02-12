import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from 'redux-thunk';
import { CarsReducer } from './reducers/CarsReducer';
import { AlertReducer } from './reducers/AlertReducer';
const composeEnhancers = composeWithDevTools({
});
const rootReducer=combineReducers({
    AlertReducer,
    CarsReducer
})
const store = createStore(
    rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  ),
);
export default store