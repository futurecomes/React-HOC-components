import { createModel } from '@rematch/core';
import { filter, xor } from 'lodash';

import { PodcastWizardState, PodcastWizardStepsEnum } from '../models/podcastWizard';
import { podcastWizardInitialState } from '../models/podcastWizardData';

interface ChangeShowInfoPayload {
    field: string;
    value: string;
}

const podcastWizardModel = {
    state: podcastWizardInitialState,
    reducers: {
        changeStep: (state: PodcastWizardState, step: PodcastWizardStepsEnum): PodcastWizardState => ({
            ...state,
            currentStep: step,
        }),
        changeShowInfo: (state: PodcastWizardState, payload: ChangeShowInfoPayload): PodcastWizardState => ({
            ...state,
            show: {
                ...state.show,
                [payload.field]: payload.value,
            },
        }),
        toggleShowCategory: (state: PodcastWizardState, categoryId: number): PodcastWizardState => ({
            ...state,
            show: {
                ...state.show,
                categoriesIds:
                    state.show.categoriesIds.length < 3
                        ? xor(state.show.categoriesIds, [categoryId])
                        : filter(state.show.categoriesIds, id => id !== categoryId),
            },
        }),
    },
};

export const podcastWizard = createModel(podcastWizardModel);
