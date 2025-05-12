import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Receipts from "./components/Receipts";
import Reports from "./components/Reports";
import { useSearchParams } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

const SalesPage = () => {
  const [, setSearchParams] = useSearchParams();

  const handleTabChange = () => {
    setSearchParams({})
  };

  return (
    <>
      <DashboardHeader>Sales</DashboardHeader>
      <Tabs
        defaultValue="sales"
        className="mt-10 flex items-center justify-center"
      >
        <TabsList>
          <TabsTrigger value="sales" onClick={handleTabChange}>sales</TabsTrigger>
          <TabsTrigger value="receipts">receipts</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="sales" onClick={handleTabChange}>
          <Reports />
        </TabsContent>
        <TabsContent className="w-full" value="receipts">
          <Receipts />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SalesPage;
