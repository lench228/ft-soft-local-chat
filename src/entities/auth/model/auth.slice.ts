import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iPendingProps } from "shared/types";
import { User } from "entities/user/model/user.slice";

interface iAuthSlice extends iPendingProps {
  isAuthenticated: boolean;

  user: User;
}

const initialState: iAuthSlice = {
  isAuthenticated: false,
  user: { id: "0", name: "0" },

  isLoading: false,
  error: "",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
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
  },
});

export const { selectIsAuth, selectUser } = AuthSlice.selectors;
export const { loginUser, logoutUser } = AuthSlice.actions;

export default AuthSlice;
