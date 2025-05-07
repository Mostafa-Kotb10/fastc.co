import { Button } from "@/components/ui/button";

interface DeleteEmployeeProps {
  setIsOpen: (state: boolean) => void;
  onDelete: () => void;
}

const DeleteEmployee = ({ onDelete, setIsOpen }: DeleteEmployeeProps) => {
  return (
    <div className="flex w-full justify-between">
      <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant="destructive"
        onClick={() => {
          onDelete();
          setIsOpen(false);
        }}
      >
        delete
      </Button>
    </div>
  );
};

export default DeleteEmployee;
