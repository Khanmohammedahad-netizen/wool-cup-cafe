'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  image?: string;
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
      { name: 'Cortado',     description: 'Espresso softened with a hint of warm milk for perfect balance.',                price: '₹260', image: '/images/beverages/Juices/Cortado.jpg' },
      { name: 'Cappuccino',  description: 'Classic, creamy, and comforting with a dusting of cocoa.',                      price: '₹270' },
      { name: 'Flat White',  description: 'Silky micro foam meets bold espresso — a modern favorite.',                      price: '₹290' },
      { name: 'Macchiato',   description: 'Espresso marked with a whisper of milk foam.',                                   price: '₹270', image: '/images/beverages/Juices/Macchiato.jpg' },
    ],
  },
  {
    id: 'cold',
    label: 'Cold Brews & Iced',
    items: [
      { name: 'Classic Iced Americano',   description: 'Espresso over ice — simple and strong.',                                                         price: '₹245' },
      { name: 'Cranberry Iced Americano', description: 'Fruity twist on the classic.',                                                                   price: '₹320' },
      { name: 'Orange Iced Americano',    description: 'Bright and bold citrus coffee.',                                                                 price: '₹360' },
      { name: 'OG Cold Brew',             description: 'Straight-up, smooth and slow-brewed.',                                                           price: '₹290', image: '/images/beverages/Juices/OG Cold Brew.jpg' },
      { name: 'Litchi Cold Brew',         description: 'Fruity, floral, and lightly sweet.',                                                             price: '₹315', image: '/images/beverages/Juices/Litchi Cold Brew.jpg' },
      { name: 'Valencia Cold Brew',       description: 'Orange zest brightness meets deep coffee tones.',                                                price: '₹340' },
      { name: 'Cranberry Cold Brew',      description: 'Tart meets bold for a crisp sip.',                                                               price: '₹360' },
      { name: 'Yuzu Cold Brew',           description: 'Zesty and refreshing with a Japanese twist.',                                                    price: '₹380' },
      { name: 'Jasmine Cold Brew',              description: 'A fragrant floral infusion where smooth cold brew meets the soft sweetness of jasmine.', price: '₹380' },
      { name: 'Cranberry Cinnamon Cold Brew',   description: 'Tart cranberry, warm cinnamon, slow-brewed coffee.',                                        price: '₹360' },
      { name: 'Cold Brew Cloud',                description: 'Cold brew float topped with a thick salted cream cap.',                                      price: '₹320' },
    ],
  },
  {
    id: 'lattes',
    label: 'Lattes & Signatures',
    items: [
      { name: 'Classic Latte',        description: 'Smooth espresso with perfectly textured milk.',                          price: '₹290 / ₹325', note: 'Hot · Iced' },
      { name: 'Mocha',                description: 'Chocolate and espresso dance together in creamy harmony.',               price: '₹290 / ₹360', note: 'Hot · Iced' },
      { name: 'Spanish Latte',        description: 'Sweetened condensed milk gives this a rich, velvety finish.',            price: '₹340 / ₹380', note: 'Hot · Iced', image: '/images/beverages/Juices/Spanish Latte.jpg' },
      { name: 'Vietnamese Latte',     description: 'Bold coffee meets sweet condensed milk.',                                price: '₹330',        note: 'Hot · Iced', image: '/images/beverages/Juices/Vietanamese.jpg' },
      { name: 'Vanilla Latte',        description: '',                                                                       price: '₹340 / ₹375', note: 'Hot · Iced', image: '/images/beverages/Juices/Vanilla Latte.jpg' },
      { name: 'Biscoff Latte',        description: '',                                                                       price: '₹340',        note: 'Hot'       },
      { name: 'Caramel Latte',        description: '',                                                                       price: '₹340',        note: 'Hot'       },
      { name: 'Hazelnut Latte',       description: '',                                                                       price: '₹340',        note: 'Hot',       image: '/Beverages/Hazelnut Latte.jpg' },
      { name: 'Banana Cream Latte',   description: '',                                                                       price: '—',           note: 'Hot',       image: '/Beverages/Banana Cream Latte.jpg' },
      { name: 'Black Forest Mocha',   description: '',                                                                       price: '—',           note: 'Hot',       image: '/Beverages/Black Forest mocha.jpg' },
      { name: 'Blueberry Pancake Latte', description: '',                                                                    price: '—',           note: 'Hot',       image: '/Beverages/Blueberry Pancake Latte.jpg' },
      { name: 'Cheese Mont Blanc',    description: '',                                                                       price: '—',           note: 'Signature', image: '/Beverages/Cheese Mont Blanc.jpg' },
      { name: 'Seasalt Vanilla Mont Blanc', description: '',                                                                 price: '—',           note: 'Signature', image: '/Beverages/Seasalt Vanilla Mont Blanc.jpg' },
      { name: 'Coco Ube Cloud',       description: '',                                                                       price: '—',           note: 'Signature', image: '/Beverages/Coco Ube Cloud.jpg' },
      { name: 'Dirty Ube Latte',      description: '',                                                                       price: '—',           note: 'Signature', image: '/Beverages/Dirty Ube Latte.jpg' },
      { name: 'Honey Cinnamon Latte', description: '',                                                                       price: '₹340',        note: 'Hot',       image: '/images/beverages/Juices/Honey cinnamon Latte.jpg' },
      { name: 'Cheesecake Latte',     description: '',                                                                       price: '₹385',        note: 'Iced'      },
      { name: 'Sea Salt Vietnamese',  description: '',                                                                       price: '₹380',        note: 'Iced'      },
      { name: 'Ube Cloud',            description: 'Ube taro latte, ube cream swirl, butterfly pea dust.',                   price: '₹430',        note: 'Signature' },
      { name: 'Banana Buzz Latte',    description: 'Caramel milk, espresso, grilled banana skewer.',                         price: '₹390',        note: 'Signature' },
      { name: 'Strawberry Coffee',    description: 'Strawberry base, espresso, whipped cream.',                              price: '₹380',        note: 'Signature' },
      { name: 'Ube Coffee',           description: 'Ube milk, espresso, caramel pearls.',                                   price: '₹420',        note: 'Signature' },
      { name: 'Butterfly Pea Latte',  description: 'Butterfly pea milk, pink base, edible flower.',                         price: '₹390',        note: 'Signature' },
    ],
  },
  {
    id: 'frappes',
    label: 'Frappes & Affogatos',
    items: [
      { name: 'Ube Frappe',                   description: '', price: '—',    note: 'Non-Coffee', image: '/Beverages/Ube Frappe.jpg' },
      { name: 'Classic Frappe',              description: '', price: '₹390', note: 'Coffee',     image: '/images/beverages/Juices/Classic Frappe Coffee.jpg' },
      { name: 'Belgium Frappe',              description: '', price: '₹430', note: 'Coffee',     image: '/images/beverages/Juices/Belgium Frappe.jpg' },
      { name: 'Caramel Hazelnut Crunch',     description: '', price: '₹430', note: 'Coffee',     image: '/images/beverages/Juices/Caramel Hazelnut Crunch.jpg' },
      { name: 'Cheesecake Frappe',           description: '', price: '₹450', note: 'Non-Coffee', image: '/images/beverages/Juices/Cheese Cake Frappe.jpg' },
      { name: 'Kit Kat Frappe',              description: '', price: '₹470', note: 'Non-Coffee', image: '/images/beverages/Juices/KitKat Frappe.jpg' },
      { name: 'Oreo Frappe',                 description: '', price: '₹450', note: 'Non-Coffee' },
      { name: 'Caramel Hazelnut Crunch',     description: '', price: '₹470', note: 'Non-Coffee', image: '/images/beverages/Juices/Caramel Hazelnut Crunchy Frappe.jpg' },
      { name: 'Brownie Frappe',              description: '', price: '₹430', note: 'Non-Coffee', image: '/images/beverages/Juices/Brownie Frappe.jpg' },
      { name: 'Biscoff Frappe',              description: '', price: '₹540', note: 'Non-Coffee' },
      { name: 'Coffee Vanilla Affogato',     description: '', price: '₹380', note: 'Affogato',   image: '/images/beverages/Juices/Vanilla affogato.jpg' },
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
      { name: 'Matcha Lemonade Fizz',       description: '',                          price: '₹340',        note: 'Matcha',   image: '/images/beverages/Juices/Matcha Lemonade.jpg' },
      { name: 'Raspberry Matcha',           description: '',                          price: '—',           note: 'Matcha',   image: '/Beverages/Raspberry Matcha.jpg' },
      { name: 'Ube Lemonade',               description: '',                          price: '—',           note: 'Cooler',   image: '/Beverages/Ube Lemonade.jpg' },
      { name: 'Matcha Latte',               description: '',                          price: '₹340 / ₹360', note: 'Matcha · Hot · Iced', image: '/images/beverages/Juices/Hot Matcha Latte.jpg' },
      { name: 'Lavender Sea Salt Matcha',   description: '',                          price: '₹430',        note: 'Matcha',   image: '/images/beverages/Juices/Lavender Sea Salt Matcha.jpg' },
      { name: 'Blueberry Cream Matcha',     description: '',                          price: '₹450',        note: 'Matcha'   },
      { name: 'Matcha Frappe',              description: '',                          price: '₹470',        note: 'Matcha'   },
      { name: 'Coconut Matcha Cloud',       description: '',                          price: '₹430',        note: 'Matcha',   image: '/images/beverages/Juices/Coconut Matcha Cloud.jpg' },
      { name: 'Litchi Matcha Soda',         description: '',                          price: '₹390',        note: 'Matcha'   },
      { name: 'Pineapple Matcha',           description: '',                          price: '₹370',        note: 'Matcha',   image: '/images/beverages/Juices/Pineapple Matcha.jpg' },
      { name: 'Watermelon Matcha',          description: '',                          price: '₹415',        note: 'Matcha',   image: '/images/beverages/Juices/Water Melon Matcha.jpg' },
      { name: 'Fresh Lime Soda',            description: '',                          price: '₹270',        note: 'Cooler'   },
      { name: 'Mint Mojito',                description: '',                          price: '₹295',        note: 'Cooler',   image: '/images/beverages/Juices/Mint Mojito.jpg' },
      { name: 'Cranberry Cooler',           description: '',                          price: '₹340',        note: 'Cooler'   },
      { name: 'Orange Basil Cooler',        description: '',                          price: '₹360',        note: 'Cooler',   image: '/images/beverages/Juices/Orange Basil Cooler.jpg' },
      { name: 'Lemon Iced Tea',             description: '',                          price: '₹360',        note: 'Cooler',   image: '/images/beverages/Juices/Lemon Iced Tea.jpg' },
      { name: 'Peach Iced Tea',             description: '',                          price: '₹360',        note: 'Cooler',   image: '/images/beverages/Juices/Peach Iced Tea.jpg' },
      { name: 'Butterfly Pea Cooler',       description: '',                          price: '₹360',        note: 'Cooler'   },
      { name: 'Hot Chocolate',              description: 'Served with marshmallows.', price: '₹340',        note: 'Hot Choc', image: '/images/beverages/Juices/Hot Chocolate.jpg' },
      { name: 'Muscle Memory',              description: '',                          price: '₹430',        note: 'Protein'  },
      { name: 'Rich and Toned',             description: '',                          price: '₹450',        note: 'Protein',  image: '/images/beverages/Juices/Rich & Toned.jpg' },
      { name: 'Chamomile Tea',              description: '',                          price: '₹270',        note: 'Tea',      image: '/images/beverages/Juices/Chamomile Tea.jpg' },
      { name: 'Hibiscus Lemongrass Tea',    description: '',                          price: '₹270',        note: 'Tea'      },
      { name: 'Medicine Ball',              description: '',                          price: '₹380',        note: 'Tea',      image: '/images/beverages/Juices/Medicine Bowl.jpg' },
      { name: 'Kashmiri Kahwa',             description: '',                          price: '₹380',        note: 'Tea'      },
      { name: 'Jasmine Tea',                description: '',                          price: '₹270',        note: 'Tea'      },
      { name: 'Desi Ginger Tea',            description: '',                          price: '₹200',        note: 'Tea'      },
    ],
  },
  {
    id: 'food',
    label: 'Bites & Burgers',
    items: [
      { name: 'Avocado Toast',                    description: '', price: '₹445', note: 'Toast' },
      { name: 'Avocado Bloom Toast',              description: 'Loaded avo, cherry tomatoes, olives, cashews, edible flowers.', price: '₹495', note: 'Toast' },
      { name: 'Wild Mushroom Crostini',            description: '', price: '₹385', note: 'Toast',       image: '/images/3/Wild Mushroom Crostini.jpg'          },
      { name: 'Chicken Sloppy Toast',              description: 'Pulled chicken, chilli rings, micro greens on sourdough.', price: '₹495', note: 'Toast' },
      { name: 'Creamy Chicken Toast',              description: '', price: '—', note: 'Toast',       image: '/Food/Creamy Chicken Toast.JPG'   },
      { name: 'Mediterranean Avocado Toast',       description: '', price: '—', note: 'Toast',       image: '/Food/Meditrrainean Avocado Toast.JPG' },
      { name: 'Honey Garlic Shrimps',              description: '', price: '—', note: 'Appetiser',   image: '/Food/Honey Garlic Shrimps.JPG'   },
      { name: 'Zucchini Fritters',                description: '', price: '₹345', note: 'Appetiser'                                                          },
      { name: 'Sesame Chicken Tenders',           description: '', price: '₹475', note: 'Appetiser',   image: '/images/2/Sesame Chicken Tenders.jpg'          },
      { name: 'Polenta Fried Fish',               description: '', price: '₹495', note: 'Appetiser',   image: '/images/4/Polenta Fried fish.jpg'              },
      { name: 'Parmesan Cheese Croquettes',       description: '', price: '₹415', note: 'Appetiser',   image: '/images/4/Parmesan Cheese croquettes.jpg'      },
      { name: 'Spinach Corn Rolls',               description: '', price: '₹395', note: 'Appetiser',   image: '/images/3/Spinach corn rolls.jpg'              },
      { name: 'Chicken Tikka Roll',               description: '', price: '₹425', note: 'Appetiser',   image: '/images/1/Chicken Tikka Rolls.jpg'             },
      { name: 'Spinach & Corn Puffs',             description: '', price: '—',    note: 'Appetiser',   image: '/images/1/Spinach & corn puffs.jpg'            },
      { name: 'Parmesan Broccoli Arancini',       description: '', price: '—',    note: 'Appetiser',   image: '/images/3/PArmesan Broccoli Arancini.jpg'      },
      { name: 'Loaded Mexican Nachos',            description: '', price: '—',    note: 'Appetiser',   image: '/images/1/Loaded mexican nachos.jpg'           },
      { name: 'Devilled Fried Eggs',              description: '', price: '—',    note: 'Appetiser',   image: '/images/1/Devilled fried eggs.jpg'             },
      { name: 'Sriracha Mango Chicken Tart',      description: '', price: '—',    note: 'Appetiser',   image: '/images/1/Sirancha Mango chicken tart.jpg'     },
      { name: 'Cajun Chicken Hummus',             description: '', price: '—',    note: 'Appetiser',   image: '/images/1/Cajun Chicken hummas.jpg'            },
      { name: 'Velluli Karam Chicken & Chips',    description: '', price: '—',    note: 'Appetiser',   image: '/images/1/velluli karam chicken & chips.jpg'   },
      { name: 'Chilli Garlic Shrimps',            description: '', price: '—',    note: 'Appetiser',   image: '/images/4/Chilli garlic shrimps.jpg'           },
      { name: 'Crispy Sriracha Prawns',           description: '', price: '—',    note: 'Appetiser',   image: '/images/3/Crispy srincha prawns.jpg'           },
      { name: 'Peri Peri Prawns & Avo Salsa',     description: '', price: '—',    note: 'Appetiser',   image: '/images/1/peri peri prawns with avacado salsa.jpg' },
      { name: 'Spiced Cottage Cheeseburger',      description: '', price: '₹465', note: 'Burger',      image: '/images/4/Spiced Cottage cheese burger.jpg'    },
      { name: 'Italian Chicken Cheeseburger',     description: '', price: '₹515', note: 'Burger',      image: '/images/4/Italian Chicken cheese burger.jpg'   },
      { name: 'Chicken Croissant',                description: '', price: '₹515', note: 'Burger',      image: '/images/3/Chicken Crossiant.jpg'               },
      { name: 'Desi Kheema Potato Bun',           description: '', price: '₹515', note: 'Burger',      image: '/images/4/Desi Keema with potato bun.jpg'      },
      { name: 'Butter Paneer Ciabatta',           description: '', price: '—',    note: 'Sandwich'                                                          },
      { name: 'Pesto Focaccia',                   description: '', price: '—',    note: 'Sandwich',    image: '/images/1/Pesto focaccia sandwich.jpg'         },
      { name: 'Roasted Chicken Sandwich',         description: '', price: '—',    note: 'Sandwich'                                                          },
      { name: 'Spicy Chicken Sandwich',           description: '', price: '—',    note: 'Sandwich',    image: '/images/2/Crispy Chicken Sandwich.jpg'         },
      { name: 'Chettinad Chicken Brioche',        description: '', price: '—',    note: 'Sandwich',    image: '/images/1/Chettinad chicken brioche.jpg'       },
      { name: 'Kheema Brioche',                   description: '', price: '—',    note: 'Sandwich',    image: '/images/2/Kheema Brioche.jpg'                  },
      { name: 'Prawn Thermidor Brioche',          description: '', price: '—',    note: 'Sandwich',    image: '/images/1/Prawn Thermidor Brioche.jpg'         },
      { name: 'Mushroom Cheese Croissant',        description: '', price: '—',    note: 'Sandwich',    image: '/images/2/Mushroom Cheese crosaint.jpg'        },
      { name: 'Classic Fries',                    description: '', price: '₹245', note: 'Small Bites'                                                        },
      { name: 'Peri Peri Fries',                  description: '', price: '₹275', note: 'Small Bites', image: '/images/4/Peri peri fries.jpg'                },
      { name: 'Cheese Fries',                     description: '', price: '₹295', note: 'Small Bites'                                                        },
      { name: 'Classic Potato Wedges',            description: '', price: '₹245', note: 'Small Bites', image: '/images/4/Potato wedges.jpg'                  },
      { name: 'Peri Peri Potato Wedges',          description: '', price: '₹275', note: 'Small Bites', image: '/images/4/Peri peri potato wedges.jpg'        },
      { name: 'Cheese Potato Wedges',             description: '', price: '₹295', note: 'Small Bites'                                                        },
      { name: 'Cheese Garlic Bread',              description: '', price: '₹345', note: 'Small Bites', image: '/images/1/Cheese garlic bread.jpg'            },
      { name: 'Grilled Veggie Medley',            description: '', price: '₹275', note: 'Small Bites'                                                        },
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
      { name: 'Cluck & Mac Stack',            description: '',                                                        price: '—',    note: 'Pasta',     image: '/images/1/Cluck & Mac stack.jpg'                   },
      { name: 'Chicken Cannelloni',           description: '',                                                        price: '—',    note: 'Pasta',     image: '/images/3/Chicken & Cannelloni.jpg'                },
      { name: 'Layer Slayer Lasagna',         description: '',                                                        price: '—',    note: 'Pasta',     image: '/images/1/Layer slayer Lasagna.jpg'                },
      { name: 'Margherita Moderna',           description: 'Thin crust or Puff-based (+₹50).',                       price: '₹435', note: 'Pizza'      },
      { name: 'Verdure',                      description: 'Thin crust or Puff-based (+₹50).',                       price: '₹445', note: 'Pizza'      },
      { name: 'Chicken Tikka Pizza',          description: 'Thin crust or Puff-based (+₹50).',                       price: '₹545', note: 'Pizza',     image: '/images/3/Chicken tikka puffizza.jpg'              },
      { name: 'Wool Cup Mighty Meat',         description: 'Thin crust or Puff-based (+₹50).',                       price: '₹555', note: 'Pizza',     image: '/images/1/Wool cup mighty meat puff pizza.jpg'    },
      { name: 'Pesto Paneer Pizza',           description: '',                                                        price: '—',    note: 'Pizza',     image: '/images/2/Pesto paneer puff pizza.jpg'             },
      { name: 'Fiery Chicken Pizza',          description: '',                                                        price: '—',    note: 'Pizza',     image: '/images/1/Fiery chicken pizza.jpg'                 },
      { name: 'Peri Peri Pollo',              description: '',                                                        price: '—',    note: 'Pizza',     image: '/images/1/Peri peri polo pizza.jpg'                },
      { name: 'Paneer Tikka Bowl',            description: '',                                                        price: '₹535', note: 'Rice Bowl', image: '/images/4/Paneer Tikka Rice Bowl.jpg'              },
      { name: 'Desi Egg Bowl',                description: '',                                                        price: '₹545', note: 'Rice Bowl', image: '/images/1/Desi Egg Bowl.jpg'                       },
      { name: 'Butter Chicken Bowl',          description: '',                                                        price: '₹565', note: 'Rice Bowl', image: '/images/4/Butter chicken rice bowl.jpg'            },
      { name: 'Crispy Chicken Fried Rice',    description: '',                                                        price: '₹565', note: 'Rice Bowl'                                                              },
      { name: 'Chicken Burrito Bowl',         description: '',                                                        price: '—',    note: 'Rice Bowl', image: '/images/3/Chicken Burrito.jpg'                     },
      { name: 'Mexican Burrito Rice Bowl',    description: '',                                                        price: '—',    note: 'Rice Bowl', image: '/images/3/Mexican Burrito bowl.jpg'                },
      { name: 'Charred Broccoli Steak',       description: '',                                                        price: '—',    note: 'Veg Main',  image: '/images/4/Charred broccoli steak.jpg'              },
      { name: 'Smoky BBQ Cottage Cheese',     description: '',                                                        price: '—',    note: 'Veg Main',  image: '/images/4/Smoky BBQ cottage cheese.jpg'            },
      { name: 'Baked Malai Avocado & Mash',   description: '',                                                        price: '—',    note: 'Veg Main',  image: '/images/1/Baked Malai Avacado & mash.jpg'          },
      { name: 'Caribbean Jerk Chicken',       description: '',                                                        price: '—',    note: 'Chicken'                                                                },
      { name: 'Pistachio Crusted Chicken',    description: '',                                                        price: '—',    note: 'Chicken'                                                                },
      { name: 'Fried Chicken Piccata',        description: '',                                                        price: '—',    note: 'Chicken'                                                                },
      { name: 'Thyme Roasted Chicken',        description: '',                                                        price: '—',    note: 'Chicken',   image: '/images/1/Thyme roasted chicken.jpg'               },
      { name: 'Orange-Chilli Glazed Fish',    description: '',                                                        price: '—',    note: 'Seafood',   image: '/images/1/Orange chilli glazed fish.jpg'           },
      { name: 'Sweet Ginger Kissed Fish',     description: '',                                                        price: '—',    note: 'Seafood',   image: '/images/4/Sweet ginger kissed fish.jpg'            },
      { name: 'Steamed Fish & Veggie Stew',   description: '',                                                        price: '—',    note: 'Seafood'                                                                },
      { name: 'Chipotle Prawns',              description: '',                                                        price: '—',    note: 'Seafood' },
      { name: 'Prawn Burrito Bowl',           description: '',                                                        price: '—',    note: 'Seafood'                                                                },
      { name: 'BBQ Chicken & Quinoa',         description: 'Smoky BBQ chicken, herbed quinoa, charred broccoli.',   price: '₹545', note: 'Chicken' },
      { name: 'Spicy Peri Peri Grilled Fish with Quinoa Rice', description: '',                                    price: '—',    note: 'Seafood',   image: '/Food/Spicy Peri Peri Grilled Fish with quinoa Rice.JPG' },
    ],
  },
  {
    id: 'wellness',
    label: 'Wellness Bowls',
    items: [
      { name: 'Acai Power Bowl',     description: 'Acai base, peanut butter, granola, banana, mixed berries, blueberries.',      price: '₹490' },
      { name: 'Coconut Granola Bowl',description: 'Coconut base, banana, coconut pieces, granola, chia seeds, edible flower.',  price: '₹450' },
      { name: 'Green Detox Bowl',    description: 'Matcha-kiwi base, dragon fruit, pineapple, kiwi, edible flower.',            price: '₹490' },
      { name: 'Acai Smoothie Bowl',  description: '',                                                                          price: '—',    image: '/Food/Acai Smoothie Bowl.JPG'           },
      { name: 'Cocoa Bowl',          description: '',                                                                          price: '—',    image: '/Food/Cocoa Bowl.JPG'                   },
      { name: 'Green Power Bowl',    description: '',                                                                          price: '—',    image: '/Food/Green Power.JPG'                  },
    ],
  },
  {
    id: 'breakfast',
    label: 'Breakfast & Brunch',
    items: [
      { name: "Farmer's Style Omelette", description: '', price: '₹385', note: 'Omelette',     image: '/images/2/Farmer style omlette.jpg'             },
      { name: 'Cheese Omelette',         description: '', price: '₹395', note: 'Omelette',     image: '/images/3/Cheese omlete.jpg'                    },
      { name: 'Masala Omelette',         description: '', price: '₹375', note: 'Omelette',     image: '/images/4/Break Fast Masala Omlette.jpg'        },
      { name: 'Classic Pancakes',        description: '', price: '₹360', note: 'Pancakes',     image: '/images/4/Plain pan cake.jpg'                   },
      { name: 'Nutella Pancakes',        description: '', price: '₹405', note: 'Pancakes',     image: '/images/4/Choco Chip Pan cake.jpg'              },
      { name: 'Classic Waffles',         description: '', price: '₹380', note: 'Waffles'                                                               },
      { name: 'Nutella Waffles',         description: '', price: '₹430', note: 'Waffles',      image: '/images/4/Nuttela Waffle.jpg'                   },
      { name: 'Brioche Bliss',           description: '', price: '₹405', note: 'French Toast', image: '/images/1/Classic Brioche french toast.jpg'     },
      { name: 'Biscoff French Toast',    description: '', price: '₹445', note: 'French Toast', image: '/images/3/Lotus Biscoff French toast.jpg'       },
      { name: 'Banana Buzz',             description: '', price: '₹450', note: 'French Toast', image: '/images/1/Banana Buzz french toast.jpg'         },
      { name: 'Berry Toasted',           description: '', price: '₹470', note: 'French Toast', image: '/images/1/Berry Toast French toast.jpg'         },
      { name: 'Herbed Rice',             description: '', price: '—',    note: 'Side'         },
      { name: 'Creamy Mashed Potato',    description: '', price: '—',    note: 'Side'         },
      { name: 'Fruit Salad',             description: '', price: '—',    note: 'Side'         },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    items: [
      { name: 'Belgian Chocolate Slice',                   description: '',                        price: '₹295' },
      { name: 'Biscoff Tresleches',                        description: '',                        price: '₹300', image: '/images/beverages/Juices/Biscoff Cake.jpg' },
      { name: 'Blueberry Cheesecake',                      description: '',                        price: '₹315' },
      { name: 'Banana Bread',                              description: '',                        price: '₹160' },
      { name: 'Cupcakes',                                  description: '',                        price: '₹120' },
      { name: 'Oatmeal Cookie',                            description: '',                        price: '₹160' },
      { name: 'Hazelnut Cookie',                           description: '',                        price: '₹160' },
      { name: 'Brownie',                                   description: 'Served warm.',            price: '—'    },
      { name: 'Butter Croissant',                          description: 'Served warm.',            price: '—'    },
      { name: 'Almond Croissant',                          description: 'Served warm.',            price: '—'    },
      { name: 'Hazelnut Croissant',                        description: 'Served chilled.',         price: '—'    },
      { name: 'Lotus Biscoff Croissant',                   description: 'Served chilled.',         price: '—'    },
      { name: 'Blueberry Cream Croissant',                 description: 'Served chilled.',         price: '—'    },
      { name: 'Lotus Biscoff Cheesecake',                  description: '',                        price: '—'    },
      { name: 'Black Forest Cake Slice',                   description: '',                        price: '—'    },
      { name: 'Belgium Chocolate Cake Slice',              description: '',                        price: '—'    },
      { name: 'Millet Brownie',                            description: 'Sugar-free.',             price: '—'    },
      { name: 'Stevia Opera',                              description: 'Sugar-free.',             price: '—'    },
      { name: 'Tiramisu',                                  description: 'Served chilled in jar.',  price: '—'    },
      { name: 'Brownie Ice Cream',                         description: 'Served warm.',            price: '—'    },
      { name: 'Burnt Basque Cheesecake with Warm Nutella', description: 'Served warm.',            price: '—',   image: '/images/beverages/Juices/Burnt Basque Cheesecake with Warm Nutella.jpg' },
      { name: 'Umali',                                     description: 'Served warm.',            price: '—'    },
    ],
  },
];

function MenuItem({
  name,
  description,
  price,
  note,
  image,
  onImageClick,
}: MenuItemData & { onImageClick?: (src: string, name: string) => void }) {
  const isPriceUnknown = price === '—';

  return (
    <div className="py-4 border-b border-[#ead8b5]/50 last:border-0 flex items-center gap-4">
      {image ? (
        <button
          onClick={() => onImageClick?.(image, name)}
          className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/50"
          aria-label={`View ${name}`}
        >
          <img
            src={encodeURI(image)}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </button>
      ) : null}
      <div className="flex-1 min-w-0">
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
    </div>
  );
}

export function MenuFullMenu() {
  const [activeCategory, setActiveCategory] = useState('classics');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState('');
  const containerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleImageClick = useCallback((src: string, name: string) => {
    setPreviewImage(src);
    setPreviewName(name);
  }, []);

  const closePreview = useCallback(() => setPreviewImage(null), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreview();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closePreview]);

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
    <>
      {/* Lightbox */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className="relative max-w-2xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute -top-10 right-0 font-ui text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              Close ×
            </button>
            <img
              src={encodeURI(previewImage)}
              alt={previewName}
              className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="font-display text-white/90 text-xl mt-4">{previewName}</p>
          </div>
        </div>
      )}

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
                  <MenuItem
                    key={`${item.name}-${item.note ?? ''}`}
                    {...item}
                    onImageClick={handleImageClick}
                  />
                ))}
              </div>
            ))}

            <p className="font-body text-sm text-brown/40 italic text-center pt-4">
              Items marked &ldquo;Ask us&rdquo; are available in-store — pricing varies. Ask our team.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
