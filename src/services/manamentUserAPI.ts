import { SearchUser } from './../interface/interfaceAdmin/User/SearchUser';
import { InfoAccountInterface } from './../interface/interfaceAdmin/User/InfoAccountInterface';
import { AddUser } from './../interface/interfaceAdmin/User/AddUser';
import { UserType } from './../interface/interfaceAdmin/User/UserType';
import { ListUser } from './../interface/interfaceAdmin/User/ListUser';
import axiosClient from "./axiosClient"


const manamentUserAPI ={
    listUser:(evt:any)=>{
        return axiosClient.get<unknown,ListUser[]>(`QuanLyNguoiDung/LayDanhSachNguoiDung`,evt)
    },
    UserType:()=>{
        return axiosClient.get<unknown,UserType[]>(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    },
    AddUser:(formData:any)=>{
        return axiosClient.post<unknown,AddUser>(`QuanLyNguoiDung/ThemNguoiDung`,formData)
    },
    deleteUser:(taiKhoan:any)=>{
        return axiosClient.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    },
    infoUser:(taiKhoan:any)=>{
        return axiosClient.post<unknown,InfoAccountInterface>(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
    },
    updateInfoUser:(formdata:any)=>{
        return axiosClient.post<unknown,AddUser>(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,formdata);
    },
    SearchUser:(keyword:any)=>{
        return axiosClient.get<unknown, SearchUser[]>(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`)
    }
}

export default manamentUserAPI