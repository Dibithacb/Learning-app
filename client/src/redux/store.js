import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storageImport from "redux-persist/lib/storage";

const storage = storageImport.default || storageImport; // defaults to localStorage for web
//Application->Local storage

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['user']//which values need to persist
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user:persistedReducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false
    })
  
})

export const persistor=persistStore(store)