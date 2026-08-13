import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";

import AdminLogin from "../pages/AdminLogin";
import AdminForgotPassword from "../pages/AdminForgotPassword";

import Dashboard from "../pages/Dashboard";
import Hero from "../pages/Hero";
import Members from "../pages/Members";
import AddMember from "../pages/AddMember";
import InactiveMember from "../pages/InactiveMember";


import ContactMessages from "../pages/ContactMessages";
import Settings from "../pages/Settings";

import ViewMember from "../pages/ViewMember";
import EditMember from "../pages/EditMember";

import Gallery from "../pages/Gallery";
import AddGallery from "../pages/AddGallery";
import EditGallery from "../pages/EditGallery";
import ViewGallery from "../pages/ViewGallery";

import Events from "../pages/Events";
import AddEvent from "../pages/AddEvent";
import EditEvent from "../pages/EditEvent";
import ViewEvent from "../pages/ViewEvent";

import News from "../pages/News";
import AddNews from "../pages/AddNews";
import EditNews from "../pages/EditNews";
import ViewNews from "../pages/ViewNews";

import Notifications from "../pages/Notifications";
import AddNotification from "../pages/AddNotification";
import EditNotification from "../pages/EditNotification";
import ViewNotification from "../pages/ViewNotification";


const MainRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-forgot-password"
          element={<AdminForgotPassword />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        {/* Hero Carousel */}

        <Route
            path="/hero"
            element={
              <AdminLayout>
                <Hero />
              </AdminLayout>
          }
        />

        {/* Members */}

        <Route
          path="/members"
          element={
            <AdminLayout>
              <Members />
            </AdminLayout>
          }
        />

        <Route
  path="/members/add"
  element={
    <AdminLayout>
      <AddMember />
    </AdminLayout>
  }
/>

<Route path="/members/view/:id" element={<AdminLayout><ViewMember /></AdminLayout>} />
<Route path="/members/edit/:id" element={<AdminLayout><EditMember /></AdminLayout>} />



        {/* Committee */}

        <Route
          path="/inactivemember"
          element={
            <AdminLayout>
              <InactiveMember />
            </AdminLayout>
          }
        />

       

        {/* Events */}

        <Route
          path="/events"
          element={
            <AdminLayout>
              <Events />
            </AdminLayout>
          }
        />

        <Route
  path="/events/add"
  element={
    <AdminLayout>
      <AddEvent />
    </AdminLayout>
  }
/>

<Route
  path="/events/edit/:id"
  element={
    <AdminLayout>
      <EditEvent />
    </AdminLayout>
  }
/>

<Route
  path="/events/view/:id"
  element={
    <AdminLayout>
      <ViewEvent />
    </AdminLayout>
  }
/>

  {/* News */}

        <Route
          path="/news"
          element={
            <AdminLayout>
              <News />
            </AdminLayout>
          }
        />

        <Route
  path="/news/add"
  element={
    <AdminLayout>
      <AddNews />
    </AdminLayout>
  }
/>

<Route
  path="/news/edit/:id"
  element={
    <AdminLayout>
      <EditNews />
    </AdminLayout>
  }
/>

<Route
  path="/news/view/:id"
  element={
    <AdminLayout>
      <ViewNews />
    </AdminLayout>
  }
/>


{/* Notifications */}

<Route
  path="/notifications"
  element={
    <AdminLayout>
      <Notifications />
    </AdminLayout>
  }
/>

<Route
  path="/notifications/add"
  element={
    <AdminLayout>
      <AddNotification />
    </AdminLayout>
  }
/>

<Route
  path="/notifications/edit/:id"
  element={
    <AdminLayout>
      <EditNotification />
    </AdminLayout>
  }
/>

<Route
  path="/notifications/view/:id"
  element={
    <AdminLayout>
      <ViewNotification />
    </AdminLayout>
  }
/>

        {/* Contact Messages */}

        <Route
          path="/contact-messages"
          element={
            <AdminLayout>
              <ContactMessages />
            </AdminLayout>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <AdminLayout>
              <Settings />
            </AdminLayout>
          }
        />


 {/* Gallery */}

        <Route
          path="/gallery"
          element={
            <AdminLayout>
              <Gallery />
            </AdminLayout>
          }
        />
<Route path="/gallery/add" element={<AdminLayout><AddGallery /></AdminLayout>} />

<Route path="/gallery/edit/:id" element={<AdminLayout><EditGallery /></AdminLayout>} />

<Route path="/gallery/view/:id" element={<AdminLayout><ViewGallery /></AdminLayout>} />


      </Routes>

    </BrowserRouter>
  );
};

export default MainRouter;