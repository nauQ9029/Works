// types.ts
export type Location = {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
};

// ---------------------------------------
// USER MODEL
// ---------------------------------------
export type UserRole =
    | "customer"
    | "mechanic"
    | "garageOwner"
    | "garageEmployee"
    | "admin";

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: "customer" | "mechanic" | "garageOwner" | "garageEmployee" | "admin";
    avatar?: string;
    birthday?: Date;
    language?: string;
    rawAddress?: string;
    address?: string;
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
    createdAt?: Date;
    updatedAt?: Date;
}

// ---------------------------------------
// MECHANIC MODEL (extends USER)
// ---------------------------------------
export interface Mechanic {
    _id: string;
    userId: string;
    name?: string; // For populated user data
    avatar?: string; // For populated user data
    skills: string[];
    experienceYears: number;
    licenseNumber?: string;
    rating?: number;
    ratingAverage?: number;
    availability: boolean;
    services?: string[];
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
    createdAt?: Date;
    updatedAt?: Date;
}

// ---------------------------------------
// SERVICE MODEL
// ---------------------------------------
export interface Service {
    _id: string;
    name: string;
    description?: string;
    price?: number;
    estimatedTime?: string;
    category?: string;
}

// ---------------------------------------
// BOOKING MODEL
// ---------------------------------------
export interface Booking {
    _id: string; // Add this line
    customerId: string;
    mechanicId?: string;
    garageId?: string;
    serviceId?: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    status: "chờ thợ" | "đã nhận" | "đang di chuyển" | "đang sửa" | "hoàn thành" | "hủy";
    scheduledAt?: Date;
    completedAt?: Date;
    price?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
