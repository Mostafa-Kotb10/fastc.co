import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "@/pages/home/Home";
import SignPortal from "./sign-portal/portal/SignPortal";
import { SignPortalProvider } from "../context/SignPortalContext";
import Dashboard from "./dashboard/Dashboard";
import Inventory from "./dashboard/inventory/Inventory";
import Onboarding from "./sign-portal/configuration/onboarding";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RequireSignUp from "@/components/auth/RequireSignUp";
import PickPharmacy from "@/pages/pick-pharmacy/PickPharmacy";
import PharmacyPage from "./dashboard/pharmacy";
import ExpiryPage from "./dashboard/expiry-page";
import SalesPage from "./dashboard/sales/SalesPage";
import EmployeesPage from "./dashboard/employees/EmployeesPage";

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
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
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
            element: <EmployeesPage />
          }
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
