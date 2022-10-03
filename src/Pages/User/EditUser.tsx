import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { createEditUser } from "../../slices/admin/User/InfoUser";
import Password from "antd/lib/input/Password";
import { useFormik } from "formik";
import { createUpdateUser } from "../../slices/admin/User/UpdateUser";
type SizeType = Parameters<typeof Form>[0]["size"];
const EditUser = () => {
  const { data } = useSelector((state: RootState) => state.InfoUser);
  const dispatch = useDispatch<any>();
  const param = useParams();
  useEffect(() => {
    dispatch(createEditUser(param.taiKhoan));
  }, []);
  console.log(data);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hoTen: data?.hoTen,
      taiKhoan: data?.taiKhoan,
      matKhau: data?.matKhau,
      email: data?.email,
      soDt: data?.soDt,
      maNhom: data?.maNhom,
      maLoaiNguoiDung: data?.maLoaiNguoiDung,
    },
    onSubmit: (values: any) => {
      dispatch(createUpdateUser(values));
    },
  });
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h1>Chỉnh sửa người dùng</h1>
      <Form
        onFinish={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "Họ tên không được để trống!",
            },
          ]}
        >
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>
        <Form.Item
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: "Tài khoản không được để trống!",
            },
            {
              pattern: /^[A-Za-z0-9_]+$/,
              message: "Không dùng kí tự đặc biệt",
            },
          ]}
        >
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Mật khẩu không được để trống!",
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Có ít nhất 8 ký tự, trong đó có 1 kí tự số và 1 kí tự chữ",
            },
          ]}
        >
          <Password
            name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
              message: "Email không được để trống!",
            },
            {
              pattern:
                /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
              message: "Email không đúng định dạng!",
            },
          ]}
        >
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <Button
            htmlType="submit"
            className=" bg-primary border-0 text-light rounded px-3 py-2"
          >
            Sửa
          </Button>
        </Form.Item>
      </Form>
      <div className="text-right">
        <button className="border-0  bg-primary p-3 rounded">
          <NavLink className="text-light " to="/admin">
            Quay về trang admin
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default EditUser;
