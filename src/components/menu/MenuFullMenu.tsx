'use client';

import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MenuCategoryNav } from './MenuCategoryNav';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MenuItemData {
  name: string;
  description?: string;
  price: string;
  note?: string;
}

interface CategoryData {
  id: string;
  label: string;
  items: MenuItemData[];
}

const MENU_DATA: CategoryData[] = [
  {
    id: 'classics',
    label: 'Espresso & Classics',
    items: [
      { name: 'Espresso',    description: 'A pure, bold shot of coffee perfection.',                                         price: '₹180' },
      { name: 'Americano',   description: 'Smooth espresso mellowed with hot water for a light, easy sip.',                 price: '₹225' },
      { name: 'Long Black',  description: 'Intense, rich, and beautifully aromatic.',                                       price: '₹225' },
      { name: 'Doppio',      description: 'Double the espresso, double the magic.',                                         price: '₹270' },
      { name: 'Cortado',     description: 'Espresso softened with a hint of warm milk for perfect balance.',                price: '₹260' },
      { name: 'Cappuccino',  description: 'Classic, creamy, and comforting with a dusting of cocoa.',                      price: '₹270' },
      { name: 'Flat White',  description: 'Silky micro foam meets bold espresso — a modern favorite.',                      price: '₹290' },
      { name: 'Macchiato',   description: 'Espresso marked with a whisper of milk foam.',                                   price: '₹270' },
    ],
  },
  {
    id: 'cold',
    label: 'Cold Brews & Iced',
    items: [
      { name: 'Classic Iced Americano',  description: 'Espresso over ice — simple and strong.',                                                         price: '₹245' },
      { name: 'Cranberry Iced Americano',description: 'Fruity twist on the classic.',                                                                   price: '₹320' },
      { name: 'Orange Iced Americano',   description: 'Bright and bold citrus coffee.',                                                                 price: '₹360' },
      { name: 'OG Cold Brew',            description: 'Straight-up, smooth and slow-brewed.',                                                           price: '₹290' },
      { name: 'Litchi Cold Brew',        description: 'Fruity, floral, and lightly sweet.',                                                             price: '₹315' },
      { name: 'Valencia Cold Brew',      description: 'Orange zest brightness meets deep coffee tones.',                                                price: '₹340' },
      { name: 'Cranberry Cold Brew',     description: 'Tart meets bold for a crisp sip.',                                                               price: '₹360' },
      { name: 'Yuzu Cold Brew',          description: 'Zesty and refreshing with a Japanese twist.',                                                    price: '₹380' },
      { name: 'Jasmine Cold Brew',       description: 'A fragrant floral infusion where smooth cold brew meets the soft sweetness of jasmine.',         price: '₹380' },
    ],
  },
  {
    id: 'lattes',
    label: 'Lattes & Signatures',
    items: [
      { name: 'Classic Latte',        description: 'Smooth espresso with perfectly textured milk.',                          price: '₹290 / ₹325', note: 'Hot · Iced' },
      { name: 'Mocha',                description: 'Chocolate and espresso dance together in creamy harmony.',               price: '₹290 / ₹360', note: 'Hot · Iced' },
      { name: 'Spanish Latte',        description: 'Sweetened condensed milk gives this a rich, velvety finish.',            price: '₹340 / ₹380', note: 'Hot · Iced' },
      { name: 'Vietnamese Latte',     description: 'Bold coffee meets sweet condensed milk.',                                price: '₹330',        note: 'Hot · Iced' },
      { name: 'Vanilla Latte',        description: '',                                                                       price: '₹340 / ₹375', note: 'Hot · Iced' },
      { name: 'Biscoff Latte',        description: '',                                                                       price: '₹340',        note: 'Hot'       },
      { name: 'Caramel Latte',        description: '',                                                                       price: '₹340',        note: 'Hot'       },
      { name: 'Hazelnut Latte',       description: '',                                                                       price: '₹340',        note: 'Hot'       },
      { name: 'Honey Cinnamon Latte', description: '',                                                                       price: '₹340',        note: 'Hot'       },
      { name: 'Cheesecake Latte',     description: '',                                                                       price: '₹385',        note: 'Iced'      },
      { name: 'Sea Salt Vietnamese',  description: '',                                                                       price: '₹380',        note: 'Iced'      },
    ],
  },
  {
    id: 'frappes',
    label: 'Frappes & Affogatos',
    items: [
      { name: 'Classic Frappe',              description: '', price: '₹390', note: 'Coffee'     },
      { name: 'Belgium Frappe',              description: '', price: '₹430', note: 'Coffee'     },
      { name: 'Caramel Hazelnut Crunch',     description: '', price: '₹430', note: 'Coffee'     },
      { name: 'Cheesecake Frappe',           description: '', price: '₹450', note: 'Non-Coffee' },
      { name: 'Kit Kat Frappe',              description: '', price: '₹470', note: 'Non-Coffee' },
      { name: 'Oreo Frappe',                 description: '', price: '₹450', note: 'Non-Coffee' },
      { name: 'Caramel Hazelnut Crunch',     description: '', price: '₹470', note: 'Non-Coffee' },
      { name: 'Brownie Frappe',              description: '', price: '₹430', note: 'Non-Coffee' },
      { name: 'Biscoff Frappe',              description: '', price: '₹540', note: 'Non-Coffee' },
      { name: 'Coffee Vanilla Affogato',     description: '', price: '₹380', note: 'Affogato'   },
      { name: 'Chocolate Affogato',          description: '', price: '₹380', note: 'Affogato'   },
      { name: 'Extra Espresso Shot',         description: '', price: '₹125', note: 'Add-on'     },
      { name: 'Almond Milk',                 description: '', price: '₹120', note: 'Add-on'     },
      { name: 'Soy Milk',                    description: '', price: '₹120', note: 'Add-on'     },
    ],
  },
  {
    id: 'matcha',
    label: 'Matcha & Tea',
    items: [
      { name: 'Matcha Lemonade Fizz',       description: '',                       price: '₹340',        note: 'Matcha'   },
      { name: 'Matcha Latte',               description: '',                       price: '₹340 / ₹360', note: 'Matcha · Hot · Iced' },
      { name: 'Lavender Sea Salt Matcha',   description: '',                       price: '₹430',        note: 'Matcha'   },
      { name: 'Blueberry Cream Matcha',     description: '',                       price: '₹450',        note: 'Matcha'   },
      { name: 'Matcha Frappe',              description: '',                       price: '₹470',        note: 'Matcha'   },
      { name: 'Coconut Matcha Cloud',       description: '',                       price: '₹430',        note: 'Matcha'   },
      { name: 'Litchi Matcha Soda',         description: '',                       price: '₹390',        note: 'Matcha'   },
      { name: 'Pineapple Matcha',           description: '',                       price: '₹370',        note: 'Matcha'   },
      { name: 'Watermelon Matcha',          description: '',                       price: '₹415',        note: 'Matcha'   },
      { name: 'Fresh Lime Soda',            description: '',                       price: '₹270',        note: 'Cooler'   },
      { name: 'Mint Mojito',                description: '',                       price: '₹295',        note: 'Cooler'   },
      { name: 'Cranberry Cooler',           description: '',                       price: '₹340',        note: 'Cooler'   },
      { name: 'Orange Basil Cooler',        description: '',                       price: '₹360',        note: 'Cooler'   },
      { name: 'Lemon Iced Tea',             description: '',                       price: '₹360',        note: 'Cooler'   },
      { name: 'Peach Iced Tea',             description: '',                       price: '₹360',        note: 'Cooler'   },
      { name: 'Butterfly Pea Cooler',       description: '',                       price: '₹360',        note: 'Cooler'   },
      { name: 'Hot Chocolate',              description: 'Served with marshmallows.', price: '₹340',     note: 'Hot Choc' },
      { name: 'Muscle Memory',              description: '',                       price: '₹430',        note: 'Protein'  },
      { name: 'Rich and Toned',             description: '',                       price: '₹450',        note: 'Protein'  },
      { name: 'Chamomile Tea',              description: '',                       price: '₹270',        note: 'Tea'      },
      { name: 'Hibiscus Lemongrass Tea',    description: '',                       price: '₹270',        note: 'Tea'      },
      { name: 'Medicine Ball',              description: '',                       price: '₹380',        note: 'Tea'      },
      { name: 'Kashmiri Kahwa',             description: '',                       price: '₹380',        note: 'Tea'      },
      { name: 'Jasmine Tea',                description: '',                       price: '₹270',        note: 'Tea'      },
      { name: 'Desi Ginger Tea',            description: '',                       price: '₹200',        note: 'Tea'      },
    ],
  },
  {
    id: 'food',
    label: 'Bites & Burgers',
    items: [
      { name: 'Avocado Toast',                    description: '', price: '₹445', note: 'Toast'       },
      { name: 'Wild Mushroom Crostini',            description: '', price: '₹385', note: 'Toast'       },
      { name: 'Zucchini Fritters',                description: '', price: '₹345', note: 'Appetiser'   },
      { name: 'Sesame Chicken Tenders',           description: '', price: '₹475', note: 'Appetiser'   },
      { name: 'Polenta Fried Fish',               description: '', price: '₹495', note: 'Appetiser'   },
      { name: 'Parmesan Cheese Croquettes',       description: '', price: '₹415', note: 'Appetiser'   },
      { name: 'Spinach Corn Rolls',               description: '', price: '₹395', note: 'Appetiser'   },
      { name: 'Chicken Tikka Roll',               description: '', price: '₹425', note: 'Appetiser'   },
      { name: 'Spinach & Corn Puffs',             description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Parmesan Broccoli Arancini',       description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Loaded Mexican Nachos',            description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Devilled Fried Eggs',              description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Sriracha Mango Chicken Tart',      description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Cajun Chicken Hummus',             description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Velluli Karam Chicken & Chips',    description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Chilli Garlic Shrimps',            description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Crispy Sriracha Prawns',           description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Peri Peri Prawns & Avo Salsa',     description: '', price: '—',    note: 'Appetiser'   },
      { name: 'Spiced Cottage Cheeseburger',      description: '', price: '₹465', note: 'Burger'      },
      { name: 'Italian Chicken Cheeseburger',     description: '', price: '₹515', note: 'Burger'      },
      { name: 'Chicken Croissant',                description: '', price: '₹515', note: 'Burger'      },
      { name: 'Desi Kheema Potato Bun',           description: '', price: '₹515', note: 'Burger'      },
      { name: 'Butter Paneer Ciabatta',           description: '', price: '—',    note: 'Sandwich'    },
      { name: 'Pesto Focaccia',                   description: '', price: '—',    note: 'Sandwich'    },
      { name: 'Roasted Chicken Sandwich',         description: '', price: '—',    note: 'Sandwich'    },
      { name: 'Spicy Chicken Sandwich',           description: '', price: '—',    note: 'Sandwich'    },
      { name: 'Chettinad Chicken Brioche',        description: '', price: '—',    note: 'Sandwich'    },
      { name: 'Kheema Brioche',                   description: '', price: '—',    note: 'Sandwich'    },
      { name: 'Prawn Thermidor Brioche',          description: '', price: '—',    note: 'Sandwich'    },
      { name: 'Mushroom Cheese Croissant',        description: '', price: '—',    note: 'Sandwich'    },
      { name: 'Classic Fries',                    description: '', price: '₹245', note: 'Small Bites' },
      { name: 'Peri Peri Fries',                  description: '', price: '₹275', note: 'Small Bites' },
      { name: 'Cheese Fries',                     description: '', price: '₹295', note: 'Small Bites' },
      { name: 'Classic Potato Wedges',            description: '', price: '₹245', note: 'Small Bites' },
      { name: 'Peri Peri Potato Wedges',          description: '', price: '₹275', note: 'Small Bites' },
      { name: 'Cheese Potato Wedges',             description: '', price: '₹295', note: 'Small Bites' },
      { name: 'Cheese Garlic Bread',              description: '', price: '₹345', note: 'Small Bites' },
      { name: 'Grilled Veggie Medley',            description: '', price: '₹275', note: 'Small Bites' },
    ],
  },
  {
    id: 'mains',
    label: 'Mains & Pizzas',
    items: [
      { name: 'Pasta Picasso — Veg',          description: 'Penne or Spaghetti · Arrabbiata, Alfredo, or Rosatella.', price: '₹425', note: 'Pasta'      },
      { name: 'Pasta Picasso — Chicken',      description: 'Penne or Spaghetti · Arrabbiata, Alfredo, or Rosatella.', price: '₹475', note: 'Pasta'      },
      { name: 'Chestnut Ravioli',             description: '',                                                        price: '—',    note: 'Pasta'      },
      { name: 'Risotto Alfredo',              description: '',                                                        price: '—',    note: 'Pasta'      },
      { name: 'Cluck & Mac Stack',            description: '',                                                        price: '—',    note: 'Pasta'      },
      { name: 'Chicken Cannelloni',           description: '',                                                        price: '—',    note: 'Pasta'      },
      { name: 'Layer Slayer Lasagna',         description: '',                                                        price: '—',    note: 'Pasta'      },
      { name: 'Margherita Moderna',           description: 'Thin crust or Puff-based (+₹50).',                       price: '₹435', note: 'Pizza'      },
      { name: 'Verdure',                      description: 'Thin crust or Puff-based (+₹50).',                       price: '₹445', note: 'Pizza'      },
      { name: 'Chicken Tikka Pizza',          description: 'Thin crust or Puff-based (+₹50).',                       price: '₹545', note: 'Pizza'      },
      { name: 'Wool Cup Mighty Meat',         description: 'Thin crust or Puff-based (+₹50).',                       price: '₹555', note: 'Pizza'      },
      { name: 'Pesto Paneer Pizza',           description: '',                                                        price: '—',    note: 'Pizza'      },
      { name: 'Fiery Chicken Pizza',          description: '',                                                        price: '—',    note: 'Pizza'      },
      { name: 'Peri Peri Pollo',              description: '',                                                        price: '—',    note: 'Pizza'      },
      { name: 'Paneer Tikka Bowl',            description: '',                                                        price: '₹535', note: 'Rice Bowl'  },
      { name: 'Desi Egg Bowl',                description: '',                                                        price: '₹545', note: 'Rice Bowl'  },
      { name: 'Butter Chicken Bowl',          description: '',                                                        price: '₹565', note: 'Rice Bowl'  },
      { name: 'Crispy Chicken Fried Rice',    description: '',                                                        price: '₹565', note: 'Rice Bowl'  },
      { name: 'Chicken Burrito Bowl',         description: '',                                                        price: '—',    note: 'Rice Bowl'  },
      { name: 'Mexican Burrito Rice Bowl',    description: '',                                                        price: '—',    note: 'Rice Bowl'  },
      { name: 'Charred Broccoli Steak',       description: '',                                                        price: '—',    note: 'Veg Main'   },
      { name: 'Smoky BBQ Cottage Cheese',     description: '',                                                        price: '—',    note: 'Veg Main'   },
      { name: 'Baked Malai Avocado & Mash',   description: '',                                                        price: '—',    note: 'Veg Main'   },
      { name: 'Caribbean Jerk Chicken',       description: '',                                                        price: '—',    note: 'Chicken'    },
      { name: 'Pistachio Crusted Chicken',    description: '',                                                        price: '—',    note: 'Chicken'    },
      { name: 'Fried Chicken Piccata',        description: '',                                                        price: '—',    note: 'Chicken'    },
      { name: 'Thyme Roasted Chicken',        description: '',                                                        price: '—',    note: 'Chicken'    },
      { name: 'Orange-Chilli Glazed Fish',    description: '',                                                        price: '—',    note: 'Seafood'    },
      { name: 'Sweet Ginger Kissed Fish',     description: '',                                                        price: '—',    note: 'Seafood'    },
      { name: 'Steamed Fish & Veggie Stew',   description: '',                                                        price: '—',    note: 'Seafood'    },
      { name: 'Chipotle Prawns',              description: '',                                                        price: '—',    note: 'Seafood'    },
      { name: 'Prawn Burrito Bowl',           description: '',                                                        price: '—',    note: 'Seafood'    },
    ],
  },
  {
    id: 'breakfast',
    label: 'Breakfast & Brunch',
    items: [
      { name: "Farmer's Style Omelette", description: '', price: '₹385', note: 'Omelette'     },
      { name: 'Cheese Omelette',         description: '', price: '₹395', note: 'Omelette'     },
      { name: 'Masala Omelette',         description: '', price: '₹375', note: 'Omelette'     },
      { name: 'Classic Pancakes',        description: '', price: '₹360', note: 'Pancakes'     },
      { name: 'Nutella Pancakes',        description: '', price: '₹405', note: 'Pancakes'     },
      { name: 'Classic Waffles',         description: '', price: '₹380', note: 'Waffles'      },
      { name: 'Nutella Waffles',         description: '', price: '₹430', note: 'Waffles'      },
      { name: 'Brioche Bliss',           description: '', price: '₹405', note: 'French Toast' },
      { name: 'Biscoff French Toast',    description: '', price: '₹445', note: 'French Toast' },
      { name: 'Banana Buzz',             description: '', price: '₹450', note: 'French Toast' },
      { name: 'Berry Toasted',           description: '', price: '₹470', note: 'French Toast' },
      { name: 'Herbed Rice',             description: '', price: '—',    note: 'Side'         },
      { name: 'Creamy Mashed Potato',    description: '', price: '—',    note: 'Side'         },
      { name: 'Fruit Salad',             description: '', price: '—',    note: 'Side'         },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    items: [
      { name: 'Belgian Chocolate Slice',                 description: '',                    price: '₹295' },
      { name: 'Biscoff Tresleches',                      description: '',                    price: '₹300' },
      { name: 'Blueberry Cheesecake',                    description: '',                    price: '₹315' },
      { name: 'Banana Bread',                            description: '',                    price: '₹160' },
      { name: 'Cupcakes',                                description: '',                    price: '₹120' },
      { name: 'Oatmeal Cookie',                          description: '',                    price: '₹160' },
      { name: 'Hazelnut Cookie',                         description: '',                    price: '₹160' },
      { name: 'Brownie',                                 description: 'Served warm.',        price: '—'    },
      { name: 'Butter Croissant',                        description: 'Served warm.',        price: '—'    },
      { name: 'Almond Croissant',                        description: 'Served warm.',        price: '—'    },
      { name: 'Hazelnut Croissant',                      description: 'Served chilled.',     price: '—'    },
      { name: 'Lotus Biscoff Croissant',                 description: 'Served chilled.',     price: '—'    },
      { name: 'Blueberry Cream Croissant',               description: 'Served chilled.',     price: '—'    },
      { name: 'Lotus Biscoff Cheesecake',                description: '',                    price: '—'    },
      { name: 'Black Forest Cake Slice',                 description: '',                    price: '—'    },
      { name: 'Belgium Chocolate Cake Slice',            description: '',                    price: '—'    },
      { name: 'Millet Brownie',                          description: 'Sugar-free.',         price: '—'    },
      { name: 'Stevia Opera',                            description: 'Sugar-free.',         price: '—'    },
      { name: 'Tiramisu',                                description: 'Served chilled in jar.', price: '—' },
      { name: 'Brownie Ice Cream',                       description: 'Served warm.',        price: '—'    },
      { name: 'Burnt Basque Cheesecake with Warm Nutella', description: 'Served warm.',      price: '—'    },
      { name: 'Umali',                                   description: 'Served warm.',        price: '—'    },
    ],
  },
];

function MenuItem({ name, description, price, note }: MenuItemData) {
  const isPriceUnknown = price === '—';

  return (
    <div className="py-4 border-b border-[#ead8b5]/50 last:border-0">
      <div className="flex items-baseline gap-1">
        <span className="font-display text-lg text-brown">{name}</span>
        {note && (
          <span className="font-ui text-[10px] uppercase tracking-widest text-brown/35 ml-2 shrink-0">
            {note}
          </span>
        )}
        <div className="flex-1 border-b border-dotted border-brown/20 mx-3 mb-1 min-w-4" />
        {isPriceUnknown ? (
          <span className="font-ui text-xs text-brown/40 italic shrink-0">Ask us</span>
        ) : (
          <span className="font-ui text-lg text-brown shrink-0">{price}</span>
        )}
      </div>
      {description && (
        <p className="font-body text-sm text-brown/60 italic mt-1">{description}</p>
      )}
    </div>
  );
}

export function MenuFullMenu() {
  const [activeCategory, setActiveCategory] = useState('classics');
  const containerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    MENU_DATA.forEach(({ id }, i) => {
      const el = sectionRefs.current[i];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategory(id);
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    const idx = MENU_DATA.findIndex((c) => c.id === id);
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useGSAP(
    () => {
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="full-menu" ref={containerRef} className="bg-ivory">
      {/* Mobile sticky pills */}
      <div className="lg:hidden sticky top-[136px] z-50 bg-[#ead8b5]/95 backdrop-blur-sm py-3 px-4">
        <MenuCategoryNav
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          variant="mobile"
        />
      </div>

      {/* Desktop: sidebar + content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex gap-16">
        <div className="hidden lg:block pt-20">
          <MenuCategoryNav
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            variant="desktop"
          />
        </div>

        <div className="flex-1 min-w-0 py-20 md:py-28">
          {MENU_DATA.map((category, i) => (
            <div
              key={category.id}
              id={category.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="mb-20 scroll-mt-[190px] lg:scroll-mt-28"
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-display text-2xl md:text-3xl text-brown shrink-0">
                  {category.label}
                </h2>
                <div className="flex-1 h-px bg-[#ead8b5]" />
              </div>

              {category.items.map((item) => (
                <MenuItem key={`${item.name}-${item.note ?? ''}`} {...item} />
              ))}
            </div>
          ))}

          <p className="font-body text-sm text-brown/40 italic text-center pt-4">
            Items marked &ldquo;Ask us&rdquo; are available in-store — pricing varies. Ask our team.
          </p>
        </div>
      </div>
    </section>
  );
}
