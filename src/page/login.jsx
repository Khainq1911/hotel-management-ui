import logo from "~/images/login.jpg";
import { Image } from "primereact/image";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { checkLoginService } from "~/services/login-service";
import { ToastConfigs } from "~/configs/toast";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { showToast } = ToastConfigs();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await checkLoginService(username, password);
      console.log(res);
      if (res.status === 200) {
        showToast({
          severity: "success",
          summary: "Login Successful",
          detail: "Welcome back!",
        });
      }
      localStorage.setItem("accessToken", res.accessToken);
      navigate("/");
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Login Failed",
        detail: error.response.data.Message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#F0F4F9]">
      <div className="w-[600px] h-[280px] shadow rounded-2xl bg-[#fff]">
        <p className="text-[36px] font-bold text-center mt-2 text-[#334155]">
          SIGN IN
        </p>
        <form
          onSubmit={login}
          className="grid grid-cols-2 place-content-center place-items-center"
        >
          <Image src={logo} alt="Logo" width="200" height="200" />
          <div>
            <div className="grid grid-cols-1 gap-6">
              <FloatLabel>
                <InputText
                  id="username"
                  className="w-60"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <label htmlFor="username">Username</label>
              </FloatLabel>
              <FloatLabel>
                <InputText
                  id="password"
                  type="password"
                  className="w-60"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label htmlFor="password">Password</label>
              </FloatLabel>
            </div>
            <Button type="submit" className="mt-4">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
