export interface Payout {
    id?: string;
    country: string;
    amount: number;
}

export interface Campaign {
    id?: string;
    title: string;
    landingPageURL: string;
    isRunning: boolean;
    payouts: Payout[];
}