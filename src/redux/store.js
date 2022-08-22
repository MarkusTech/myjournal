// configureStore.js

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
}


// export default () => {
//     let store = createStore(persistReducer);
//     let persistor = persistStore(store);
//     return { store, persistor }
// }


const persistedReducer = persistReducer(persistConfig, rootReducer)
export let store = createStore(persistedReducer)
export let persistor = persistStore(store)