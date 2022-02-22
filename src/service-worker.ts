/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

clientsClaim()

precacheAndRoute(self.__WB_MANIFEST)

const fileExtensionRegExp = new RegExp('/[^/?]+\\.[^/]+$')

interface IRoute {
	request: Request
	url: URL
}

registerRoute(({ request, url }: IRoute) => {
	if (request.mode !== 'navigate') return false
	if (url.pathname.startsWith('/_')) return false
	if (url.pathname.match(fileExtensionRegExp)) return false
	return true
}, createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'))

registerRoute(
	({ url }: IRoute) =>
		url.origin === self.location.origin && url.pathname.endsWith('.png'),
	new StaleWhileRevalidate({
		cacheName: 'images',
		plugins: [new ExpirationPlugin({ maxEntries: 50 })],
	})
)

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting()
	}
})
