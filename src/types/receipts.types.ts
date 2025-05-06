export type ReceiptItem = {
    drugName: string
    units: number
    pack: number
    discount: number
    amountDue: number
    status: "SATISFIED" | "RETURNED" | "REPLACED" // you can expand this union based on your domain
  }
  
  export type Cashier = {
    id: number
    name: string
    username: string
    email: string
    phone: string
    role: "OWNER" | "CASHIER" | "ADMIN" // update with all possible roles
    fbUser: boolean
    managedUser: boolean
    createdAt: string
    updatedAt: string
  }
  
  export type ShiftTime = {
    hour: number
    minute: number
    second: number
    nano: number
  }
  
  export type Shift = {
    id: number
    name: string
    startTime: ShiftTime
    endTime: ShiftTime
  }
  
  export type Receipt = {
    id: number
    items: ReceiptItem[]
    cashier: Cashier
    shift: Shift
    total: number
    status: "ISSUED" | "CANCELLED" | "COMPLETED" // update based on your possible statuses
    createdAt: string
    updatedAt: string
  }
  
  export type ReceiptResponse = Receipt[]
  