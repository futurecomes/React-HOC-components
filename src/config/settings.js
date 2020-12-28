const Bowser = require("bowser");

export const APP_NAME = 'Messy Bun';
export const HOST = `/api`;
export const AUDIO_HOST = `/audio`;
export const STRIPE_KEY =
    process.env.REACT_APP_ENV === 'development'
        ? 'pk_test_wZnyfsU2rtH5YEXDnsNw3h1E'
        : 'pk_live_l3OeU6J5XseoqoG95Q0ZpKkr';
export const FADE_DURATION = 5;
export const format = ['mp3', 'opus', 'ogg', 'wav', 'aac', 'm4a', 'mp4', 'webm'];
export const routes = [
    'blog',
    'about',
    'discover',
    'listen',
    'how-to-get-started',
    'faqs',
    'contact',
    'create',
    'my-podcasts',
    'subscribed',
    'account',
    'join',
    'signout',
    'signin',
    'reset',
    'profile',
    'show',
    'marketplace',
    'awards',
    'podcastideagenerator',
];
export const maximumNumberOfSnippetsInEditor = 30;
export const stripeConnectClientId =
    process.env.REACT_APP_ENV === 'development'
        ? 'ca_DG4hG5hMLvw0e3QPyk0SkWbWdePRfNUv'
        : 'ca_DG4hGtiy5K7TaWlCuJP5yAAgURLEPyvV';

const browser = Bowser.getParser(window.navigator.userAgent);

const isChrome = browser.getBrowser().name === "Chrome";
const isFirefox = browser.getBrowser().name === "Firefox";
export const isModernBrowser = (isChrome && +browser.getBrowser().version.match(/\d+/i)[0] >= 75)
    || (isFirefox && +browser.getBrowser().version.match(/\d+/i)[0] >= 67);

export const isBrowserWarning = ((!isFirefox && !isChrome) && "Messy works best in Chrome or Firefox")
    || (!isModernBrowser && "For best experience in the Recording Studio we suggest using the latest version of Chrome or Firefox.");
