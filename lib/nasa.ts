interface NasaSearchResponse {
  collection: {
    items: Array<{
      links?: Array<{ href: string; rel?: string }>
    }>
  }
}

export async function fetchNasaImage(query: string): Promise<string | null> {
  try {
    const url =
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`

    const res = await fetch(url, {
      next: { revalidate: 86400 }, // cache 24 h
    })

    if (!res.ok) return null

    const data: NasaSearchResponse = await res.json()
    const items = data?.collection?.items

    if (!Array.isArray(items) || items.length === 0) return null

    // links[0] is the thumbnail — good enough for a blurred full-screen background
    const href = items[0]?.links?.[0]?.href
    return typeof href === 'string' ? href : null
  } catch {
    return null
  }
}
