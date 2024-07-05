export interface UserInterface {
    id?: string;
    email: string;
    firstName: string;
    lastName: string; 
    password: string;
    confirmPassword?: string;
    createdAt?: Date;
    updatedAt?: Date; 
    deletedAt?: Date; 
}