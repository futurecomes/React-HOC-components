export enum PodcastWizardStepsEnum {
    ShowName = 'podcastName',
    ShowCategories = 'podcastCategories',
    ShowDescription = 'podcastDescription',
    Editor = 'editor',
    Recorder = 'recorder',
}

export interface PodcastWizardStepData {
    component: React.ComponentType<any>;
}

export type PodcastWizardStepsData = Record<string, PodcastWizardStepData>;

export interface Show {
    title: string;
    description: string;
    categoriesIds: number[];
}

export interface PodcastWizardState {
    currentStep: PodcastWizardStepsEnum;
    show: Show;
}
