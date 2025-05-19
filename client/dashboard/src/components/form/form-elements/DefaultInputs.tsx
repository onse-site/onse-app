import { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { EyeCloseIcon, EyeIcon /* TimeIcon */ } from "../../../icons";
/* import DatePicker from "../date-picker.tsx"; */
import FileInput from "../input/FileInput.tsx";
import TextArea from "../input/TextArea.tsx";
import api from "../../../api/axios.ts";
import { useNotification } from "../../../hooks/Notification.tsx";

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "SG", label: "secritair general" },
    { value: "OP", label: "office presidant" },
    { value: "OM", label: "office member" },
  ];
  const [offices, setOffices] = useState<{ value: string; label: string }[]>(
    []
  );

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [office, setOffice] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  /*   const [message, setMessage] = useState(""); */
  const [description, setDescription] = useState("");

  const { showNotification } = useNotification();

  const handleSelectChange = (value: string) => {
    setRole(value);
  };

  const handleSelectOfficeChange = (value: string) => {
    setOffice(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      setAvatar(file);
    }
  };

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await api.get("api/dashboard/offices");
        if (response.status !== 200) {
          throw new Error("Error fetching offices");
        }
        const transformedOffices = response.data.offices.map(
          (office: { id: string; name: string }) => ({
            value: office.id.toString(),
            label: office.name,
          })
        );
        setOffices(transformedOffices);
      } catch (error) {
        console.log("Error fetching offices:", error);
      }
    };

    fetchOffices();
  }, []);

  const collectFormData = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("officeId", office);
    formData.append("password", tempPassword);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("bio", bio);
    formData.append("description", description);
    //Log formData entries for debugging
    /*  for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    } */
    return formData;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = collectFormData();
    try {
      const response = await api.post("api/dashboard/member", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200 || response.status === 201) {
        console.log("Member added successfully:", response.data);

        setName("");
        setEmail("");
        setPhone("");
        setRole("");
        setOffice("");
        setTempPassword("");
        setAvatar(null);
        setBio("");
        setDescription("");
        // Add any success message or redirection logic
        showNotification(response.data.message, "green");
      } else {
        throw new Error("Failed to add member");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showNotification("error adding memebr", "red");
    }
  };

  return (
    <ComponentCard title="Add member">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">name</Label>
          <Input
            type="text"
            id="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="inputTwo">email</Label>
          <Input
            type="text"
            id="inputTwo"
            placeholder="info@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="input">phone</Label>
          <Input
            type="text"
            id="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <Label>role</Label>
          <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <Label>office</Label>
          <Select
            options={offices}
            placeholder="Select an option"
            onChange={handleSelectOfficeChange}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <Label>temp password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label>member avatar</Label>
          <FileInput onChange={handleFileChange} className="custom-class" />
        </div>

        <div>
          <Label htmlFor="input">bio</Label>
          <Input
            type="text"
            id="input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <Label>Description</Label>
          <TextArea
            value={description}
            onChange={(value) => setDescription(value)}
            rows={6}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-4xl text-white bg-blue-500  hover:bg-blue-700"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
          }}
        >
          Add Member
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
