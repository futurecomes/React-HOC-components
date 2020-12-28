import React from 'react';

interface Route {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
    secured?: boolean;
    loggedInRedirect?: boolean;
    adminFeature?: boolean;
    paidFeature?: boolean;
}

export const routes: Route[] = [
    {
        path: '/',
        component: React.lazy(() => import('src/modules/Homepage/Homepage')),
        exact: true,
    },
    {
        path: '/listen',
        component: React.lazy(() => import('src/modules/Podcasts/Listen/Listen')),
    },
    {
        path: '/subscribed',
        component: React.lazy(() => import('src/modules/old/Subscribed')),
        secured: true,
    },
    {
        path: '/show/:id',
        component: React.lazy(() => import('src/modules/Podcasts/Show/Show')),
    },
    {
        path: '/show-not-found',
        component: React.lazy(() => import('src/modules/Podcasts/Show/components/ShowNotFound')),
    },
    {
        path: '/podcast/:guid',
        component: React.lazy(() => import('src/modules/Podcasts/Episode/Episode')),
    },
    {
        path: '/create/record/:id?',
        component: React.lazy(() => import('src/modules/old/Create')),
        secured: true,
    },
    {
        path: '/create/(record|editor|drafts)?',
        component: React.lazy(() => import('src/modules/old/Create')),
        secured: true,
    },
    {
        path: '/my-podcasts',
        component: React.lazy(() => import('src/modules/MyPodcast')),
        secured: true,
    },
    {
        path: '/profile/:profileId',
        component: React.lazy(() => import('src/modules/Profile/Profile')),
    },
    {
        path: '/signin',
        component: React.lazy(() => import('src/modules/Auth/containers/SignIn')),
        loggedInRedirect: true,
    },
    {
        path: '/join',
        component: React.lazy(() => import('src/modules/Auth/containers/SignUp')),
    },
    {
        path: '/pricing',
        component: React.lazy(() => import('src/modules/Pricing/Pricing')),
    },
    {
        path: '/reset/:token?',
        component: React.lazy(() => import('src/modules/old/ResetPassword')),
        loggedInRedirect: true,
    },
    {
        path: '/verify/email/:token',
        component: React.lazy(() => import('src/modules/old/VerifyAccount')),
    },
    {
        path: '/verify',
        component: React.lazy(() => import('src/modules/old/VerifyAccount')),
    },
    {
        path: '/signout',
        component: React.lazy(() => import('src/modules/Auth/containers/SignOut')),
    },
    {
        path: '/account/(personal|password|billing)?',
        component: React.lazy(() => import('src/modules/old/Account')),
        secured: true,
    },
    {
        path: '/admin/dashboard',
        component: React.lazy(() => import('src/modules/old/Admin/Dashboard')),
        adminFeature: true,
    },
    {
        path: '/admin/coaching',
        component: React.lazy(() => import('src/modules/old/Admin/Coaching')),
        adminFeature: true,
    },
    {
        path: '/admin/users/:id',
        component: React.lazy(() => import('src/modules/old/Admin/User')),
        adminFeature: true,
    },
    {
        path: '/admin/users',
        component: React.lazy(() => import('src/modules/old/Admin/Users')),
        adminFeature: true,
    },
    {
        path: '/admin/shows/:showId/:episodeId',
        component: React.lazy(() => import('src/modules/old/Admin/Episode')),
        adminFeature: true,
    },
    {
        path: '/admin/shows/:id',
        component: React.lazy(() => import('src/modules/old/Admin/Show')),
        adminFeature: true,
    },
    {
        path: '/admin/shows',
        component: React.lazy(() => import('src/modules/old/Admin/Shows')),
        adminFeature: true,
    },
    {
        path: '/admin/ads/audio/:id',
        component: React.lazy(() => import('src/modules/old/Admin/AudioAd')),
        adminFeature: true,
    },
    {
        path: '/admin/ads/audio',
        component: React.lazy(() => import('src/modules/old/Admin/AudioAds')),
        adminFeature: true,
    },
    {
        path: '/admin/ads/visual/:id',
        component: React.lazy(() => import('src/modules/old/Admin/VisualAd')),
        adminFeature: true,
    },
    {
        path: '/admin/ads/visual',
        component: React.lazy(() => import('src/modules/old/Admin/VisualAds')),
        adminFeature: true,
    },
    {
        path: '/admin/freemusic/:id',
        component: React.lazy(() => import('src/modules/old/Admin/FreeMusic')),
        adminFeature: true,
    },
    {
        path: '/admin/freemusic',
        component: React.lazy(() => import('src/modules/old/Admin/FreeMusics')),
        adminFeature: true,
    },
    {
        path: '/analytics/show/:show',
        component: React.lazy(() => import('src/modules/Analytics/containers/Analytics')),
        secured: true,
        paidFeature: true,
    },
    {
        path: '/about',
        component: React.lazy(() => import('src/modules/About/About')),
    },
    {
        path: '/faqs',
        component: React.lazy(() => import('src/modules/Faq/Faq')),
    },
    {
        path: '/privacy',
        component: React.lazy(() => import('src/modules/Auth/containers/Privacy')),
    },
    {
        path: '/terms',
        component: React.lazy(() => import('src/modules/Auth/containers/Terms')),
    },
    {
        path: '/how-to-get-started',
        component: React.lazy(() => import('src/modules/HowToGetStarted/HowToGetStarted')),
    },
    {
        path: '/how-to-submit',
        component: React.lazy(() => import('src/modules/old/HowToSubmit')),
    },
    {
        path: '/contact',
        component: React.lazy(() => import('src/modules/old/Contact')),
    },
    {
        path: '/podcastideagenerator',
        component: React.lazy(() => import('src/modules/old/PodcastIdeaGenerator')),
    },
    {
        path: '/billing/finalize-express',
        component: React.lazy(() => import('src/modules/old/StripeFinalize')),
    },
    {
        path: '/player',
        component: React.lazy(() => import('src/modules/Audio/containers/PlayerEmbed')),
    },
    {
        path: '',
        component: React.lazy(() => import('src/modules/Podcasts/Show/Show')),
    },
];

export const routesWithoutFooter = ['/join'];
