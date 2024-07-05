export interface UserInterface {
    _id?: string;
    userId?: string;
    email: string;
    firstName: string;
    lastName: string; 
    password: string;
    confirmPassword?: string;
    createdAt?: Date;
    updatedAt?: Date; 
    deletedAt?: Date; 
}