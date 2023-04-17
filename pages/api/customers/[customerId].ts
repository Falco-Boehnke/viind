// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SingleBillingResponse } from '@/types/getBillingType';
import { getUrqlClient } from '@/urql/client';
import { Billing, BillingCustomerDocument } from '@/urql/urql.components';

import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SingleBillingResponse>
) {
    if (!req.query?.customerId) {
        return res.status(400).json({ message: "Missing customerId", code: 400 })
    }

    const urqlClient = getUrqlClient();
    const customerData = await urqlClient.query(BillingCustomerDocument, { customerId: req.query.customerId }).toPromise();

    if (!customerData) return res.status(404).json({ message: "No entity found for id", code: 404, data: null })


    return res.status(200).json({ message: "", code: 200, data: customerData.data.billing })
}
