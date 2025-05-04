import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// What can we do?, We can either create a renderMenuItem prop and a render DialogProp, This will not work properly I think,
// We can create a Wrraper with Dialog instead.

interface ResponsiveDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
}

export function ResponsiveDialog({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

// We can seprate the whole Dropdown and the Dialog, use states to manage the openess of the Dialog.


export const ResponsiveDialogV2 = ({
  title,
  description,
  setIsOpen,
  isOpen,
  children,
}: ResponsiveDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

// You can either render a Trigger or, Render a Normal DropDownItem.
