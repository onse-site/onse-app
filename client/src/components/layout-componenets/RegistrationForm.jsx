/* eslint-disable no-unused-vars */
import React, { use } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../features/auth/authSlice";
import api from "../../api/axios";
import { useNotification } from "../../hooks/Notification";
import { useRef } from "react";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const loginButton = useRef(null);

  const { showNotification } = useNotification();

  const handleLogin = async () => {
    loginButton.current.disabled = true;

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
        remember,
      });
      if (response.status === 201) {
        const { data } = response;
        dispatch(login(data.member));
        showNotification("تم تسجيل الدخول بنجاح", "green");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      showNotification(errorMessage, "red");
      loginButton.current.disabled = false;
    }
  };
  return (
    <div className="w-full h-full fixed  z-10 flex items-center justify-center text-right">
      <form
        className="flex w-[80%] md:w-md  flex-col gap-4 p-6 !bg-white rounded-lg shadow-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 className="text-tertiary text-center font-extrabold text-2xl py-4">
          تسجيل الدخول
        </h2>
        <div>
          <div className="mb-2 block text-right">
            <Label htmlFor="email1">عنوان البريد الالكتروني</Label>
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder=""
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block text-right">
            <Label htmlFor="password1">كلمة المرور </Label>
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end gap-2 outline-none border-0 ring-0">
          <Label htmlFor="remember">تذكر الجلسة </Label>
          <Checkbox
            id="remember"
            checked={true}
            onChange={(e) => setRemember(e.target.checked)}
          />
        </div>
        <Button type="submit" className="h-10 w-full" ref={loginButton}>
          تسجيل
        </Button>
      </form>
      <button className="fixed p-2  text-sm  text-white bottom-4 left-[50%] transform translate-x-[-50%]   ">
        إضغط لأغلاق نافذة التسجيل
      </button>
    </div>
  );
};

export default RegistrationForm;
