'use client';

export const CATEGORIES = [
  { id: 'classics',  label: 'Classics' },
  { id: 'cold',      label: 'Cold Brews' },
  { id: 'lattes',    label: 'Lattes' },
  { id: 'frappes',   label: 'Frappes' },
  { id: 'matcha',    label: 'Matcha & Tea' },
  { id: 'food',      label: 'Bites & Burgers' },
  { id: 'mains',     label: 'Mains & Pizzas' },
  { id: 'wellness',  label: 'Wellness Bowls' },
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
                ? 'bg-brown text-white border-brown'
                : 'border-brown/20 text-brown/70 hover:border-brown/50 hover:text-brown'
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
      <p className="font-ui text-[10px] uppercase tracking-widest text-brown/40 mb-4">
        Menu
      </p>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryClick(cat.id)}
          className={`font-body text-sm py-1.5 block w-full text-left transition-all duration-200 ${
            activeCategory === cat.id
              ? 'text-brown font-medium border-l-2 border-brown pl-2'
              : 'text-brown/60 hover:text-brown pl-0'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}
