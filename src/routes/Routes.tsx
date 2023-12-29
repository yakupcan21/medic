import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/loginpage/LoginPage"
import ProfilePage from "../pages/profilepage/ProfilePage"
import AboutPage from "../pages/aboutpage/AboutPage"
import DoctorView from "../pages/doctorview/DoctorView"
import YapayZeka from "../pages/YapayZeka/YapayZeka"

export const router = createBrowserRouter([
    { path: "", element: <LoginPage /> },
    { path: "profile", element: <ProfilePage /> },
    { path: "about", element: <AboutPage /> },
    { path: "doctorview", element: <DoctorView /> },
    { path: "yapayzeka", element: <YapayZeka /> }
])