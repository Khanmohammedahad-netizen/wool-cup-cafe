'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
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
    label: "Espresso & Manual Brew",
    items: [
      { name: "Espresso", description: "A pure, concentrated shot with rich crema and lingering depth.", price: "₹200" },
      { name: "Doppio", description: "Twice the espresso, with twice the intensity.", price: "₹270" },
      { name: "Americano", description: "Espresso lengthened with hot water for a clean, balanced cup.", price: "₹270" },
      { name: "Long Black", description: "Rich espresso with a pronounced aroma and full-bodied finish.", price: "₹275" },
      { name: "Macchiato", description: "Espresso marked with a delicate touch of milk foam.", price: "₹295", image: "/images/beverages/Juices/Macchiato.jpg" },
      { name: "Cappuccino", description: "Espresso, steamed milk and silky foam in perfect balance.", price: "₹315" },
      { name: "Cortado", description: "Equal parts espresso and steamed milk for a smooth, balanced finish.", price: "₹315", image: "/images/beverages/Juices/Cortado.jpg" },
      { name: "Flat White", description: "Intense espresso softened with velvety milk foam.", price: "₹325" },
      { name: "Ratnagiri Estate", description: "Plum, elderflower, soft finish. Medium roast, washed, Catuai, 100% Arabica. V60, Aeropress or French press.", price: "₹320 / ₹340", note: "Manual Brew · Hot · Iced" },
      { name: "Salawara Estate", description: "Green apple, prune and creamy mouthfeel. Light roast, mosto honey sundried, SLN 795, 100% Arabica. V60, Aeropress or French press.", price: "₹300 / ₹320", note: "Manual Brew · Hot · Iced" },
      { name: "Extra Espresso Shot", description: "", price: "+₹150", note: "Add-on" },
      { name: "Oat Milk / Almond Milk", description: "", price: "+₹125", note: "Add-on" },
    ],
  },
  {
    id: 'cold',
    label: "Iced Americanos & Cold Brew",
    items: [
      { name: "Classic Americano", description: "Iced espresso and water for a crisp, clean finish.", price: "₹295", note: "Iced Americano" },
      { name: "Cranberry Americano", description: "Iced espresso brightened with tart cranberry juice.", price: "₹340", note: "Iced Americano" },
      { name: "Orange Americano", description: "Vibrant orange balanced with the depth of espresso.", price: "₹395", note: "Iced Americano" },
      { name: "OG Cold Brew", description: "Steeped for 18 hours for a naturally smooth, rich and mellow cup.", price: "₹360", note: "Cold Brew", image: "/images/beverages/Juices/OG Cold Brew.jpg" },
      { name: "Cranberry Cold Brew", description: "Cold brew balanced with tart cranberry for a crisp, fruity finish.", price: "₹375", note: "Cold Brew" },
      { name: "Pineapple Cold Brew", description: "Cold brew lifted with bright tropical pineapple juice.", price: "₹380", note: "Cold Brew" },
      { name: "Jasmine Cold Brew", description: "18-hour cold brew layered with fragrant jasmine and a bright touch of lemon.", price: "₹385", note: "Cold Brew" },
      { name: "Valencia Cold Brew", description: "Cold brew poured over fresh Valencia orange juice.", price: "₹395", note: "Cold Brew" },
    ],
  },
  {
    id: 'lattes',
    label: "Lattes & Signatures",
    items: [
      { name: "Latte", description: "Espresso and velvety milk, simply done.", price: "₹315 / ₹345", note: "Hot · Iced" },
      { name: "Mocha", description: "Espresso and dark chocolate finished with silky milk.", price: "₹325 / ₹355", note: "Hot · Iced" },
      { name: "Vanilla Latte", description: "Espresso and milk lifted with delicate vanilla.", price: "₹360 / ₹385", note: "Hot · Iced", image: "/images/beverages/Juices/Vanilla Latte.jpg" },
      { name: "Caramel Latte", description: "Espresso and silky milk with a rich caramel finish.", price: "₹375 / ₹390", note: "Hot · Iced" },
      { name: "Spanish Latte", description: "Espresso balanced with milk and luscious condensed milk.", price: "₹385 / ₹405", note: "Hot · Iced", image: "/images/beverages/Juices/Spanish Latte.jpg" },
      { name: "Vietnamese", description: "Intense coffee mellowed with sweet, creamy condensed milk.", price: "₹360 / ₹380", note: "Hot · Iced", image: "/images/beverages/Juices/Vietanamese.jpg" },
      { name: "Gud Latte", description: "Espresso and silky milk balanced with the deep, caramel-like sweetness of jaggery.", price: "₹335", note: "Hot Signature" },
      { name: "Hazelnut Latte", description: "Espresso with toasted hazelnut richness and a warm, nutty finish.", price: "₹345", note: "Hot Signature", image: "/Beverages/Hazelnut Latte.jpg" },
      { name: "Biscoff Latte", description: "Espresso and creamy milk layered with Biscoff and delicate biscuit notes.", price: "₹360", note: "Hot Signature" },
      { name: "Honey Cinnamon Latte", description: "Espresso and milk sweetened with honey and finished with aromatic cinnamon.", price: "₹360", note: "Hot Signature", image: "/images/beverages/Juices/Honey cinnamon Latte.jpg" },
      { name: "Sea Salt Vanilla Mont Blanc", description: "Cold brew and vanilla topped with whipped cream and a delicate sea-salt finish.", price: "₹375", note: "Iced Signature", image: "/Beverages/Seasalt Vanilla Mont Blanc.jpg" },
      { name: "Vietnamese Sea Salt Iced", description: "Vietnamese coffee and condensed milk crowned with a lightly salted cream.", price: "₹395", note: "Iced Signature" },
      { name: "Sea Salt Caramel Latte", description: "Iced espresso and milk layered with caramel and a hint of sea salt.", price: "₹415", note: "Iced Signature" },
      { name: "Blueberry Pancake Latte", description: "Espresso, blueberry, maple and milk inspired by a stack of blueberry pancakes.", price: "₹445", note: "Iced Signature", image: "/Beverages/Blueberry Pancake Latte.jpg" },
      { name: "Tiramisu Latte", description: "Espresso and creamy milk topped with tiramisu.", price: "₹450", note: "Iced Signature", image: "/images/beverages/Juices/Tiramisu Latte.jpg" },
      { name: "Black Forest Mocha", description: "Dark chocolate, espresso, raspberry and oat milk inspired by the classic Black Forest.", price: "₹495", note: "Iced Signature", image: "/Beverages/Black Forest mocha.jpg" },
    ],
  },
  {
    id: 'frappes',
    label: "Frappes & Affogato",
    items: [
      { name: "Classic Frappe", description: "Vanilla ice cream, espresso and milk blended into a rich, chilled coffee.", price: "₹395", note: "Coffee", image: "/images/beverages/Juices/Classic Frappe Coffee.jpg" },
      { name: "Belgium Frappe", description: "Velvety vanilla, espresso and chocolate with a rich Belgian-inspired finish.", price: "₹430", note: "Coffee", image: "/images/beverages/Juices/Belgium Frappe.jpg" },
      { name: "Caramel Hazelnut Crunch Frappe", description: "Caramel and hazelnut praline blended with vanilla ice cream, finished with whipped cream and hazelnut crunch.", price: "₹495", note: "Coffee", image: "/images/beverages/Juices/Caramel Hazelnut Crunch.jpg" },
      { name: "Nutella Frappe", description: "Creamy vanilla ice cream blended with rich Nutella for a smooth, decadent chocolate-hazelnut treat.", price: "₹460", note: "Non-Coffee" },
      { name: "Cheesecake Frappe", description: "Creamy vanilla ice cream blended with cheesecake and chilled milk.", price: "₹470", note: "Non-Coffee", image: "/images/beverages/Juices/Cheese Cake Frappe.jpg" },
      { name: "Blueberry Frappe", description: "Creamy vanilla ice cream blended with juicy blueberry for a rich, fruity and refreshing finish.", price: "₹470", note: "Non-Coffee" },
      { name: "Raspberry Frappe", description: "Creamy vanilla ice cream blended with vibrant raspberry for a sweet-tart, indulgent finish.", price: "₹470", note: "Non-Coffee" },
      { name: "Kit-Kat Frappe", description: "Chocolate ice cream blended with chocolate sauce and Kit-Kat, finished with whipped cream.", price: "₹475", note: "Non-Coffee", image: "/images/beverages/Juices/KitKat Frappe.jpg" },
      { name: "Brownie Frappe", description: "Chocolate ice cream blended with brownie pieces and chocolate sauce, topped with whipped cream.", price: "₹480", note: "Non-Coffee", image: "/images/beverages/Juices/Brownie Frappe.jpg" },
      { name: "Caramel Hazelnut Frappe", description: "Vanilla ice cream blended with caramel and hazelnut praline, topped with whipped cream and crunchy hazelnuts.", price: "₹495", note: "Non-Coffee", image: "/images/beverages/Juices/Caramel Hazelnut Crunchy Frappe.jpg" },
      { name: "Biscoff Frappe", description: "Vanilla ice cream blended with Biscoff spread and biscuit, finished with whipped cream.", price: "₹540", note: "Non-Coffee" },
      { name: "Vanilla Affogato", description: "Vanilla ice cream paired with intense espresso.", price: "₹385", note: "Affogato", image: "/images/beverages/Juices/Vanilla affogato.jpg" },
      { name: "Chocolate Affogato", description: "Chocolate ice cream paired with intense espresso.", price: "₹415", note: "Affogato" },
    ],
  },
  {
    id: 'matcha',
    label: "Matcha & Ube",
    items: [
      { name: "Matcha Latte", description: "Smooth, vibrant matcha with creamy milk.", price: "₹360 / ₹380", note: "Matcha · Hot · Iced", image: "/images/beverages/Juices/Hot Matcha Latte.jpg" },
      { name: "Matcha Lemonade Fizz", description: "Bright matcha, zesty lemonade and refreshing fizz.", price: "₹360", note: "Matcha", image: "/images/beverages/Juices/Matcha Lemonade.jpg" },
      { name: "Raspberry Matcha", description: "Bright matcha balanced with tart raspberry.", price: "₹430", note: "Matcha", image: "/Beverages/Raspberry Matcha.jpg" },
      { name: "Valencia Matcha", description: "Vibrant matcha brightened with fresh orange juice.", price: "₹430", note: "Matcha" },
      { name: "Matcha Affogato", description: "Vanilla ice cream meets vibrant matcha for a bittersweet finish.", price: "₹430", note: "Matcha" },
      { name: "Coconut Matcha Cloud", description: "Vibrant matcha layered with creamy coconut and a soft finish.", price: "₹450", note: "Matcha", image: "/images/beverages/Juices/Coconut Matcha Cloud.jpg" },
      { name: "Lavender Sea Salt Matcha", description: "Vibrant matcha with floral lavender and a delicate sea-salt finish.", price: "₹450", note: "Matcha", image: "/images/beverages/Juices/Lavender Sea Salt Matcha.jpg" },
      { name: "Blueberry Cream Matcha", description: "Vibrant matcha layered with blueberry and creamy foam.", price: "₹460", note: "Matcha" },
      { name: "Matcha Frappe", description: "Creamy matcha blended into a rich, chilled frappe.", price: "₹485", note: "Matcha" },
      { name: "Ube Lemonade", description: "Sweet, vibrant ube balanced with refreshing lemonade.", price: "₹345", note: "Ube Pop Up", image: "/Beverages/Ube Lemonade.jpg" },
      { name: "Dirty Ube", description: "Creamy ube layered with rich espresso.", price: "₹425", note: "Ube Pop Up" },
      { name: "Coco Ube Cloud", description: "Creamy ube and coconut finished with a soft indulgent layer.", price: "₹425", note: "Ube Pop Up", image: "/Beverages/Coco Ube Cloud.jpg" },
      { name: "Ube Frappe", description: "Creamy ube blended into a rich, chilled frappe.", price: "₹425", note: "Ube Pop Up", image: "/Beverages/Ube Frappe.jpg" },
    ],
  },
  {
    id: 'tea',
    label: "Teas, Coolers & Juices",
    items: [
      { name: "Desi Ginger Tea", description: "Bold Indian milk tea infused with fresh ginger.", price: "₹270", note: "Hot Tea" },
      { name: "Chamomile Tea", description: "Delicate chamomile with a gentle, soothing finish.", price: "₹290", note: "Hot Tea", image: "/images/beverages/Juices/Chamomile Tea.jpg" },
      { name: "Jasmine Tea", description: "Fragrant jasmine with a delicate floral finish.", price: "₹295", note: "Hot Tea" },
      { name: "Hibiscus Lemongrass", description: "Floral hibiscus and bright lemongrass in a refreshing infusion.", price: "₹295", note: "Hot Tea" },
      { name: "Kashmiri Kahwa", description: "Fragrant Kashmiri green tea infused with warming spices and delicate floral notes.", price: "₹395", note: "Hot Tea" },
      { name: "Medicine Ball", description: "A warming blend of tea, fresh lemon, ginger and honey with a soothing, aromatic finish.", price: "₹415", note: "Hot Tea", image: "/images/beverages/Juices/Medicine Bowl.jpg" },
      { name: "Classic Hot Chocolate", description: "Rich, velvety chocolate blended with creamy milk for a smooth, indulgent cup.", price: "₹380", note: "Hot Chocolate", image: "/images/beverages/Juices/Hot Chocolate.jpg" },
      { name: "Sea Salt Caramel Hot Chocolate", description: "Velvety chocolate and creamy milk layered with rich caramel and a delicate sea-salt finish.", price: "₹395", note: "Hot Chocolate" },
      { name: "Passion Fruit Iced Tea", description: "Chilled tea with passion fruit notes.", price: "₹365", note: "Iced Tea" },
      { name: "Lemon Iced Tea", description: "Refreshing black tea with a bright lemon finish.", price: "₹375", note: "Iced Tea", image: "/images/beverages/Juices/Lemon Iced Tea.jpg" },
      { name: "Peach Iced Tea", description: "Chilled tea with soft, juicy peach notes.", price: "₹385", note: "Iced Tea", image: "/images/beverages/Juices/Peach Iced Tea.jpg" },
      { name: "Fresh Lime Soda", description: "Classic, fizzy and tangy.", price: "₹270", note: "Cooler" },
      { name: "Mint Mojito", description: "Fresh mint and lime come alive over ice.", price: "₹295", note: "Cooler", image: "/images/beverages/Juices/Mint Mojito.jpg" },
      { name: "Cranberry Cooler", description: "Bright cranberry cooler beautifully chilled.", price: "₹340", note: "Cooler" },
      { name: "Orange Basil Cooler", description: "Citrus meets herbs in a summery blend.", price: "₹360", note: "Cooler", image: "/images/beverages/Juices/Orange Basil Cooler.jpg" },
      { name: "Orange Passionfruit Cooler", description: "Citrus orange meets tropical passionfruit: light, refreshing and sunny.", price: "₹360", note: "Cooler" },
      { name: "Muscle Memory", description: "A creamy blend of banana, oats and peanut butter, naturally sweetened with honey.", price: "₹450", note: "Wellness Blend" },
      { name: "Rich & Toned", description: "A rich blend of strawberry, blueberry and almond butter balanced with oats, milk and honey.", price: "₹525", note: "Wellness Blend", image: "/images/beverages/Juices/Rich & Toned.jpg" },
      { name: "Watermelon Juice", description: "Light, juicy and naturally refreshing watermelon.", price: "₹340", note: "Juice", image: "/images/beverages/Juices/Watermelon Juice.jpg" },
      { name: "Orange Juice", description: "Freshly pressed orange with bright, natural sweetness.", price: "₹360", note: "Juice", image: "/images/beverages/Juices/Orange Juice.jpg" },
      { name: "Pineapple Juice", description: "Fresh pineapple with a bright, tropical finish.", price: "₹370", note: "Juice", image: "/images/beverages/Juices/Pineapple Juice.jpg" },
      { name: "ABC Juice", description: "A refreshing blend of apple, beetroot and carrot.", price: "₹380", note: "Juice" },
    ],
  },
  {
    id: 'breakfast',
    label: "Breakfast & Brunch",
    items: [
      { name: "Farmers Style Omelette", description: "Three-egg omelette with vegetables. Served with hashbrowns.", price: "₹450", note: "Omelette", image: "/images/2/Farmer style omlette.jpg" },
      { name: "Egg White Mushroom Omelette", description: "Light egg white omelette with mushrooms. Served with hashbrowns.", price: "₹465", note: "Omelette" },
      { name: "Masala Indian Style Omelette", description: "Indian-spiced omelette with herbs and chillies. Served with hashbrowns.", price: "₹495", note: "Omelette", image: "/images/4/Break Fast Masala Omlette.jpg" },
      { name: "Cheese Omelette", description: "Fluffy omelette filled with melted mozzarella. Served with hashbrowns.", price: "₹515", note: "Omelette", image: "/images/3/Cheese omlete.jpg" },
      { name: "Masala Sausage Cheese Omelette", description: "Loaded omelette with sausage, cheese and Indian spices. Served with hashbrowns.", price: "₹550", note: "Omelette" },
      { name: "Egg Burrito", description: "Scrambled eggs, tri bell peppers, onions and cumin mayo wrapped in a warm tortilla.", price: "₹395", note: "Burrito Roll" },
      { name: "Paneer Burrito", description: "Spiced grilled paneer, tri bell peppers, onions and cumin mayo wrapped in a warm tortilla.", price: "₹420", note: "Burrito Roll" },
      { name: "Chicken Burrito", description: "Grilled chicken, tri bell peppers, onions and cumin mayo wrapped in a warm tortilla.", price: "₹450", note: "Burrito Roll", image: "/images/3/Chicken Burrito.jpg" },
      { name: "Egg Benedict", description: "Poached eggs with chicken ham and avocado on sourdough, finished with buttery hollandaise style richness.", price: "₹545", note: "Brunch", image: "/images/4/Egg Benedict.jpg" },
      { name: "Turkish Eggs", description: "Perfectly poached eggs over garlicky Greek yogurt, finished with dill, jalapeños and warm chilli oil. Served with toasted sourdough.", price: "₹430", note: "Brunch", image: "/images/2/Turkish Eggs.jpg" },
      { name: "Shakshuka", description: "Two eggs baked in a rich, spiced tomato and bell pepper sauce with spinach, served alongside toasted sourdough.", price: "₹470", note: "Brunch", image: "/images/2/Shakshuka.jpg" },
      { name: "Desi Kheema with Potato Bun", description: "Spiced mutton kheema with potato bun and side salad.", price: "₹490", note: "Brunch", image: "/images/4/Desi Keema with potato bun.jpg" },
      { name: "Honey Banana Pancake", description: "Fluffy pancakes served with fresh bananas, cream cheese and honey.", price: "₹380", note: "Pancakes" },
      { name: "Blueberry Pancake", description: "Fluffy pancakes layered with blueberry compote, cream cheese and fresh blueberries.", price: "₹430", note: "Pancakes" },
      { name: "Biscoff Pancake", description: "Stacked pancakes topped with Biscoff spread, cream cheese and crunchy Biscoff biscuits.", price: "₹450", note: "Pancakes" },
      { name: "Honey Banana Waffle", description: "Golden waffle served with fresh bananas, cream cheese and honey.", price: "₹395", note: "Waffles" },
      { name: "Nutella Waffle", description: "Golden waffle with Nutella, fresh apples, toasted almonds and honey.", price: "₹495", note: "Waffles", image: "/images/4/Nuttela Waffle.jpg" },
      { name: "Belgian Chocolate Waffle", description: "Belgian waffle topped with premium Belgian chocolate (Callebaut 33.6%), cream cheese and bananas.", price: "₹540", note: "Waffles" },
      { name: "Nutella Banana Crepe", description: "Thin French crêpe filled with Nutella, fresh bananas, cream cheese and toasted almond flakes.", price: "₹470", note: "Crepe" },
      { name: "Nutella Banana French Toast", description: "Brioche French toast with Nutella, bananas and toasted almonds.", price: "₹495", note: "French Toast" },
      { name: "Blueberry French Toast", description: "Brioche French toast topped with blueberry compote, cream cheese and fresh blueberries.", price: "₹540", note: "French Toast" },
      { name: "Biscoff French Toast", description: "Buttery brioche French toast finished with Biscoff spread and cream cheese.", price: "₹560", note: "French Toast", image: "/images/3/Lotus Biscoff French toast.jpg" },
      { name: "Berry Pistachio French Toast", description: "Brioche French toast with cherry compote, cream cheese, roasted pistachios and honey.", price: "₹595", note: "French Toast" },
      { name: "Vanilla Ice Cream", description: "For pancakes, waffles, crepes and French toast.", price: "+₹160", note: "Add-on" },
      { name: "Egg (Fried / Poached)", description: "", price: "+₹70", note: "Add-on" },
      { name: "Cheese / Hashbrowns", description: "", price: "+₹90", note: "Add-on" },
      { name: "Sausages", description: "", price: "+₹150", note: "Add-on" },
      { name: "Toasted Bread", description: "", price: "+₹50", note: "Add-on" },
      { name: "Potato Bun", description: "", price: "+₹70", note: "Add-on" },
    ],
  },
  {
    id: 'toast',
    label: "Toast",
    items: [
      { name: "Scrambled Eggs on Toast", description: "Soft scrambled eggs served with buttered toast and mixed fruit jam.", price: "₹325" },
      { name: "Wild Mushroom Crostini", description: "Sautéed wild mushrooms, garlic and cheese on toasted ciabatta.", price: "₹425", image: "/images/3/Wild Mushroom Crostini.jpg" },
      { name: "Creamy Champignon Toast", description: "Sourdough topped with sautéed mushrooms, asparagus and scrambled egg.", price: "₹450" },
      { name: "Creamy Chicken Toast", description: "Sourdough topped with creamy chicken, bell peppers, parmesan and garlic.", price: "₹450", image: "/Food/Creamy Chicken Toast.JPG" },
      { name: "Avocado Toast", description: "Sourdough topped with creamy guacamole, pico de gallo, feta and cumin mayo.", price: "₹470" },
      { name: "Mediterranean Avocado Toast", description: "Loaded avocado toast with cherry tomatoes, olives, dates, peanuts and cumin mayo.", price: "₹495", image: "/Food/Meditrrainean Avocado Toast.JPG" },
      { name: "Berries Mascarpone Toast", description: "Sourdough topped with mascarpone, raspberries and blueberries.", price: "₹520" },
      { name: "Platter of Toast", description: "Mushroom & cream cheese, avocado & cream cheese, banana & peanut butter, blueberry & cream cheese.", price: "₹540", image: "/images/beverages/Juices/Platter of Toast.jpg" },
    ],
  },
  {
    id: 'wellness',
    label: "Healthy Bowls",
    items: [
      { name: "Oatmeal Porridge Bowl", description: "Creamy oats layered with apple, almond flakes, crunchy granola, Callebaut chocolate, almond butter and honey.", price: "₹350" },
      { name: "Fresh Fruit Bowl", description: "A refreshing mix of seasonal fruits finished with honey and crunchy almond flakes.", price: "₹395" },
      { name: "Yogurt Bowl", description: "Creamy yogurt with mascarpone, granola, seasonal fruits, blueberries and honey with a hint of vanilla.", price: "₹450" },
      { name: "Cocoa Coco Smoothie Bowl", description: "Cocoa powder, coconut milk and dates, topped with banana, granola and coconut flakes.", price: "₹630" },
      { name: "Açaí Smoothie Bowl", description: "Açaí powder with berries, dates and coconut milk, topped with banana, granola and almond butter.", price: "₹650" },
    ],
  },
  {
    id: 'salads',
    label: "Soups & Salads",
    items: [
      { name: "Roasted Tomato Basil Soup", description: "Roasted tomato, fresh basil, garlic & vegetables. Served with garlic bread. Film Nagar only.", price: "₹295", note: "Soup" },
      { name: "Shroom & Bloom", description: "Creamy garlic soup with asparagus, mushrooms & herbs. Served with garlic bread. Film Nagar only.", price: "₹315", note: "Soup" },
      { name: "Tex Mex Soup", description: "Spicy tomato soup with beans, corn & peppers. Served with garlic bread. Film Nagar only.", price: "₹325", note: "Soup" },
      { name: "Chicken Caesar Salad", description: "Romaine lettuce, grilled chicken, Parmesan, olives & Caesar dressing.", price: "₹395", note: "Salad" },
      { name: "Hot Honey Watermelon Feta Bites", description: "Watermelon, feta, arugula, hot honey & tangy dressing.", price: "₹450", note: "Salad" },
      { name: "Quinoa Avocado Salad", description: "Quinoa, avocado, arugula, cucumber, peppers & apple cider vinaigrette dressing.", price: "₹470", note: "Salad" },
      { name: "Add Chicken", description: "To any soup or salad.", price: "+₹120", note: "Add-on" },
    ],
  },
  {
    id: 'appetizers',
    label: "Appetizers & Small Bites",
    items: [
      { name: "Zucchini Fritters", description: "Crispy zucchini fritters with peri peri mayo.", price: "₹340" },
      { name: "Spinach Corn Rolls", description: "Crispy rolls filled with creamy spinach, corn & Parmesan.", price: "₹425", image: "/images/3/Spinach corn rolls.jpg" },
      { name: "Parmesan Cheese Croquettes", description: "Crispy Parmesan croquettes with rich marinara sauce.", price: "₹430", image: "/images/4/Parmesan Cheese croquettes.jpg" },
      { name: "Chicken Tikka Roll", description: "Crispy rolls filled with spiced chicken tikka, capsicum, onion & creamy mayo.", price: "₹430", image: "/images/1/Chicken Tikka Rolls.jpg" },
      { name: "Mexican / BBQ Chicken Wings", description: "Chicken wings tossed in Mexican spices or glazed with smoky BBQ sauce. Film Nagar only.", price: "₹430 / ₹470" },
      { name: "Crispy Fried Chicken Tenders", description: "Crispy chicken tenders with peri peri mayo.", price: "₹450", image: "/images/2/Sesame Chicken Tenders.jpg" },
      { name: "Cajun Chicken Hummus", description: "Creamy hummus with Cajun grilled chicken, avocado & garlic bread. Film Nagar only.", price: "₹450", image: "/images/1/Cajun Chicken hummas.jpg" },
      { name: "Vellulli Karam Chicken & Chips", description: "Crispy spiced chicken with vellulli karam, pico de gallo & peri peri mayo. Film Nagar only.", price: "₹450", image: "/images/1/velluli karam chicken & chips.jpg" },
      { name: "Loaded Mexican Nachos", description: "Loaded nachos with cheese sauce, guacamole, salsa, sour cream & baked beans. Film Nagar only.", price: "₹470", image: "/images/1/Loaded mexican nachos.jpg" },
      { name: "Kheema Rolls", description: "Spiced mutton kheema rolls with capsicum, onion & creamy mayo.", price: "₹490" },
      { name: "Polenta-Crusted Fried Fish", description: "Crispy polenta-crusted fish with salad & cumin mayo.", price: "₹549", image: "/images/4/Polenta Fried fish.jpg" },
      { name: "Honey Chilli Garlic Shrimps", description: "Juicy shrimps tossed with honey, chilli, garlic & peppers. Film Nagar only.", price: "₹630", image: "/Food/Honey Garlic Shrimps.JPG" },
      { name: "Crispy Sriracha Prawns", description: "Crispy prawns tossed in spicy sriracha sauce with salad. Film Nagar only.", price: "₹749", image: "/images/3/Crispy srincha prawns.jpg" },
      { name: "Peri Peri Prawns with Avocado Salsa", description: "Peri peri prawns served with fresh avocado salsa. Film Nagar only.", price: "₹749", image: "/images/1/peri peri prawns with avacado salsa.jpg" },
      { name: "French Fries", description: "Classic / Peri Peri / Cheese", price: "₹295 / ₹310 / ₹325", note: "Small Bites", image: "/images/4/Peri peri fries.jpg" },
      { name: "Potato Wedges", description: "Classic / Peri Peri / Cheese", price: "₹310 / ₹320 / ₹340", note: "Small Bites", image: "/images/4/Potato wedges.jpg" },
      { name: "Cheese Garlic Bread", description: "Golden toasted bread with garlic butter & cheese.", price: "₹360", note: "Small Bites", image: "/images/1/Cheese garlic bread.jpg" },
    ],
  },
  {
    id: 'food',
    label: "Burgers & Sandwiches",
    items: [
      { name: "Exotic Veg Burger", description: "Veg patty, cheese, lettuce & peri peri mayo, served with potato wedges.", price: "₹450", note: "Burger" },
      { name: "Spicy Cottage Cheese Burger", description: "Crispy paneer patty with cheese, jalapeños & peri peri mayo.", price: "₹470", note: "Burger", image: "/images/4/Spiced Cottage cheese burger.jpg" },
      { name: "Mushroom Cheese Croissant", description: "Creamy Parmesan mushrooms & cheese layered in a buttery croissant.", price: "₹495", note: "Burger", image: "/images/2/Mushroom Cheese crosaint.jpg" },
      { name: "Italian Chicken Cheese Burger", description: "Juicy chicken patty with cheese, fresh vegetables & peri peri mayo.", price: "₹520", note: "Burger", image: "/images/4/Italian Chicken cheese burger.jpg" },
      { name: "Chicken Croissant", description: "Buttery croissant with crispy chicken, cheese, jalapeños & peri peri mayo.", price: "₹520", note: "Burger", image: "/images/3/Chicken Crossiant.jpg" },
      { name: "Zinger Chicken Burger", description: "Crispy chicken, cheese, lettuce & peri peri mayo, served with potato wedges.", price: "₹530", note: "Burger" },
      { name: "Jalapeño Lamb Burger", description: "Juicy lamb patty with pickled jalapeños, tomato, onion, cheese & peri peri mayo.", price: "₹540", note: "Burger" },
      { name: "Butter Paneer Masala on Ciabatta", description: "Ciabatta with creamy butter paneer masala, cheese & fresh vegetables.", price: "₹450", note: "Sandwich" },
      { name: "Pesto Focaccia Veg / Chicken", description: "Toasted focaccia with pesto vegetables, cheese & cumin mayo.", price: "₹450 / ₹520", note: "Sandwich", image: "/images/1/Pesto focaccia sandwich.jpg" },
      { name: "Chicken Caesar Sandwich", description: "Ciabatta with grilled chicken, romaine lettuce, Caesar dressing & olives.", price: "₹470", note: "Sandwich" },
      { name: "Crispy Fried Chicken Sandwich", description: "Crispy chicken, cheese, fresh vegetables & peri peri mayo on toasted bread.", price: "₹495", note: "Sandwich", image: "/images/2/Crispy Chicken Sandwich.jpg" },
      { name: "Chettinad Chicken Brioche", description: "Brioche with Chettinad seasoning, shredded chicken, cheese & cumin mayo.", price: "₹495", note: "Sandwich", image: "/images/1/Chettinad chicken brioche.jpg" },
      { name: "Roasted Chicken & Cheese in Ciabatta", description: "Ciabatta with roasted chicken, cheese, fresh vegetables & peri peri mayo.", price: "₹520", note: "Sandwich" },
      { name: "Kheema Brioche", description: "Brioche filled with spiced kheema, cheese & creamy cumin mayo.", price: "₹540", note: "Sandwich", image: "/images/2/Kheema Brioche.jpg" },
    ],
  },
  {
    id: 'pizza',
    label: "Pizza & Pasta",
    items: [
      { name: "Classic Margherita", description: "Classic Italian sauce, mozzarella & fresh basil.", price: "₹430", note: "Pizza" },
      { name: "Verdure Pizza", description: "Mozzarella, broccoli, peppers, olives, jalapeños, corn & cherry tomatoes.", price: "₹470", note: "Pizza" },
      { name: "Pesto Paneer Pizza", description: "Pesto, paneer, mozzarella, olives & onions.", price: "₹495", note: "Pizza", image: "/images/2/Pesto paneer puff pizza.jpg" },
      { name: "Chicken Tikka Pizza", description: "Chicken tikka, mozzarella, capsicum & onions.", price: "₹540", note: "Pizza", image: "/images/3/Chicken tikka puffizza.jpg" },
      { name: "Fiery Chicken Pizza", description: "Spicy crispy chicken, mozzarella, jalapeños & peppers.", price: "₹560", note: "Pizza", image: "/images/1/Fiery chicken pizza.jpg" },
      { name: "Wool Cup Mighty Meat Pizza", description: "Spicy mutton kheema, mozzarella, green chilli & garlic.", price: "₹570", note: "Pizza", image: "/images/1/Wool cup mighty meat puff pizza.jpg" },
      { name: "Puff-Based Crust", description: "Swap the thin crust on any pizza.", price: "+₹120", note: "Add-on" },
      { name: "Pasta Picasso Veg / Chicken", description: "Choose penne or spaghetti, with arrabbiata, alfredo or rosatella sauce. Served with garlic bread.", price: "₹450 / ₹540", note: "Pasta" },
      { name: "Chestnut Ravioli", description: "Chestnut & ricotta-filled ravioli in a creamy herb sauce. Served with garlic bread. Film Nagar only.", price: "₹450", note: "Pasta" },
      { name: "Chicken & Jack Cheese Cannelloni", description: "Cannelloni stuffed with creamy chicken, Jack cheese & Parmesan. Served with garlic bread. Film Nagar only.", price: "₹520", note: "Pasta", image: "/images/3/Chicken & Cannelloni.jpg" },
      { name: "Pesto Spaghetti Aglio e Olio", description: "Spaghetti with garlic, chilli, sun-dried tomatoes, pesto & Parmesan. Served with garlic bread.", price: "₹540", note: "Pasta" },
    ],
  },
  {
    id: 'mains',
    label: "Mains & Rice Bowls",
    items: [
      { name: "Charred Broccoli Steak", description: "Charred broccoli with creamy mashed potato, tomato sauce, peppers & garlic. Film Nagar only.", price: "₹540", note: "Main", image: "/images/4/Charred broccoli steak.jpg" },
      { name: "Mexican Burrito Rice Bowl", description: "Mexican rice with beans, vegetables, corn, chickpeas & sliced avocado. Add chicken +₹120; add prawns +₹150 (Film Nagar).", price: "₹540", note: "Main", image: "/images/3/Mexican Burrito bowl.jpg" },
      { name: "Smoky BBQ Cottage Cheese", description: "Grilled paneer with smoky BBQ sauce, mashed potato & sautéed vegetables.", price: "₹570", note: "Main", image: "/images/4/Smoky BBQ cottage cheese.jpg" },
      { name: "Polo Ricotta Spinach Chicken", description: "Pan-seared chicken with ricotta spinach, grilled vegetables & mashed potato.", price: "₹595", note: "Main" },
      { name: "Caribbean Jerk Chicken", description: "Jerk-spiced chicken with creamy mashed potato, sautéed vegetables & cumin mustard sauce.", price: "₹615", note: "Main" },
      { name: "Thyme Roasted Chicken", description: "Herb-roasted chicken with mashed potato, grilled vegetables & thyme sauce.", price: "₹630", note: "Main", image: "/images/1/Thyme roasted chicken.jpg" },
      { name: "Peri Peri Grilled Fish", description: "Peri peri grilled fish with quinoa, sautéed vegetables & creamy coconut sauce. Film Nagar only.", price: "₹630", note: "Main", image: "/Food/Spicy Peri Peri Grilled Fish with quinoa Rice.JPG" },
      { name: "Grilled Fish with Sweet Ginger Glaze", description: "Grilled fish with sweet ginger glaze, mashed potato & sautéed vegetables. Film Nagar only.", price: "₹650", note: "Main", image: "/images/4/Sweet ginger kissed fish.jpg" },
      { name: "Orange Chilli Glazed Fish", description: "Grilled fish with orange chilli glaze, brown rice & exotic vegetables. Film Nagar only.", price: "₹650", note: "Main", image: "/images/1/Orange chilli glazed fish.jpg" },
      { name: "Rustic Kheema with Egg", description: "Spiced mutton kheema with herb rice, fried egg & peppers. Film Nagar only.", price: "₹675", note: "Main" },
      { name: "Crispy Paneer Fried Rice", description: "Spiced fried rice with paneer, vegetables & raita.", price: "₹540", note: "Poke Rice Bowl" },
      { name: "Paneer Tikka Rice Bowl", description: "Paneer tikka with basmati rice in rich Indian gravy. Served with salad & raita.", price: "₹560", note: "Poke Rice Bowl", image: "/images/4/Paneer Tikka Rice Bowl.jpg" },
      { name: "Desi Egg Rice Bowl", description: "Indian-style spiced eggs with basmati rice. Served with salad & raita.", price: "₹575", note: "Poke Rice Bowl", image: "/images/1/Desi Egg Bowl.jpg" },
      { name: "Butter Chicken Rice Bowl", description: "Creamy butter chicken with basmati rice. Served with salad & raita.", price: "₹585", note: "Poke Rice Bowl", image: "/images/4/Butter chicken rice bowl.jpg" },
      { name: "Crispy Chicken Fried Rice", description: "Fried rice with egg, crispy chicken & Indian spices, served with raita & stew.", price: "₹595", note: "Poke Rice Bowl" },
      { name: "Kheema Rice Bowl", description: "Spiced mutton kheema with basmati rice. Served with salad & raita.", price: "₹640", note: "Poke Rice Bowl" },
      { name: "Herb Rice", description: "Available with mains only.", price: "₹250", note: "Side" },
      { name: "Creamy Mashed Potato", description: "Available with mains only.", price: "₹250", note: "Side" },
      { name: "Grilled Chicken", description: "Available with mains only.", price: "₹270", note: "Side" },
      { name: "Grilled Fish", description: "Available with mains only. Film Nagar only.", price: "₹275", note: "Side" },
      { name: "Grilled Veggies", description: "Available with mains only.", price: "₹290", note: "Side" },
      { name: "Grilled Prawns", description: "Available with mains only. Film Nagar only.", price: "₹300", note: "Side" },
    ],
  },
  {
    id: 'desserts',
    label: "Desserts",
    items: [
      { name: "Blueberry Cheesecake", description: "Crumb base, cheesecake topped with blueberry filling & fresh blueberries. Film Nagar only.", price: "₹340", note: "Cakes & Pastries" },
      { name: "Biscoff Cheesecake", description: "Crumb base, creamy cheesecake layered with Biscoff spread & Biscoff cookie. Film Nagar only.", price: "₹340", note: "Cakes & Pastries" },
      { name: "Burnt Basque Cheesecake", description: "Add warm Nutella +₹180.", price: "₹360", note: "Cakes & Pastries", image: "/images/beverages/Juices/Burnt Basque Cheesecake with Warm Nutella.jpg" },
      { name: "Tiramisu", description: "Coffee-soaked ladyfingers with rich mascarpone cream & cocoa drizzle.", price: "₹395", note: "Cakes & Pastries" },
      { name: "Biscoff Tres Leches", description: "Soft tres leches sponge in Biscoff flavoured milk, topped with cream & salted caramel.", price: "₹380", note: "Cakes & Pastries", image: "/images/beverages/Juices/Biscoff Cake.jpg" },
      { name: "Belgium Chocolate Cake", description: "Rich chocolate cake with ganache, mousse & Belgian chocolate glaze.", price: "₹380", note: "Cakes & Pastries" },
      { name: "Black Forest Cake", description: "Chocolate sponge layered with cherry filling, chocolate mousse, cream and finished with chocolate shavings. Film Nagar only.", price: "₹315", note: "Cakes & Pastries" },
      { name: "Biscoff Cake", description: "Vanilla sponge layered with Biscoff cream & spread. Film Nagar only.", price: "₹300", note: "Cakes & Pastries", image: "/images/beverages/Juices/Biscoff Cake.jpg" },
      { name: "Chocolate Cupcake", description: "Rich chocolate cupcake with creamy chocolate frosting.", price: "₹150", note: "Cupcake" },
      { name: "Strawberry Cupcake", description: "Soft vanilla cupcake filled with strawberry compote & creamy strawberry frosting.", price: "₹200", note: "Cupcake" },
      { name: "Blueberry Cupcake", description: "Soft vanilla cupcake with blueberry compote & creamy blueberry frosting.", price: "₹200", note: "Cupcake" },
      { name: "Red Velvet Cupcake", description: "Soft red velvet cupcake with smooth cream cheese frosting.", price: "₹220", note: "Cupcake" },
      { name: "Banana Bread", description: "Moist banana bread with warm cinnamon & vanilla notes, topped with walnuts.", price: "₹200", note: "Warm" },
      { name: "Fudge Brownie", description: "Rich, fudgy chocolate brownie with chocolate ganache. Add vanilla ice cream ₹160. Film Nagar only.", price: "₹250", note: "Warm" },
      { name: "Butter Croissant", description: "Classic buttery, flaky croissant. Film Nagar only.", price: "₹250", note: "Warm" },
      { name: "Almond Croissant", description: "Buttery croissant filled with almond cream. Film Nagar only.", price: "₹315", note: "Warm" },
      { name: "Millet Brownie", description: "Stevia sweetened, little millet and almond flour sponge topped with chocolate glaze.", price: "₹360", note: "Warm · Vegan" },
      { name: "Umm Ali", description: "Warm Egyptian pudding made with flaky puff bread topped with cream, nuts & raisins. Film Nagar only.", price: "₹450", note: "Warm" },
      { name: "Macaron", description: "Coffee, vanilla, hazelnut, chocolate, strawberry. Film Nagar only.", price: "₹125", note: "Cookies" },
      { name: "Oatmeal Cookie", description: "Chewy oatmeal cookie with warm cinnamon.", price: "₹180", note: "Cookies" },
      { name: "Hazelnut Cookie", description: "Buttery hazelnut cookie with chocolate chunks.", price: "₹200", note: "Cookies" },
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
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/50"
          aria-label={`View ${name}`}
        >
          <Image
            src={encodeURI(image)}
            alt={name}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-300 hover:scale-105"
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
            <Image
              src={encodeURI(previewImage)}
              alt={previewName}
              width={1600}
              height={1200}
              sizes="(max-width: 768px) 100vw, 672px"
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl"
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
              All prices in INR. Taxes extra as applicable. Please inform the stewards of any allergies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
