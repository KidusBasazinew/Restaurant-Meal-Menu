export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon?: string;
}

export const TAX_RATE = 0.1;

export const MEALS: MenuItem[] = [
  {
    id: "1",
    name: "Eybisi Salad Mix",
    category: "Healthy food",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    description:
      "A refreshing blend of organic garden greens, cherry tomatoes, and our signature balsamic glaze.",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Easy Greek Salad",
    category: "Healthy food",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    description:
      "Classic Mediterranean flavors with crisp lettuce, crunchy garlic croutons, and zingy pepperoncini.",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Truffle Burger",
    category: "Junk food",
    price: 18.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    description:
      "Double wagyu beef patty with black truffle aioli and caramelized onions.",
    rating: 4.7,
  },
];

export const CATEGORIES: MenuCategory[] = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "healthy", name: "Healthy food", icon: "🥗" },
  { id: "junk", name: "Junk food", icon: "🍔" },
  { id: "dessert", name: "Dessert", icon: "🍰" },
];

export function getMealById(id: string) {
  return MEALS.find((m) => m.id === id);
}
