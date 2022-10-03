import { AddUser } from '../../../interface/interfaceAdmin/User/AddUser';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import manamentUserAPI from '../../../services/manamentUserAPI';

export interface AddUserInterface{
    addUser:AddUser,
    isLoading:boolean,
    error:string | null ,
} 

const initialState : AddUserInterface = {
    addUser:{} as AddUser,
    isLoading:false,
    error:"",
}

export const createAddUser = createAsyncThunk(
    "admin/AddUser",
    async (formData:any) => {
        try {
            const data = await manamentUserAPI.AddUser(formData);
            alert("Thêm người dùng thành công!!!")
            return data;
        } catch (error) {
            alert(error)
            throw error
        }
    }
)

const CreateAddUser = createSlice({
    name:"AddUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(createAddUser.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createAddUser.fulfilled,(state, {payload})=>{
            return {...state, isLoading:true, data:payload}
        })
        builder.addCase(createAddUser.rejected,(state, error)=>{
            return {...state, isLoading:true, error:error.error.message as string }
        })
    },
})

export default  CreateAddUser.reducer