import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { SignPortalProvider } from "../context/SignPortalContext";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RequireSignUp from "@/components/auth/RequireSignUp";

const Home = lazy(() => import("@/pages/home/Home"));
const SignPortal = lazy(() => import("./sign-portal/portal/SignPortal"));
const DashboardLayout = lazy(() => import("./dashboard"));
const Inventory = lazy(() => import("./dashboard/inventory"));
const Onboarding = lazy(() => import("./sign-portal/configuration/onboarding"));
const PickPharmacy = lazy(() => import("@/pages/pick-pharmacy/PickPharmacy"));
const PharmacyPage = lazy(() => import("./dashboard/pharmacy"));
const ExpiryPage = lazy(() => import("./dashboard/expiry-page"));
const SalesPage = lazy(() => import("./dashboard/sales"));
const EmployeesPage = lazy(() => import("./dashboard/employees"));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-portal",
        element: (
          <SignPortalProvider>
            <SignPortal />
          </SignPortalProvider>
        ),
      },
      {
        path: "/dashboard/:pharmacyId/",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true
          },
          {
            path: "inventory",
            element: <Inventory />,
          },
          {
            path: "sales",
            element: <SalesPage />,
          },
          {
            path: "pharmacy",
            element: <PharmacyPage />,
          },
          {
            path: "expiry-warning",
            element: <ExpiryPage />,
          },
          {
            path: "employees",
            element: <EmployeesPage />,
          },
        ],
      },
      {
        path: "onboarding",
        element: (
          <RequireSignUp>
            <Onboarding />
          </RequireSignUp>
        ),
      },
      {
        path: "pick-pharmacy",
        element: (
          <ProtectedRoute>
            <PickPharmacy />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
