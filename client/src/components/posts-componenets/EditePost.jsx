/* eslint-disable no-unused-vars */
import React from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import { useNotification } from "../../hooks/Notification";

const ManegePosts = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [type, setType] = React.useState("Ad");
  const [image, setImage] = React.useState(null);

  const { showNotification } = useNotification();

  const fetchPost = async () => {
    try {
      const response = await api.get(`/api/post/${id}`);
      if (response.status !== 200) {
        throw Error("Failed to fetch data");
      }

      const post = response.data;
      setPost(post);
      setTitle(post.title);
      setContent(post.content);
      setType(post.type);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchPost();
  }, []);

  const handleEditPost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type", type);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.put(`/api/post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.status === 200) {
        showNotification("تم تعديل المنشور بنجاح", "green");
      } else {
        showNotification("فشل تعديل المنشور", "red");
      }
    } catch (error) {
      console.log("error", error);
      showNotification("فشل تعديل المنشور", "red");
    }
  };

  return (
    <div
      className="lg:mx-auto mx-4 my-12 lg:w-[70%] border border-[#5b5b5b] p-8 rounded-md"
      dir="rtl"
    >
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              منشور عام
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              سيتم عرض هذه المعلومات بشكل عام، لذا كن حذرًا فيما تشاركه.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  العنوان
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="عنوان المنشور"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={post ? post.title : ""}
                    required
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  محتوى المنشور
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-[75%] text-3xl min-h-60 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="محتوى المنشور"
                    onChange={(e) => setContent(e.target.value)}
                    defaultValue={post ? post.content : ""}
                    required
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  اكتب بضع جمل عن المنشور.
                </p>
              </div>

              <div></div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  صورة المنشور
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600  focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <span className="px-2"> رفع صورة </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">
                        {image ? image.name : "أو اسحب وأسقط "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">
                  نوع المنشور
                </legend>

                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="checkbox"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      onChange={(e) => {
                        setType(e.target.checked ? "Ad" : "Post");
                      }}
                      checked={type === "Ad"}
                      onClick={() => setType("Ad")}
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      إعلان
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-3">
          <Link
            to="/posts"
            type="button"
            className="text-sm/6 font-semibold bg-gray-100 px-8 py-2 rounded-md text-gray-900"
          >
            إلغاء
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-8 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleEditPost}
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManegePosts;
