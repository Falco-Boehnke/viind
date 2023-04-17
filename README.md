# Billing GUI for viind

- Microservices, hier Billing-Service
    - Kümmert sich um Handling für Credits eines Useraccounts der Credits zum Chatten nutzt
- Api erreichbar als Graphql Schnittstelle mit einem Bearer Token (sollte also nicht gebundelt werden / sichtbar sein)


### Live Build

Live Build can be found here `https://viind-falco-boehnke.vercel.app/`



### Deployment

#### Locally
1. Clone Repo via `git@github.com:Falco-Boehnke/viind.git`
2. Install dependencies `yarn` or `npm install`
3. Get env-variables `GRAPHQL_ENDPOINT` and `GRAPHQL_BEARER_TOKEN` and `VERCEL_URL`
4. Run `yarn dev` - This will autogenerate graphql files

#### Managed Deployment via Vercel

1. Create Vercel Account
2. Publicize Repo
3. Create new Vercel deployment, inbuilt assistant will give all necessary information
4. Deployment starts the first time when a push is made to the main branch

#### Self Hosting
Nextjs apps can be build and bundled and are then useable in any node.js environment, including Docker containers (for example docker-compose)
For more information look here https://nextjs.org/docs/deployment



