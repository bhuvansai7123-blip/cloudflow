import { useEffect } from 'react'
import { SITE_NAME, SITE_URL } from '../lib/constants'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Updates the page title and social/SEO meta tags for each route. */
export default function useDocumentMeta({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | AI-powered cloud monitoring (demo)`
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${SITE_URL}${path}`)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', `${SITE_URL}${path}`)
  }, [title, description, path])
}
