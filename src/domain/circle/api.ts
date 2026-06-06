import appAPIClient from '@/core/apiClient/appApiClient';
import { Result } from '@/core/apiClient/types';

import { NormalizedCircles } from './normalizedTypes';

async function getCircleAPI(): Promise<Result<NormalizedCircles>> {
  return appAPIClient.get<NormalizedCircles>('/api/v1/circles');
}

export default getCircleAPI;
