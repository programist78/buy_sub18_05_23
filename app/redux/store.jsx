import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH, 
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
  
const rootReducer = combineReducers({
  auth: authReducer,
})

const persistConfig = 
{
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  // reducer: combineReducers,
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware(
    {
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }
  )
});


export const persistor = persistStore(store)
export default store



