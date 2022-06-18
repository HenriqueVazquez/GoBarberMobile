import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './modules/rootReducer';

import persistReducers from './persistReducers';

import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const enhancer = __DEV__ ? console.tron.createEnhancer() : null;

const saga = createSagaMiddleware(sagaMonitor);

const persistedReducer = persistReducers(rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [saga],
  enhancers: [enhancer],
});

const persistor = persistStore(store);

saga.run(rootSaga);

export {store, persistor};
