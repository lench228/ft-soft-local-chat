
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import {iPendingProps} from "../../../shared/types";

interface iAuthSlice extends  iPendingProps{
    user: {
        name: string,
        id:string,
    }
    isAuthenticated: boolean;
}

const initialState: iAuthSlice = {
    user: {
        name: '',
        id:'',
    },
    isAuthenticated: false,
    isLoading:false,
    error:''
}

const loadState = (): iAuthSlice => {
    try{
    const serializedState = sessionStorage.getItem("authState");
    if (serializedState === null) {
        return initialState;
    }
    return JSON.parse(serializedState)}
 catch
{
    return initialState;
}}

const saveState = (state: iAuthSlice) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("authState", serializedState);
    } catch (err) {
        console.error(err);
    }
};

export  const AuthSlice = createSlice({
    name:'Auth',
    initialState: loadState(),
    reducers:{
        regUser: (store, action: PayloadAction<string>) => {
            store.user = {name: action.payload,id: uuidv4()};
            store.isAuthenticated = true;

            localStorage.setItem(action.payload, store.user.id)
            saveState(store);
        },
        loginUser: (store, action: PayloadAction<{ name: string, id: string }>) => {
            store.user = {name:action.payload.name, id: action.payload.id};
            store.isAuthenticated = true;
            saveState(store);
        }
    },
    selectors:{
        selectIsAuth: (state)  => state.isAuthenticated,
        selectIsLoading: (state) => state.isLoading,
        selectUser: (state) => state.user
    }

})

export const {selectUser, selectIsLoading, selectIsAuth} = AuthSlice.selectors;
export const {regUser, loginUser} = AuthSlice.actions;

export default AuthSlice;