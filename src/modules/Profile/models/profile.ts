export type Status = 'active';

export type Plan = 'free' | string; // Not sure about other possibilities yet, like 'premium:12'

export interface User {
    id: number;
    frontentId?: number;
    name: string;
    email?: string;
    bio?: string;
    fbUrl?: string;
    twUrl?: string;
    igUrl?: string;
    ytUrl?: string;
    customUrl?: string;
    image?: string;
    creator?: boolean;
    status: Status;
    lastActive: number;
    memberSince: number;
    location?: string;
    planId: Plan;
    emailVerified: boolean;
    createdAt: number;
    updatedAt: number;
    modifiedBy: number;
    musicLibrary: number[];
    musicLibraryTotalAccess: boolean;
    recordedSomething: boolean;
    snippetDropped: boolean;
    stripeToken?: string;
    stripeExpressAccount?: string;
    cc_declined_at?: number;
}

export interface Profile {
    isFetching: boolean;
    user: User;
}
