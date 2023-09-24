import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authReducer } from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

// Налаштування для redux-persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

console.log("persistedReducer", persistedReducer);
// Створення Redux Store з persistReducer
const store = configureStore({
  reducer: persistedReducer,
});
console.log("store", store);
// Створення persistor для redux-persist
const persistor = persistStore(store);

console.log("persistor", persistor);

export { store, persistor };
