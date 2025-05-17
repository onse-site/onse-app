import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import api from "../../api/axios";
import { useSelector } from "react-redux";

const ManegeProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [samePassword, setSamePassword] = useState(true);
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);

  const { member } = useSelector((state) => state.auth);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      password,
      confirmPassword,
      about,
      image,
    });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("about", about);
    if (image) {
      formData.append("avatar", image);
    }
    try {
      const response = api.put(`/api/auth/update/${member.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        console.log("تم تعديل الملف الشخصي بنجاح");
      }
      if (response.status === 400) {
        console.log("خطأ في تعديل الملف الشخصي");
      }
      if (response.status === 500) {
        console.log("خطأ في الخادم");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    password === confirmPassword
      ? setSamePassword(true)
      : setSamePassword(false);
  }, [password, confirmPassword]);

  return (
    <div className="my-30 ">
      <div className="flex  items-center justify-end px-16 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right   text-tertiary">
          الملف الشخصي
        </h3>
        <UserCircleIcon className="text-sm w-5 text-tertiary" />
      </div>
      <div
        className="lg:mx-auto mx-4 lg:w-[70%] border border-[#5b5b5b] p-8 rounded-md"
        dir="rtl"
      >
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                الملف الشخصي
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                سيتم عرض هذه المعلومات بشكل عام، لذا كن حذرًا فيما تشاركه.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    اسم المستخدم
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                        onse.com/
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="اسم المستخدم"
                        className="block min-w-0 h-12  grow py-1.5 px-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    الإسم الكامل
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    تحديث كلمة المرور
                  </label>
                  <div className="mt-2">
                    <input
                      id="new-passowrd"
                      name="new-passowrd"
                      type="password"
                      className={` block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600   sm:text-sm `}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    أعد كتابة كلمة المرور
                  </label>
                  <div className="mt-2">
                    <input
                      id="repassword"
                      name="repassword"
                      type="password"
                      className={`${
                        samePassword
                          ? "focus:outline-indigo-600 "
                          : "focus:outline-red-600 "
                      } block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2  sm:text-sm `}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    نبذة عنك
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setAbout(e.target.value)}
                      value={about}
                    />
                  </div>
                  <p className="mt-3 text-sm/6 text-gray-600">
                    اكتب بضع جمل عن نفسك.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    الصورة
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="profile"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon
                        aria-hidden="true"
                        className="size-12 text-gray-300"
                      />
                    )}

                    <label
                      htmlFor="file-upload"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
                    >
                      اختر
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-3">
            <button
              type="button"
              className="text-sm/6 font-semibold bg-gray-100 px-8 py-2 rounded-md text-gray-900"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-8 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleUpdateProfile}
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManegeProfile;
