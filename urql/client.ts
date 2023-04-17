import { Client, cacheExchange, fetchExchange } from "@urql/core";

let client: Client | null = null;


export const getUrqlClient = () => {
    if (client) return client;

    client = new Client({
        url: process.env.GRAPHQL_ENDPOINT || "",
        exchanges: [cacheExchange, fetchExchange],
        fetchOptions: () => {
            return {
                headers: { authorization: process.env.GRAPHQL_BEARER_TOKEN || "" },
            };
        },
    });

    return client;
}