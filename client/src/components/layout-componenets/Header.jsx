/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  AcademicCapIcon,
  HomeModernIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import Profile from "./Profile";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { session } from "../../features/auth/authSlice";
import { useNotification } from "../../hooks/Notification";
import { Spinner } from "flowbite-react";

const products = [
  {
    name: "فضاء الأمين العام",
    description:
      "يحتوي على مستجدات وتعليمات صادرة عن الأمانة العامة، تقارير دورية، ومذكرات تنظيمية.",
    target: "/organization/secritary-general",
    icon: UserCircleIcon,
  },
  {
    name: "فضاء المكتب الوطني",
    description:
      "  يتضمن بيانات المكتب الوطني، القرارات المركزية، والمبادرات الوطنية ",
    target: "/organization/national-office",
    icon: BuildingOfficeIcon,
  },
  {
    name: "فضاء المكاتب الولائية",
    description:
      " مخصص لتقارير، نشاطات، وتوجيهات المكاتب الولائية حسب كل ولاية   ",
    target: "/organization/provincial-offices",
    icon: MapPinIcon,
  },
  {
    name: "أخبار وزارة التعليم العالي",
    description:
      "تغطية لأحدث المستجدات، اللقاءات الرسمية، والمشاريع الوطنية في قطاع التعليم العالي   ",
    target: "https://www.mesrs.dz/index.php/fr/accueil/",
    icon: AcademicCapIcon,
  },
  {
    name: "أخبار الديوان الوطني للخدمات الجامعية",
    description:
      "تحديثات حول الخدمات الجامعية، الإقامات، النقل، والإطعام الجامعي    ",
    target:
      "https://services.mesrs.dz/bac2021/guide/Guide_arabe_2021/ONOU.html",
    icon: HomeModernIcon,
  },
];
const callsToAction = [
  { name: "اتصل بالفريق", target: "", icon: PhoneIcon },
  {
    name: "لوحة التحكم",
    target: "/dashboard",
    icon: ArrowRightOnRectangleIcon,
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);

  const dispatch = useDispatch();
  const { member, status } = useSelector((state) => state.auth);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // set keybind to close the login form
  useEffect(() => {
    setOpenLoginForm(false);
  }, [isAuthenticated]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpenLoginForm(false);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  useEffect(() => {
    if (!member) {
      dispatch(session());
    }
  }, []);

  return (
    <header className="bg-[#4d80e4]  text-[#1F2937] lg:h-[10rem] h-[6rem]  bg-gradient-to-b from-[#4d80e4] to-[#ffffff] sticky top-0 z-9">
      <Transition
        as={Fragment}
        show={openLoginForm}
        enter="transition-opacity duration-500 linear"
        enterFrom="opacity-0"
        enterTo="opacity-90"
        leave="transition-opacity duration-700 linear"
        leaveFrom="opacity-90"
        leaveTo="opacity-0"
      >
        <div
          className="fixed h-full inset-0 z-10 flex items-center justify-center "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          onClick={() => {
            setOpenLoginForm(false);
          }}
        >
          <RegistrationForm />
        </div>
      </Transition>
      <nav
        aria-label="Global"
        className="mx-auto flex w-full items-center justify-between px-20px lg:py-7 text-[white] lg:px-20"
      >
        {/* Login link moved to the left */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-start">
          {isAuthenticated ? (
            <Profile />
          ) : (
            <button
              onClick={() => setOpenLoginForm(true)}
              className="text-sm/6 font-semibold text-[#1F2937] border-2 border-[#1F2937] rounded-lg px-4 py-2  transition duration-300 ease-in-out cursor-pointer hover:bg-[#1F2937] hover:text-white"
            >
              تسجيل الدخول <span aria-hidden="true"></span>
            </button>
          )}
        </div>

        {/* Navigation links */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 text-[#1F2937]">
          <Link
            to="/#contacts"
            className="text-lg relative font-semibold text-[#1F2937] after:transition-all after:duration-500 after:scale-0 after:content-[''] after:absolute after:left-0 after:top-8 after:w-full after:h-0.75 after:bg-[#1F2937]  after:rounded-lg hover:after:scale-100 after:hover:top-8 after:hover:left-0 after:hover:h-[2.5px]  after:hover:rounded-lg"
          >
            تواصل
          </Link>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1  outline-none border-none  hover:text-secondary transition duration-300 ease-in-out text-lg relative font-semibold text-[#1F2937] after:transition-all after:duration-500 after:scale-0 after:content-[''] after:absolute after:left-0 after:top-8 after:w-full after:h-0.75 after:bg-[#1F2937]  after:rounded-lg hover:after:scale-100 after:hover:top-8 after:hover:left-0 after:hover:h-[2.5px] cusror-pointer after:hover:rounded-lg">
              الفضاءات
            </PopoverButton>
            <PopoverPanel className="absolute top-full -left-8 z-10 mt-5 min-w-[600px] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
              <div className="p-6">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className=" relative flex flex-row-reverse items-center  gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-300"
                  >
                    <div className="flex  size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white ">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover:text-indigo-600 "
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        to={item.target}
                        className="block font-semibold text-gray-900 text-end"
                      >
                        {item.name}
                        <span className="absolute inset-0 text-gray-600" />
                      </Link>
                      <p className="mt-1 text-gray-600 text-end">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.target}
                    className={`${
                      member?.role === "AD"
                        ? "flex"
                        : item.target === "/dashboard" && member?.role !== "OP"
                        ? "hidden"
                        : "flex"
                    }   items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100`}
                    onClick={() => {
                      if (item.name === "دخول الأعضاء ") {
                        setOpenLoginForm(true);
                      }
                    }}
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            to="/#RecentActs"
            className="text-lg relative font-semibold text-[#1F2937] after:transition-all after:duration-500 after:scale-0 after:content-[''] after:absolute after:left-0 after:top-8 after:w-full after:h-0.75 after:bg-[#1F2937]  after:rounded-lg hover:after:scale-100 after:hover:top-8 after:hover:left-0 after:hover:h-[2.5px]  after:hover:rounded-lg"
          >
            نشاطات
          </Link>
          <Link
            to="/#start"
            className="text-lg relative font-semibold text-[#1F2937] after:transition-all after:duration-500 after:scale-0 after:content-[''] after:absolute after:left-0 after:top-8 after:w-full after:h-0.75 after:bg-[#1F2937]  after:rounded-lg hover:after:scale-100 after:hover:top-8 after:hover:left-0 after:hover:h-[2.5px]  after:hover:rounded-lg"
          >
            الرئيسية
          </Link>
        </PopoverGroup>

        {/* Logo moved to the right */}
        <div className="flex lg:hidden order-1">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className=" inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">فتح القائمة</span>
            <Bars3Icon aria-hidden="true" className="size-8 text-[#1F2937]" />
          </button>
        </div>

        {/* Logo on the right (small screens) and aligned right on large screens */}

        <Link
          to="/#start"
          className="flex-1 flex justify-end order-2 lg:justify-end"
        >
          <span href="#" className="m-1.5 p-1.5 flex items-center justify-end">
            <span className="sr-only">شركتك</span>
            {/* Text only on large screens */}
            <h4 className="text-2xl font-bold hidden text-[#1F2937]">
              المنظمة الوطنية للتضامن الطلابي
            </h4>
            {/* Logo icon on small screens only */}
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-10 "
            />
          </span>
        </Link>
      </nav>

      {/* Mobile menu */}

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden w-full  transition duration-300 ease-in-out data-closed:opacity-100"
        transition
      >
        {/* Backdrop */}
        <Transition
          show={mobileMenuOpen}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-10 bg-black/70" />
        </Transition>

        {/* Sliding Panel */}
        <Transition
          show={mobileMenuOpen}
          as="div"
          enter="transition-transform duration-10000 linear"
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition-transform duration-80000 linear"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-full opacity-0"
        >
          <DialogPanel
            transition
            className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10  transition duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">إغلاق القائمة</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">شركتك</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="mt-6 flow-root text-right">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure>
                    {({ open }) => (
                      <div>
                        <Link
                          to="/#start"
                          className="mx-2 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          الرئيسية
                        </Link>
                        <Link
                          to="/#RecentActs"
                          className="mx-2 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          نشاطات
                        </Link>
                        <DisclosureButton className="text-right flex -mx-2 px-3 w-full items-center flex-row-reverse rounded-lg py-2   text-base/7 font-semibold text-gray-900   hover:bg-gray-300">
                          الفضاءات
                          <ChevronDownIcon
                            aria-hidden="true"
                            className={`size-5 flex-none transition-transform duration-300 ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </DisclosureButton>
                        <Transition
                          as="div"
                          show={open}
                          enter="transition duration-300 ease-out"
                          enterFrom="transform opacity-0 -translate-y-2"
                          enterTo="transform opacity-100 translate-y-0"
                          leave="transition duration-200 ease-in"
                          leaveFrom="transform opacity-100 translate-y-0"
                          leaveTo="transform opacity-0 -translate-y-2"
                        >
                          <DisclosurePanel className="mt-2 pr-5 space-y-2">
                            {[...products, ...callsToAction].map((item) => (
                              <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.target}
                                className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-600 hover:bg-gray-300"
                              >
                                {item.name}
                              </DisclosureButton>
                            ))}
                          </DisclosurePanel>
                        </Transition>
                        <Link
                          to="/#contacts"
                          className="mx-2 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          تواصل
                        </Link>
                        {(member?.role === "OP" || member?.role === "AD") && (
                          <Link
                            to="/dashboard"
                            className="mx-2 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-300"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            لوحة التحكم
                          </Link>
                        )}
                      </div>
                    )}
                  </Disclosure>
                </div>
                <div className="py-6">
                  {isAuthenticated ? (
                    <Profile />
                  ) : (
                    <button
                      onClick={() => {
                        setOpenLoginForm(true);
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-2 w-full  block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 bg-gray-100 hover:bg-gray-300 transition duration-300 ease-in-out"
                    >
                      تسجيل الدخول
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Transition>
      </Dialog>
    </header>
  );
}
