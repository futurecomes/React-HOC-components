import { Editor } from '../stepComponents/Editor';
import { Recorder } from '../stepComponents/Recorder';
import { ShowCategories } from '../stepComponents/ShowCategories';
import { ShowDescription } from '../stepComponents/ShowDescription';
import { ShowName } from '../stepComponents/ShowName';
import { PodcastWizardState, PodcastWizardStepsData, PodcastWizardStepsEnum } from './podcastWizard';

export const podcastWizardStepsData: PodcastWizardStepsData = {
    [PodcastWizardStepsEnum.ShowName]: {
        component: ShowName,
    },
    [PodcastWizardStepsEnum.ShowCategories]: {
        component: ShowCategories,
    },
    [PodcastWizardStepsEnum.ShowDescription]: {
        component: ShowDescription,
    },
    [PodcastWizardStepsEnum.Recorder]: {
        component: Recorder,
    },
    [PodcastWizardStepsEnum.Editor]: {
        component: Editor,
    },
};

export const maxCategoriesAmount = 3;

export const podcastWizardInitialState: PodcastWizardState = {
    currentStep: PodcastWizardStepsEnum.ShowName,
    show: {
        title: '',
        description: '',
        categoriesIds: [],
    },
};
