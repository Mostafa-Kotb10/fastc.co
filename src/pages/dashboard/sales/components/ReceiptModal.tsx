import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"; // Assuming Shadcn
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "../sales.types";
// import { Receipt } from "@/pages/dashboard/sales/receipts.types";


interface ReceiptModalProps {
  receipt: Receipt;
}

const ReceiptModal = ({ receipt }: ReceiptModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>view</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Receipt #{receipt.id}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Issued on {new Date(receipt.createdAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-sm">
          <Separator />
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Cashier</p>
              <p className="font-medium">{receipt.cashier.username}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Shift</p>
              <p className="font-medium">{receipt.shift.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Receipt Status</p>
              <p className="font-medium">{receipt.status}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Time</p>
              <p className="font-medium">
                {new Date(receipt.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <Separator />

          {/* Items List */}
          <ScrollArea className="">
            <div className="max-h-[300px]">
              <p className="mb-2 text-lg font-semibold">Items</p>
              <ul className="space-y-3">
                {receipt.items.map((item, index) => (
                  <li
                    key={index}
                    className="bg-muted/50 flex items-start justify-between rounded-md border p-3"
                  >
                    <div>
                      <p className="font-medium">{item.drugName}</p>
                      <p className="text-muted-foreground text-xs">
                        Units: {item.units} | Pack: {item.pack}
                      </p>
                    </div>
                    <div className="text-primary text-right text-sm font-semibold">
                      LE{item.amountDue.toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>

          {/* Total */}
          <div className="flex justify-end border-t pt-4">
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Total</p>
              <p className="text-primary text-xl font-bold">
              LE{receipt.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
