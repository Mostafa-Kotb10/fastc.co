import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditPharmacyForm from "./EditPharmacyForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const EditPharmacyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Pharmacy</DialogTitle>
          <DialogDescription>Edit your pharmacy here</DialogDescription>
        </DialogHeader>
        {/* <EditPharmacyForm  /> */}
      </DialogContent>
    </Dialog>
  );
};

export default EditPharmacyDialog;
