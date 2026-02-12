import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Customer {
    id: bigint;
    name: string;
    address: Address;
    phoneNumber: string;
}
export interface Address {
    street: string;
    city: string;
    zipCode: string;
    state: string;
}
export interface Order {
    id: bigint;
    status: string;
    fabricType: string;
    customer: Customer;
    measurements: Measurements;
    estimatedCompletionDate: string;
}
export interface UserProfile {
    name: string;
}
export interface Measurements {
    hips: number;
    chest: number;
    inseam: number;
    waist: number;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCustomer(name: string, address: Address, phoneNumber: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(customerId: bigint, measurements: Measurements, fabricType: string, status: string, estimatedCompletionDate: string): Promise<bigint>;
    deleteCustomer(customerId: bigint): Promise<void>;
    deleteOrder(orderId: bigint): Promise<void>;
    getAllCustomers(): Promise<Array<Customer>>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomer(customerId: bigint): Promise<Customer>;
    getOrder(orderId: bigint): Promise<Order>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrder(orderId: bigint, measurements: Measurements, fabricType: string, status: string, estimatedCompletionDate: string): Promise<void>;
}
