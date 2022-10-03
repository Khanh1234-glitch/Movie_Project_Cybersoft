import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import Password from "antd/lib/input/Password";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAddUser } from "../../slices/admin/User/AddUser";
import { createUserType } from "../../slices/admin/User/UserTypeSlice";
import { RootState } from "../../store";
type SizeType = Parameters<typeof Form>[0]["size"];

const AddUser = () => {
  const { data } = useSelector((state: RootState) => state.UserTypeSlice);
  const { addUser } = useSelector((state: RootState) => state.createAddUser);
  const dispatch = useDispatch<any>();
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const param = useParams();
  useEffect(() => {
    dispatch(createAddUser(param));
  }, []);
  const onFinish = (values: any) => {
    dispatch(createAddUser(values));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    dispatch(createUserType());
  }, []);
  console.log(data);

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  return (
    <div>
      <Form
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="matKhau"
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
          <Password />
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="hoTen"
          rules={[
            {
              required: true,
              message: "Họ tên không được để trống!",
            },
            {
              // pattern:/^[A-Za-z]+$/,
              // message:"Tài khoản không được chứa khoảng cách hoặc kí tự đặc biệt"
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="soDt"
          rules={[
            {
              required: true,
              message: "Số điện thoại không được để trống!",
            },
            {
              pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
              message: "Số điện thoại không đúng!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã nhóm"
          name="maNhom"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống!",
            },
          ]}
        >
          <Select placeholder="Chọn loại người dùng" allowClear>
            <Select.Option key={addUser.maNhom} value="GP01">
              {addUser.maNhom}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Loại người dùng"
          name="maLoaiNguoiDung"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống !",
            },
          ]}
        >
          <Select placeholder="Chọn loại người dùng" allowClear>
            {data.map((item, index) => {
              return (
                <Select.Option key={index} value={item.maLoaiNguoiDung}>
                  {item.tenLoai}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Thêm người dùng">
          <Button htmlType="submit">Thêm</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
