import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon } from "lucide-react";
import { ReportItem } from "../sales.types";

interface ReportModalProps {
  report: ReportItem;
}

const ReportModal = ({ report }: ReportModalProps) => {
  const { drug, cashier, quantity, revenue, profit, type, status } = report;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <EyeIcon className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report for {drug.name}</DialogTitle>
        </DialogHeader>

        {/* Drug Stats Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Drug Stats</h3>
          <div className="space-y-2">
            <p>
              <strong className="font-medium">Name:</strong> {drug.name}
            </p>
            <p>
              <strong className="font-medium">Sold Number:</strong> {quantity}
            </p>
            <p>
              <strong className="font-medium">Revenue:</strong> ${revenue.toFixed(2)}
            </p>
            <p>
              <strong className="font-medium">Profit:</strong> ${profit.toFixed(2)}
            </p>
            <p>
              <strong className="font-medium">Status:</strong> {status}
            </p>
            <p>
              <strong className="font-medium">Transaction Type:</strong> {type}
            </p>
          </div>
        </div>

        {/* Cashier Section */}
        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold">Cashier Info</h3>
          <div className="space-y-2">
            <p>
              <strong className="font-medium">Name:</strong> {cashier.name}
            </p>
            <p>
              <strong className="font-medium">Role:</strong> {cashier.role}
            </p>
            <p>
              <strong className="font-medium">Email:</strong> {cashier.email}
            </p>
            <p>
              <strong className="font-medium">Phone:</strong> {cashier.phone}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
