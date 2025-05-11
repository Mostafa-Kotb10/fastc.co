import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Receipts from "./components/Receipts";
import Reports from "./components/Reports";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const SalesPage = () => {
  const [, setSearchParams] = useSearchParams();

  const handleTabChange = () => {
    setSearchParams({})
  };

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">Sales</h1>
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
