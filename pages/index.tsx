import { DataCards } from "@/components/DataCards";
import { FlexSectionWithWrap } from "@/components/FlexWrapper";
import { FormWrapper } from "@/components/FormWrapper";
import { MainWrapper } from "@/components/MainWrapper";
import { SingleBillingResponse } from "@/types/getBillingType";
import { Billing } from "@/urql/urql.components";
import { useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";

export default function Home() {
  const [customerId, setCustomerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState<Billing | null>(null);

  return (
    <MainWrapper>
      <FormWrapper>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
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
            setIsLoading(false);
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

      <FlexSectionWithWrap style={{ justifyContent: "center" }}>
        {isLoading && (
          <CirclesWithBar color="#0175b2" height="200" width="200" />
        )}
        {!isLoading && !customerData && (
          <DataCards
            cards={[
              {
                content: [
                  {
                    title: "No Customer found",
                    text: "Please try again with another ID",
                  },
                ],
              },
            ]}
          />
        )}
        {!isLoading && customerData && (
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
        )}
      </FlexSectionWithWrap>
    </MainWrapper>
  );
}
