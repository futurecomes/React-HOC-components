import { RematchRootState } from '@rematch/core';

import { podcastWizard } from 'src/modules/PodcastWizard/rematchModels/podcastWizard';

export const rematchModels = { podcastWizard };

export type RematchModels = RematchRootState<typeof rematchModels>;
