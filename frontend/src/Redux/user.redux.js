import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error:false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart:(state)=>{
            state.loading=true;
            // state.error=false;
        },
        signInSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser=action.payload;
            state.error=false;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signOut:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
        }
    }
});

export const {signInStart,signInSuccess,signInFailure,signOut}=userSlice.actions;

export default userSlice.reducer;