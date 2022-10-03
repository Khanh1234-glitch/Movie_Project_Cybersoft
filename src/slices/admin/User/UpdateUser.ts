import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import manamentUserAPI from '../../../services/manamentUserAPI';
import { AddUser } from './../../../interface/interfaceAdmin/User/AddUser';


export interface UpdateUser {
    data:AddUser,
    isLoading:boolean,
    error:string | null,
}

const initialState : UpdateUser = ({
    data:{} as AddUser,
    isLoading:false,
    error:"",
})

export const createUpdateUser = createAsyncThunk(
    "admin/updateUser",
   async (formdata:any) => {
        try {
            const data = await manamentUserAPI.updateInfoUser(formdata);
            alert("Cập nhật người dùng thành công !!");
            return data;
        } catch (error) {
            alert(error);
            throw error;
        }
   }
)

const updateUserSlice = createSlice({
    name:"updateUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(createUpdateUser.pending,(state)=>{
            return {...state,isLoading:true}
        })
        builder.addCase(createUpdateUser.fulfilled,(state, {payload})=>{
            return {...state, isLoading:false, data:payload}
        })
        builder.addCase(createUpdateUser.rejected,(state, error)=>{
            return {...state, isLoading:false, error:error.error.message as string}
        })
    },
})

export default updateUserSlice.reducer