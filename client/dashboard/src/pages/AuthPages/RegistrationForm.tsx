/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// useDispatch was imported but not used, so it has been removed.
import api from "../../api/axios";
import { useNotification } from "../../hooks/Notification";
// useRef for loginButton has been removed as isLoading state handles button disabling.

// Optional: Define a more specific type for API errors if known
// interface ApiErrorResponse {
//   message: string;
// }
// interface CustomAxiosError extends AxiosError {
//   response?: AxiosResponse<ApiErrorResponse>;
// }

const RegistrationForm: React.FC = () => {
  // const dispatch = useDispatch(); // dispatch was initialized but not used.
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading status

  const { showNotification } = useNotification();

  const handleLogin = async () => {
    setIsLoading(true); // Disable button and inputs

    try {
      const response = await api.post("/api/auth/login", {
        // Endpoint suggests login
        email,
        password,
        remember,
      });

      // Consider what constitutes a successful login. 201 (Created) is unusual for login. Typically 200 (OK).
      if (response.status === 201 || response.status === 200) {
        // const { data } = response; // 'data' received from response, potentially contains token/user info.
        // This should be processed, e.g., stored in state/context or Redux.
        showNotification("تم تسجيل الدخول بنجاح", "green");
        // Potentially redirect user or update auth state here
      } else {
        // Handle other non-error statuses if your API returns them
        showNotification(
          `Login attempt returned status: ${response.status}`,
          "yellow"
        );
      }
    } catch (error: any) {
      // You can use a more specific type like AxiosError
      // Refactoring of the selected error handling part:
      const serverMessage = error.response?.data?.message;
      const generalMessage = error.message;
      const displayMessage =
        serverMessage ||
        generalMessage ||
        "An unexpected error occurred. Please try again.";
      showNotification(displayMessage, "red");
      // The line `loginButton.current.disabled = false;` is now handled by `setIsLoading(false)` in the `finally` block.
    } finally {
      setIsLoading(false); // Re-enable button and inputs regardless of success or failure
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="w-full h-full fixed z-10000 flex items-center justify-center text-right">
      <form
        className="flex w-[80%] md:w-md flex-col gap-4 p-6 !bg-white rounded-lg shadow-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {/* The component is named RegistrationForm, but UI and API endpoint suggest Login. */}
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
            placeholder="name@example.com" // Added placeholder for better UX
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading} // Disable input during loading
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
            disabled={isLoading} // Disable input during loading
          />
        </div>
        <div className="flex items-center justify-end gap-2 outline-none border-0 ring-0">
          <Label htmlFor="remember">تذكر الجلسة </Label>
          <Checkbox
            id="remember"
            checked={remember} // Corrected: Use 'remember' state variable
            onChange={(e) => setRemember(e.target.checked)}
            disabled={isLoading} // Disable checkbox during loading
          />
        </div>
        <Button type="submit" className="h-10 w-full" disabled={isLoading}>
          {isLoading ? "جاري التسجيل..." : "تسجيل"}
        </Button>
      </form>
      {/* This button lacks an onClick handler to close the form. Consider adding functionality. */}
      <button className="fixed p-2 text-sm text-white bottom-4 left-[50%] transform translate-x-[-50%]">
        إضغط لأغلاق نافذة التسجيل
      </button>
    </div>
  );
};

export default RegistrationForm;
