import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import AuthSlice from "features/auth/model/auth.slice";
import UsersSlice from "entities/user/model/user.slice";
import ChatSlice from "features/chat/model/chat.slice";

const authPersistConfig = {
  key: "auth",
  storage: storageSession,
};

const usersPersistConfig = {
  key: "users",
  storage,
};

const chatPersistConfig = {
  key: "chat",
  storage,
};

const rootReducer = combineReducers({
  Auth: persistReducer(authPersistConfig, AuthSlice.reducer),
  Users: persistReducer(usersPersistConfig, UsersSlice.reducer),
  Chat: persistReducer(chatPersistConfig, ChatSlice.reducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
