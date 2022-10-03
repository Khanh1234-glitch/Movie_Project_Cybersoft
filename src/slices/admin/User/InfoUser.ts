import { InfoAccountInterface } from '../../../interface/interfaceAdmin/User/InfoAccountInterface';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import manamentUserAPI from '../../../services/manamentUserAPI';
export interface EditUser{
    data:InfoAccountInterface,
    isLoading:boolean,
    error:string | null ,
} 

const initialState : EditUser = {
    data:{} as InfoAccountInterface,
    isLoading:false,
    error:"",
}

export const createEditUser = createAsyncThunk(
    "admin/EditUser",
    async (taiKhoan:any) => {
        try {
            const data = await manamentUserAPI.infoUser(taiKhoan);
            console.log(data);
            return data;
        } catch (error) {
            throw error
        }
    }
)

const EditUserSlice = createSlice({
    name:"EditUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(createEditUser.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createEditUser.fulfilled,(state, {payload})=>{
            return {...state, isLoading:false, data:payload}
        })
        builder.addCase(createEditUser.rejected,(state, error)=>{
            return {...state, isLoading:true, error:error.error.message as string }
        })
    },
})

export default  EditUserSlice.reducer