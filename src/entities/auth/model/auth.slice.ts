import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iPendingProps } from "shared/types";
import { User } from "entities/user/model/user.slice";

interface iAuthSlice extends iPendingProps {
  isAuthenticated: boolean;
  currentChatId: string;
  user: User;
}

const initialState: iAuthSlice = {
  isAuthenticated: false,
  user: { id: "0", name: "0" },
  currentChatId: "",

  isLoading: false,
  error: "",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
    loginUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = false;
      state.user = action.payload;
    },
  },
  selectors: {
    selectIsAuth: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
    selectCurrentChatId: (state) => state.currentChatId,
  },
});

export const { selectIsAuth, selectUser, selectCurrentChatId } =
  AuthSlice.selectors;
export const { loginUser, logoutUser, setCurrentChat } = AuthSlice.actions;

export default AuthSlice;
