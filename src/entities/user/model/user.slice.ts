import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
}
interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      if (!state.users.find((user) => user.name === action.payload.name)) {
        state.users.push(action.payload);
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  selectors: {
    selectUsers: (store) => store.users,
  },
});

export const { addUser, removeUser } = UsersSlice.actions;
export const { selectUsers } = UsersSlice.selectors;
export default UsersSlice;
