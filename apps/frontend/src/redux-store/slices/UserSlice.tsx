import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User/User";

const initialState: { user: User | undefined } = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
