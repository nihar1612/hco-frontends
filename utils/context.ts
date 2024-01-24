import { createStateContext } from 'react-use';

export const [useSharedState, SharedStateProvider] = createStateContext<{ [key: string]: any }>({});
