import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import { ThemeConfig } from "flowbite-react";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../app/store";
import { session } from "../../features/auth/authSlice";
import { NotificationProvider } from "../../hooks/Notification";

const SessionInitializer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(session());
  }, [dispatch]);

  return <>{children}</>;
};
const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <SessionInitializer>
          <NotificationProvider>
            <ScrollToHashElement
              behavior="smooth"
              inline="start"
              block="start"
            />
            <ThemeConfig dark={false} />
            {children}
          </NotificationProvider>
        </SessionInitializer>
      </Provider>
    </>
  );
};

export default Providers;
