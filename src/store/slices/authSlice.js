import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/auth/login";

const emptyState = {
    id: "",
    token: "",
    fullname: "",
    email: "",
    isLogged: false,
}



const authSlice = createSlice({
    name: "auth",
    initialState: JSON.parse(localStorage.getItem("sessionData")) ?? emptyState,
    reducers: {
        updateUserData(state, action){
            const newUserData = action.payload;

            state.id = newUserData.id;
            state.fullname = newUserData.fullname;
            state.email = newUserData.email;

            const plainedStateCopy = {... state};
            localStorage.setItem("sessionData", JSON.stringify(plainedStateCopy));
        },
        updateToken(state, action){
            const newToken = action.payload;
            state.token = newToken;

            const plainedStateCopy = {... state};
            localStorage.setItem("sessionData", JSON.stringify(plainedStateCopy));
        },
        startSession(state){
            state.isLogged = true

            const plainedStateCopy = {... state};
            localStorage.setItem("sessionData", JSON.stringify(plainedStateCopy));
        },
        reset(){
            localStorage.removeItem("sessionData")
            return emptyState;
        }
    },
})

export const {updateUserData, updateToken, startSession, reset} = authSlice.actions;

export const startSessionThunk =
    ({email, password}) =>
    async (dispatch) => {
    const sessionData = await login({email,password});

    const userData = {
        id: sessionData.user.id,
        fullname: `${sessionData.user.firstName} ${sessionData.user.lastName}`,
        email: sessionData.user.email,
    };

    dispatch(updateUserData(userData));
    dispatch(updateToken(sessionData.token));
    dispatch(startSession());
};

export default authSlice.reducer;