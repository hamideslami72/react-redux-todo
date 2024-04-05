import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todosReducer from './slices/todoSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
// import rootReducer from './reducers'

const rootReducer = combineReducers({
  todos: todosReducer,
})
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos'],
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

let persistor = persistStore(store)

export { store, persistor }