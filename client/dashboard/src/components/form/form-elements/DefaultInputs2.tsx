import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
/* import Select from "../Select";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../date-picker.tsx"; */
import FileInput from "../input/FileInput.tsx";
import api from "../../../api/axios.ts";
import { useNotification } from "../../../hooks/Notification.tsx";
export default function DefaultInputs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [officeCover, setOfficeCover] = useState<File | null>(null);

  const { showNotification } = useNotification();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOfficeCover(file);
    } else {
      setOfficeCover(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (officeCover) {
      formData.append("cover", officeCover);
    }

    try {
      const response = await api.post("/api/dashboard/office", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("error adding office");
      }

      showNotification(response.data.message, "green");
      setName("");
      setEmail("");
      setPhone("");
      setOfficeCover(null);
    } catch (error) {
      console.error(error);
      showNotification("error adding that office", "red");
    }
  };

  return (
    <ComponentCard title="Add office">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">name</Label>
          <Input
            type="text"
            id="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
          />
        </div>
        <div>
          <Label htmlFor="inputTwo">email</Label>
          <Input
            type="email"
            id="inputTwo"
            placeholder="info@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
          />
        </div>

        <div>
          <Label htmlFor="input">phone</Label>
          <Input
            type="tel"
            id="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-required="true"
          />
        </div>

        <div>
          <Label>office cover</Label>
          <FileInput onChange={handleFileChange} className="custom-class" />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-4xl text-white bg-blue-500  hover:bg-blue-700"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
          }}
        >
          Add Office
        </button>

        {/* <div>
          <DatePicker
            id="date-picker"
            label="Date Picker Input"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div> */}
        {/* 
        <div>
          <Label htmlFor="tm">Time Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div> */}
        {/* <div>
          <Label htmlFor="tm">Input with Payment</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Card number"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                <path
                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                  fill="#FC6020"
                />
              </svg>
            </span>
          </div>
        </div> */}
      </div>
    </ComponentCard>
  );
}
