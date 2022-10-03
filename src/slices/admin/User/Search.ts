import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchUser } from "../../../interface/interfaceAdmin/User/SearchUser";
import manamentUserAPI from '../../../services/manamentUserAPI';


export interface Search {
    searchUser:SearchUser[];
    isLoading:boolean;
    error:string | null;
}

const initialState : Search = {
    searchUser:[],
    isLoading:false,
    error:"",
}

export const createSearchUser = createAsyncThunk(
    `QuanLyNguoiDung/TimKiemNguoiDung`,
   async (keyword:any) => {
        try {
            const searchUser = await manamentUserAPI.SearchUser(keyword);
            console.log(searchUser);
            return searchUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
   }
)

const searchUSerSlice = createSlice({
    name:"SearchUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(createSearchUser.pending,(state)=>{
            return {...state}
        })
        builder.addCase(createSearchUser.fulfilled,(state,{payload})=>{
            return {...state,searchUser:payload}
        })
        builder.addCase(createSearchUser.rejected,(state,error)=>{
            return {...state,error:error.error.message as string}
        })
    },
})

export default searchUSerSlice.reducer