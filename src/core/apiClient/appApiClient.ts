import createAPIClient from '@/core/apiClient/createAPIClient';
import { getClientConfig } from '../config/clientConfig';

const appAPIClient = createAPIClient(getClientConfig().API_URL);

export default appAPIClient;
