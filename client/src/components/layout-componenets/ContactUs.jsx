import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import api from "../../api/axios";
import { useNotification } from "../../hooks/Notification";

const ContactUs = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/contact", {
        name: name,
        email: email,
        message: message,
      });
      if (response.status === 201) {
        showNotification("تم إرسال الرسالة بنجاح", "green");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showNotification("فشل إرسال الرسالة. حاول مرة أخرى.", "red");
    }
  };

  return (
    <section
      className="bg-white rounded-lg mx-5 my-40 p-10 shadow-lg lg:w-[50%] lg:mx-auto border-1 border-[#5b5b5b] outline-none ring-0 "
      id="contacts"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-right">
          تواصل معنا
        </h2>
        <p className="text-gray-600 mb-16 text-right">
          إذا كان هناك أي شيء تريد قوله أو اقتراحه، أو عمل ترغب في مشاركته أو
          العمل عليه معًا، أو أي شيء آخر، يرجى الاتصال بي.
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="text-center">
            <MapPinIcon className="h-8 w-8 text-blue-500 mx-auto" />
            <div className="text-lg mb-3 font-medium text-blue-500 mt-2">
              العنوان
            </div>
            <div className="text-sm text-gray-600">
              P3JF+HF4, Kouba, Algeria
            </div>
            <div className="text-sm text-gray-600">Zaouiet Kounta, Adrar</div>
          </div>
          <div className="text-center">
            <PhoneIcon className="h-8 w-8 text-blue-500 mx-auto" />
            <div className="text-lg mb-3 font-medium text-blue-500 mt-2">
              الهاتف
            </div>
            <div className="text-sm text-gray-600">+213676 04 17 42</div>
            <div className="text-sm text-gray-600">+213 657 31 21 35</div>
          </div>
          <div className="text-center">
            <EnvelopeIcon className="h-8 w-8 text-blue-500 mx-auto" />
            <div className="text-lg mb-3 font-medium text-blue-500 mt-2">
              البريد الإلكتروني
            </div>
            <div className="text-sm text-gray-600">
              lafkir.abdeldjalile35@g.ens-kouba.dz
            </div>
            <div className="text-sm text-gray-600">
              lafkir.abdeldjalile@gmail.com
            </div>
          </div>
        </div>
        <form action="#" className="mt-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="اسمك الكامل"
              className="w-full h-12 px-4 text-right text-gray-600 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="عنوانك الالكتروني او رقم هاتفك "
              className="w-full h-12 text-right px-4 text-gray-600 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="ما الذي يدور في ذهنك؟"
              className="w-full text-right h-28 px-4 py-2 text-gray-600 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="تواصل معنا"
              className="px-6 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleSubmit}
              disabled={!name || !email || !message}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
