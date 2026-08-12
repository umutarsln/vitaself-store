/** Ülke adından ISO 3166-1 alpha-2 kodu çözümler. */
export function countryNameToCode(country: string): string | null {
  const normalized = country.trim().toLowerCase()

  const map: Record<string, string> = {
    türkiye: 'TR',
    turkey: 'TR',
    tr: 'TR',
    'united states': 'US',
    usa: 'US',
    us: 'US',
    deutschland: 'DE',
    germany: 'DE',
    de: 'DE',
    'russian federation': 'RU',
    russia: 'RU',
    ru: 'RU',
    'united kingdom': 'GB',
    uk: 'GB',
    gb: 'GB',
  }

  return map[normalized] ?? null
}
