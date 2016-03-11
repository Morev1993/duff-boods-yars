import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'reducers';

const router = routerMiddleware(hashHistory);

const middleware = [thunk, router];

const enhancers = compose(
  applyMiddleware(...middleware)
);

export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    );
  }

  return store;
}
