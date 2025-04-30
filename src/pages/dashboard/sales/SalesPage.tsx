import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sales from "./Sales";
import Receipts from "./Receipts";

const SalesPage = () => {
  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">Sales</h1>
      <Tabs
        defaultValue="sales"
        className="mt-10 flex items-center justify-center"
      >
        <TabsList className="">
          <TabsTrigger value="sales">sales</TabsTrigger>
          <TabsTrigger value="receipts">receipts</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="sales">
          <Sales />
        </TabsContent>
        <TabsContent className="w-full" value="receipts">
          <Receipts />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SalesPage;
