import { useForm } from "react-hook-form";
import { createStyles, Space } from "@mantine/core";
import { Form, Button, Input, Card } from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
// import { defaultShouldCreate } from "@mantine/core/lib/components/Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./../../store";
import { signIn } from "../../slices/auth";
interface LoginValue {
  taiKhoan: string;
  matKhau: string;
}
const useStyle = createStyles(() => ({
  container__signin: {
    // padding: "32px",
    background:
      "url(https://tcdtist-tix-clone.vercel.app/static/media/backapp.b46ef3a1.jpg)",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  form__signin: {
    width: "40%",
    display: "block",
    boxSizing: "border-box",
    transform: "translateY(10vh)",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: "30px",
  },
}));
const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { register } = useForm<LoginValue>({
    defaultValues: { taiKhoan: "", matKhau: "" },
    // mode: cách để trigger validation, default mặc định là onSubmit
    mode: "onTouched",
  });

  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [, forceUpdate] = useState({});
  // const taiKhoan = register('taiKhoan');
  // console.log(taiKhoan);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: any) => {
    dispatch(signIn(values));
  };
  console.log(currentUser);

  const { classes } = useStyle();

  // kiểm tra currentuser có phải là object rỗng hay không
  if (Object.keys(currentUser).length) {
    // Redirect user về trang home
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <div className={classes.container__signin}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            alignItems: "center",
            marginLeft: "10%",
            paddingTop: "8%",
          }}
        >
          <div
            style={{ marginTop: "100px" }}
            className="site-card-border-less-wrapper"
          >
            <Card
              title="Fact"
              bordered={false}
              style={{ width: 500, borderRadius: "20px" }}
            >
              <p>
                Trang web ngoài trang xem phim ra còn có trang admin để thêm phim
                thêm người dùng
              </p>
              <p>
                Để đến được trang admin thì ra trang chủ của trang rồi trên
                thanh url thêm "/admin"
              </p>
              <p>
                Chỉ có người dùng quản trị mới có thể truy cập vào trang admin,
                để tạo người dùng quản trị phải vào trang quản trị
              </p>
              <p>Có 2 tài khoản được tạo sẵn để vào trang quản trị </p>
              <ol>
                <li>
                  <span style={{ fontWeight: "bold" }}>Tài khoản</span> :
                  "lygialam105",
                  <span style={{ fontWeight: "bold" }}> Mật khẩu</span>
                  :"24061985Tu"
                </li>
                <li>
                  <span style={{ fontWeight: "bold" }}>Tài khoản</span> :
                  "baokhanhquantri",
                  <span style={{ fontWeight: "bold" }}>Mật khẩu</span>
                  :"ruacon123"
                </li>
              </ol>
            </Card>
          </div>
          <Form
            name="normal_login"
            className={classes.form__signin}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className="container__form" style={{ padding: "50px" }}>
              <div className="header__form">
                <div
                  className="logo"
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "#fb4226",
                  }}
                >
                  <FaUserCircle />
                  <p style={{ fontWeight: "bold", color: "black" }}>
                    Đăng nhập
                  </p>
                </div>
              </div>
              <Form.Item
                name="taiKhoan"
                rules={[
                  {
                    required: true,
                    message: "Tài khoản không được để trống!",
                  },
                  {
                    // pattern:/^[A-Za-z]+$/,
                    // message:"Tài khoản không được chứa khoảng cách hoặc kí tự đặc biệt"
                  },
                ]}
              >
                <Input placeholder="Username" {...register("taiKhoan")} />
              </Form.Item>
              <Form.Item
                name="matKhau"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                  {
                    // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    // message:
                    //   "có ít nhất 8 ký tự, trong đó có 1 kí tự số và 1 kí tự chữ",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="mật khẩu"
                  {...register("matKhau")}
                />
              </Form.Item>
              <Form.Item>
                <div>
                  {error && <span style={{ color: "red" }}>{error}</span>}
                  <Space h="md" />
                  <Button
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      backgroundColor: "#fb4226",
                      border: "none",
                    }}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Đăng nhập
                  </Button>
                </div>

                <Link to="/register">Bạn chưa có tài khoản? Đăng kí ngay!</Link>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
