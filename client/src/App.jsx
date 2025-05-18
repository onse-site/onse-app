// Third-party imports
import React from "react";
import { Route, Routes } from "react-router-dom";

// CSS imports
import "./index.css";

// Layout and utility components
import Layout from "./Layout";
import Providers from "./components/utility-componenets/Providers";
// Home page
import Index from "./pages/Index";

// Organization pages
import SecritaryGeneralIndexPage from "./pages/orgnization/secratary-general/Index";
import NationalOfficeIndexPage from "./pages/orgnization/national-office/Index";
import ProvincialOfficesIndexPage from "./pages/orgnization/provinencial-offices/Index.jsx";

// Dashboard page
import Dashboard from "./pages/dashboard/Dashboard";

// Footer links pages
import About from "./pages/footer/About";
import ServicePolicy from "./pages/footer/ServicePolicy";
import LicensingPolicy from "./pages/footer/LicensingPolicy";
import ContactInformation from "./pages/footer/ContactInformation";

// Not found page
import NotFound from "./pages/NotFound";

// shared components
import AddPost from "./components/posts-componenets/AddPost.jsx";
import EditPost from "./components/posts-componenets/EditePost.jsx";
import ManegeProfile from "./components/layout-componenets/ManegeProfile.jsx";

function App() {
  return (
    <>
      <Providers>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* The home page route */}
            <Route index element={<Index />} />

            {/* The organization route */}
            <Route path="organization">
              {/* The secritary general route */}
              <Route path="secritary-general">
                <Route index element={<SecritaryGeneralIndexPage />} />
              </Route>
              {/* The national office route */}
              <Route path="national-office">
                <Route index element={<NationalOfficeIndexPage />} />
              </Route>
              {/* The provinencial offices route */}
              <Route path="provincial-offices">
                <Route index element={<ProvincialOfficesIndexPage />} />
              </Route>
              {/* Shred componenets  */}
              <Route path="add-post" element={<AddPost />} />
              <Route path="edit-post/:id" element={<EditPost />} />
              <Route path="edit-profile/:id" element={<ManegeProfile />} />
            </Route>

            {/* The Dashboard route */}
            <Route path="dashboard">
              <Route index element={<Dashboard />} />
            </Route>

            {/* The footer links  route */}
            <Route path="links">
              <Route path="about" element={<About />} />
              <Route path="service-policy" element={<ServicePolicy />} />
              <Route path="licensing-policy" element={<LicensingPolicy />} />
              <Route path="contacts-info" element={<ContactInformation />} />
            </Route>

            {/* The not found route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Providers>
    </>
  );
}

export default App;
