import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { adminReducer } from "./slices/roles/admin";
import { peopleReducer } from "./slices/roles/people";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { subadminReducer } from "./slices/roles/subadmin";
import { userInfoReducer } from "./slices/userInfo";
import { SelectBusReducer } from "./slices/selectBus";

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  subadmin: subadminReducer,
  people: peopleReducer,
  userInfo: userInfoReducer,
  selectBus: SelectBusReducer
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["userInfo", "selectBus"], // Исключаем срез "userInfo" из сохранения
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  //   auth: authReducer,
  //   admin: adminReducer,
  //   people: peopleReducer,
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
