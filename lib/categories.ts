export type Category = 'tests' | 'previews' | 'dossiers' | 'industrie'

export const categoryConfig: Record<Category, { label: string; color: string; textColor: string }> = {
  tests: { label: 'Test', color: 'bg-brand', textColor: 'text-white' },
  previews: { label: 'Preview', color: 'bg-amber-500', textColor: 'text-black' },
  dossiers: { label: 'Dossier', color: 'bg-violet-600', textColor: 'text-white' },
  industrie: { label: 'Industrie', color: 'bg-emerald-600', textColor: 'text-white' },
}
