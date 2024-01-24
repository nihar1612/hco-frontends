import { cacheExchange as createCacheExchange } from '@urql/exchange-graphcache';
import { cacheExchangeConfig } from './urqlCacheExchangeConfig';

const urqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_ENDPOINT || 'https://dawnapi.com';
const cacheExchange = createCacheExchange(cacheExchangeConfig);

export { urqlUrl, cacheExchange };
