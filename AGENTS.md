# Project Architecture Rules

- Public content queries use React Query caching with realtime invalidation, because visitors should avoid redundant requests while still receiving admin updates promptly.
- Page routes are loaded with React lazy imports, because each visitor should initially download only the page they open.
- Bundled photographic assets use optimized WebP variants, because the site must keep media payloads small without changing visible content.
