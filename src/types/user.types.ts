export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    role: 'OWNER' | 'ADMIN' | 'USER' | string;
    fbUser: boolean;
    managedUser: boolean;
    createdAt: string;
    updatedAt: string; 
  };
  
