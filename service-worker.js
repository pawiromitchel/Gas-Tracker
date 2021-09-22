importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// Make your JS and CSS ⚡ fast by returning the assets from the cache, while making sure they are updated in the background for the next use.
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.CacheFirst()
);