import { PharmacyEmployee } from "@/types/pharmacy.types";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<PharmacyEmployee>[] = [
    {
        header: "name",
        accessorKey: "user.username"
    }
]