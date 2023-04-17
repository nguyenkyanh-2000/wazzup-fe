import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import CreateEventPage from "../pages/CreateEventPage";
import EventsPage from "../pages/EventsPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyProfile from "../pages/MyProfile";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import SingleEventPage from "../pages/SingleEventPage";
import UserProfile from "../pages/UserProfile";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:id" element={<SingleEventPage />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/events" element={<EventsPage />} />
          <Route
            path="/users/me"
            element={
              <AuthRequire>
                <MyProfile />
              </AuthRequire>
            }
          />
          <Route
            path="/createEvent"
            element={
              <AuthRequire>
                <CreateEventPage />
              </AuthRequire>
            }
          />
        </Route>
        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
