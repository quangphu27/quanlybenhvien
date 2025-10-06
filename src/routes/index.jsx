import { ROUTE } from "@/constants/route-constant";
import ClientLayout from "@/layouts/ClientLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/auth/NotFoundPage";
import ProfilePage from "@/pages/auth/ProfilePage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import BookingPage from "@/pages/client/Booking/BookingPage";
import HistoryBookingPage from "@/pages/client/Booking/HistoryBookingPage";
import DoctorDetail from "@/pages/client/Doctors/DoctorDetail";
import DoctorPage from "@/pages/client/Doctors/DoctorPage";
import HomePage from "@/pages/client/Home/HomePage";
import SpecialtyDetailPage from "@/pages/client/Specialties/SpecialtyDetailPage";
import SpecialtyPage from "@/pages/client/Specialties/SpecialtyPage";
import SpecialSchedulePage from "@/pages/admin/SpecialSchedulePage";
import DashboardPage from "@/pages/admin/DashboardPage";
import DoctorsPage from "@/pages/admin/DoctorsPage";
import SpecialtiesPage from "@/pages/admin/SpecialtiesPage";
import PatientsPage from "@/pages/admin/PatientsPage";
import AppointmentsPage from "@/pages/admin/AppointmentsPage";
import WorkSchedulesPage from "@/pages/admin/WorkSchedulesPage";
import UsersPage from "@/pages/admin/UsersPage";
import TestPage from "@/pages/admin/TestPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  // public route
  {
    path: ROUTE.HOME,
    element: <ClientLayout />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: ROUTE.SPECIALTY,
        element: <SpecialtyPage />,
      },
      {
        path: `${ROUTE.SPECIALTY_DETAIL}/:id`,
        element: <SpecialtyDetailPage />,
      },
      {
        path: ROUTE.DOCTOR,
        element: <DoctorPage />,
      },
      {
        path: `${ROUTE.DOCTOR_DETAIL}/:id`,
        element: <DoctorDetail />,
      },
      {
        path: `${ROUTE.BOOKING}/:id`,
        element: <BookingPage />,
      },
      {
        path: `${ROUTE.PROFILE}`,
        element: <ProfilePage />,
      },
      {
        path: `${ROUTE.HISTORY_BOOKING}`,
        element: <HistoryBookingPage />,
      },
    ],
  },
  {
    path: ROUTE.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTE.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: ROUTE.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: ROUTE.NOT_FOUND,
    element: <NotFoundPage />,
  },
  // Admin routes
  {
    path: ROUTE.ADMIN,
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <TestPage />,
      },
      {
        path: "doctors",
        element: <DoctorsPage />,
      },
      {
        path: "specialties",
        element: <SpecialtiesPage />,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "appointments",
        element: <AppointmentsPage />,
      },
      {
        path: "work-schedules",
        element: <WorkSchedulesPage />,
      },
      {
        path: "special-schedules",
        element: <SpecialSchedulePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },
]);
