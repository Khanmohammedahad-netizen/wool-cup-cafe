'use client';

export const CATEGORIES = [
  { id: 'classics',  label: 'Classics' },
  { id: 'cold',      label: 'Cold Brews' },
  { id: 'lattes',    label: 'Lattes' },
  { id: 'frappes',   label: 'Frappes' },
  { id: 'matcha',    label: 'Matcha & Tea' },
  { id: 'food',      label: 'Bites & Burgers' },
  { id: 'mains',     label: 'Mains & Pizzas' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'desserts',  label: 'Desserts' },
] as const;

interface MenuCategoryNavProps {
  activeCategory: string;
  onCategoryClick: (id: string) => void;
  variant: 'mobile' | 'desktop';
}

export function MenuCategoryNav({ activeCategory, onCategoryClick, variant }: MenuCategoryNavProps) {
  if (variant === 'mobile') {
    return (
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className={`font-ui text-xs uppercase tracking-wide px-4 py-1.5 rounded-full border whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-[#231f20] text-white border-[#231f20]'
                : 'border-[#231f20]/20 text-[#231f20]/70 hover:border-[#231f20]/50 hover:text-[#231f20]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <nav className="sticky top-24 w-44 shrink-0">
      <p className="font-ui text-[10px] uppercase tracking-widest text-[#231f20]/40 mb-4">
        Menu
      </p>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryClick(cat.id)}
          className={`font-body text-sm py-1.5 block w-full text-left transition-all duration-200 ${
            activeCategory === cat.id
              ? 'text-[#231f20] font-medium border-l-2 border-[#231f20] pl-2'
              : 'text-[#231f20]/60 hover:text-[#231f20] pl-0'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}
