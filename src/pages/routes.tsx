import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "@/pages/home/Home";
import SignPortal from "./sign-portal/portal/SignPortal";
import { SignPortalProvider } from "../context/SignPortalContext";
import Dashboard from "./dashboard/Dashboard";
import Inventory from "./dashboard/inventory/Inventory";
import Sales from "./dashboard/sales/Sales";
import Onboarding from "./sign-portal/configuration/onboarding";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RequireSignUp from "@/components/auth/RequireSignUp";
import PickPharmacy from "@/pages/pick-pharmacy/PickPharmacy";

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
        path: "/dashboard",
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
            element: <Sales />,
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
        element: <PickPharmacy />
      }
    ],
  },
]);
