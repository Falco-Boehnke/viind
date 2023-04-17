import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Billing = {
  __typename?: 'Billing';
  /** additionally booked credits */
  additionalCredits: Scalars['Int'];
  /** Customer identification */
  customerId: Scalars['String'];
  /** debt limit for additional credits */
  debtLimit: Scalars['Int'];
  /** Billing Id */
  id: Scalars['ID'];
  /** Number of credits available to the customer per month */
  monthlyCredits: Scalars['Int'];
  /** remaining credits for this month */
  remainingCredits: Scalars['Int'];
  /** credits used within one month */
  usedCredits: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds additional credits to the billing plan of the given customer. */
  addAdditionalCredits: Billing;
  /** Checks if the customer has enough credits to start a new conversation with the given user. This changes the used credits and returns true if there are enough credits available or false otherwise. If a conversation with the given user is already running, true is returned without changing the credits budget. */
  checkAvailableCredits: Scalars['Boolean'];
  /** Sets the given billing plan for the given customer. */
  setBillingPlan: Billing;
};


export type MutationAddAdditionalCreditsArgs = {
  additionalCredits: Scalars['Int'];
  customerId: Scalars['String'];
};


export type MutationCheckAvailableCreditsArgs = {
  customerId: Scalars['String'];
  inputChannel: Scalars['String'];
  senderId: Scalars['String'];
};


export type MutationSetBillingPlanArgs = {
  setBillingInput: SetBillingInput;
};

export type Query = {
  __typename?: 'Query';
  billing?: Maybe<Billing>;
};


export type QueryBillingArgs = {
  customerId: Scalars['String'];
};

export type SetBillingInput = {
  /** Customer identification */
  customerId: Scalars['String'];
  /** debt limit for additional credits */
  debtLimit?: InputMaybe<Scalars['Int']>;
  /** Number of credits available to the customer per month */
  monthlyCredits: Scalars['Int'];
};

export type BillingCustomerQueryVariables = Exact<{
  customerId: Scalars['String'];
}>;


export type BillingCustomerQuery = { __typename?: 'Query', billing?: { __typename?: 'Billing', id: string, customerId: string, monthlyCredits: number, usedCredits: number, additionalCredits: number, remainingCredits: number, debtLimit: number } | null };


export const BillingCustomerDocument = gql`
    query BillingCustomer($customerId: String!) {
  billing(customerId: $customerId) {
    id
    customerId
    monthlyCredits
    usedCredits
    additionalCredits
    remainingCredits
    debtLimit
  }
}
    `;

export function useBillingCustomerQuery(options: Omit<Urql.UseQueryArgs<BillingCustomerQueryVariables>, 'query'>) {
  return Urql.useQuery<BillingCustomerQuery, BillingCustomerQueryVariables>({ query: BillingCustomerDocument, ...options });
};