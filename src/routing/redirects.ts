interface Redirect {
    from: string;
    to: string;
}

export const redirects: Redirect[] = [
    { from: '/discover', to: '/listen' },
    { from: '/vip-extras', to: '/pricing' },
    { from: '/blog', to: '/' },
];
