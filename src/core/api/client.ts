import { getClientConfig } from '../config/clientConfig';
import createAPIClient from './createAPIClient';

const appAPIClient = createAPIClient(getClientConfig().API_URL);

export default appAPIClient;
