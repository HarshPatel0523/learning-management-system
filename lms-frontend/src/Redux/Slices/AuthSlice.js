import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const dataFromStorage = localStorage.getItem("data");
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: dataFromStorage && dataFromStorage !== "undefined" ? JSON.parse(dataFromStorage) : {}
}

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const response = axiosInstance.post("user/register", data);
        toast.promise(response, {
            loading: 'Wait! creating your account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create your account'
        });
        return (await response).data; // Only return serializable data
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const updateProfile = createAsyncThunk("/auth/updateProfile", async (data) => {
    try {
        const response = axiosInstance.put(`user/update-profile`, data);
        toast.promise(response, {
            loading: 'Wait! updating your account',
            success: (data) => {
                console.log(data);
                return data?.data?.message;
            },
            error: 'Failed to update your account'
        });
        return (await response).data;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/auth/getData", async () => {
    try {
        const response = axiosInstance.get("/user/me");
        return (await response).data;
    } catch(error) {
        toast.error(error?.message);
    }
})


export const login = createAsyncThunk("/auth/signin", async (data) => {
    try {
        const response = axiosInstance.post("user/login", data);
        toast.promise(response, {
            loading: 'Wait! authenticating your account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to authenticate your account'
        });
        return (await response).data; // Only return serializable data
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const response = axiosInstance.post("user/logout");
        toast.promise(response, {
            loading: 'Wait! logging out your account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to logout your account'
        });
        return (await response).data; // Only return serializable data
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            const user = action?.payload?.user || {};
            const role = user?.role || "";
            localStorage.setItem("data", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", role);
            state.isLoggedIn = true;
            state.role = role;
            state.data = user;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.role = action?.payload?.user?.role;
            state.data = action?.payload?.user;
        })
    }
});

export default authSlice.reducer;