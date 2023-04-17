import { DataCards } from "@/components/DataCards";
import { FormWrapper } from "@/components/FormWrapper";
import { MainWrapper } from "@/components/MainWrapper";
import { SingleBillingResponse } from "@/types/getBillingType";
import { Billing } from "@/urql/urql.components";
import { useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState<Billing | null>(null);

  const fetchCustomer = async () => {
    const billingResponse: SingleBillingResponse = await (
      await fetch(`/api/customers/${customerId}`)
    ).json();
    if (billingResponse.code !== 200) {
      console.error({
        error: billingResponse.message,
        code: billingResponse.code,
      });
    }

    setCustomerData(billingResponse.data || null);
  };

  return (
    <MainWrapper>
      <FormWrapper>
        <form
          method="GET"
          onSubmit={(e) => {
            e.preventDefault();
            fetchCustomer();
          }}
        >
          <input
            value={customerId}
            onInput={(e) => setCustomerId(e.currentTarget.value)}
            type="text"
            name="customerId"
            required
          />
          <button type="submit">Customer anfragen</button>
        </form>
      </FormWrapper>
      {customerData && (
        <section>
          <DataCards
            cards={[
              {
                content: [{ title: "ID", text: customerData.customerId }],
              },
              {
                content: [
                  { title: "Verbraucht", text: customerData.usedCredits },
                  { title: "Verbleibend", text: customerData.remainingCredits },
                ],
              },
              {
                content: [
                  { title: "Monatlich", text: customerData.monthlyCredits },
                  { title: "Zusätzlich", text: customerData.additionalCredits },
                  { title: "Überziehungslimit", text: customerData.debtLimit },
                ],
              },
            ]}
          />
        </section>
      )}
    </MainWrapper>
  );
}
