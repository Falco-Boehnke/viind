import { Billing } from "@/urql/urql.components";

export interface BillingApiResponse<T> {
    message: string;
    code: number;
    data?: T | null;


}

export interface SingleBillingResponse extends BillingApiResponse<Billing> { }