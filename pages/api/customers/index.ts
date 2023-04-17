// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    code: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    return res.status(501).json({ message: "This route is not implemented yet", code: 501 })
}
