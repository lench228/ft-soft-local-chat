import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../../features/auth/model/auth.slice.ts";
import storage from "redux-persist/lib/storage";
import {persistStore, persistReducer} from "redux-persist";




const persistConfig = {
    key: "root",
    storage,
    whitelist: ["Filter"],
};

const persistedReducer = persistReducer(persistConfig, AuthSlice.reducer);


const store = configureStore({
    reducer: {
        [AuthSlice.name]: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});



export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
