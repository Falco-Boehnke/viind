import { SingleBillingResponse } from "@/types/getBillingType";
import { Billing } from "@/urql/urql.components";
import { useState } from "react";

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
    <main>
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

      {customerData && (
        <table>
          <tr>
            <th>ID</th>
            <th>Monthly Credits</th>
            <th>Additional Credits</th>
            <th>Used Credits</th>
            <th>Reamining Credits</th>
            <th>Debt Limit</th>
          </tr>
          <tr>
            <td>{customerData.id}</td>
            <td>{customerData.monthlyCredits}</td>
            <td>{customerData.additionalCredits}</td>
            <td>{customerData.usedCredits}</td>
            <td>{customerData.remainingCredits}</td>
            <td>{customerData.debtLimit}</td>
          </tr>
        </table>
      )}
    </main>
  );
}
