import React from "react";
import { useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Dropdown, DropdownItem } from "flowbite-react";
import api from "../../api/axios";
import { useNotification } from "../../hooks/Notification";
import { useSelector } from "react-redux";

const AddPost = () => {
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("Post");
  const [image, setImage] = useState(null);

  const { member } = useSelector((state) => state.auth);

  const offices = [];

  const { showNotification } = useNotification();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "bullet",
    "link",
    "image",
    "direction",
  ];

  const handlePublishPost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", member._id);
    formData.append("type", type);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.status === 201) {
        showNotification("تم نشر المنشور بنجاح", "green");
      } else if (response.status === 400) {
        showNotification("فشل نشر المنشور", "red");
      } else if (response.status === 500) {
        showNotification("خطأ في الخادم", "red");
      }
    } catch (error) {
      console.log("error", error);
      showNotification("خطأ في نشر المنشور", "red");
    }
  };

  return (
    <div
      className="w-[90%] mx-auto my-12 lg:w-[60%] px-1 py-3 bg-white border rounded-lg shadow"
      dir="rtl"
    >
      <form>
        <div className="mb-2">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="العنوان"
            className="w-full text-2xl rounded px-4 focus:outline-none focus:ring-none focus:ring-indigo-500"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
            required
          />
        </div>
        <div ref={quillRef}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="نص المنشور "
            modules={modules}
            formats={formats}
          />
        </div>

        <div className="flex items-center justify-start gap-2 px-2 mb-4 [&>button]:text-xs [&>button]:my-2 [&>button]:bg-gray-200 [&>button]:p-2 [&>button]:rounded-md [&>button]:hover:bg-gray-100">
          <Dropdown className="text-xs" label="إضافة مشاركين " inline>
            {offices.map((office) => {
              return <DropdownItem>{office.name}</DropdownItem>;
            })}
          </Dropdown>

          <Dropdown label="نوع المنشور " inline>
            <DropdownItem onClick={() => setType("Ad")}>إعلان</DropdownItem>
            <DropdownItem onClick={() => setType("Post")}>منشور</DropdownItem>
          </Dropdown>
        </div>
        <hr className="w-[80%] mx-auto my-3 text-gray-200" />
        <div className="flex items-center justify-between px-2">
          <button
            type="submit"
            className="bg-[#4d80e4] hover:opacity-90 text-white px-6 py-2 rounded"
            onClick={handlePublishPost}
          >
            نشر
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-600 hover:underline cursor-pointer">
            <label
              htmlFor="file-upload"
              className="flex items-center gap-1 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                  clipRule="evenodd"
                />
              </svg>
              <span> {image ? image.name : "إرفاق صورة"} </span>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              accept="image/*"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
