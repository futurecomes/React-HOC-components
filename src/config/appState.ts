import { PodcastWizardState } from 'src/modules/PodcastWizard/models/podcastWizard';

export enum Reducer {
    Auth = 'auth',
    Billing = 'billing',
    Podcasts = 'podcasts',
    PodcastWizard = 'podcastWizard',
    singleEpisodeReducer = 'singleEpisodeReducer',
    Form = 'form',
    Ads = 'ads',
    Admin = 'admin',
    Messages = 'messages',
    Pages = 'pages',
    Ui = 'ui',
    Audio = 'audio',
    Recording = 'recording',
    Editor = 'editor',
    EditorMeta = 'editorMeta',
    Shows = 'shows',
    Profile = 'profile',
    ArtCreator = 'artCreator',
    Analytics = 'analytics',
    Forms = 'forms',
    ShowsReducers = 'showsReducers',
}

type LegacyState = Record<Reducer, any>;

export interface AppState extends LegacyState {
    // Rematch models
    podcastWizard: PodcastWizardState;
}
