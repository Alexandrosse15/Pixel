import { Category, categoryConfig } from '@/lib/articles'

interface Props {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: Props) {
  const config = categoryConfig[category]
  const sizeClass = size === 'sm' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'

  return (
    <span
      className={`category-badge ${config.color} ${config.textColor} ${sizeClass} font-black`}
    >
      {config.label}
    </span>
  )
}
