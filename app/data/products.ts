// Muhany Products Data - Complete Catalog
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: string;
  originalPrice?: string;
  description: string;
  longDescription?: string;
  size?: string;
  quantity?: string;
  flavors?: string[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating?: number;
  reviews?: number;
  ingredients?: string[];
  allergens?: string[];
  nutritionPer100g?: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    fiber: number;
  };
}

export const muhanyProducts: Product[] = [
  // MINIS
  {
    id: "cake-balls-25pcs",
    name: "Cake Balls",
    category: "Minis",
    price: "ETB 1,750",
    description: "25 pieces of delicious cake balls",
    longDescription: "Perfect bite-sized treats available in Coffee Chocolate, White Chocolate, Milk Chocolate, Dark Chocolate, and Fruit-Flavored Chocolate. Mix available.",
    quantity: "25 pcs",
    flavors: ["Coffee Chocolate", "White Chocolate", "Milk Chocolate", "Dark Chocolate", "Fruit-Flavored Chocolate"],
    images: ["/products/muhany dubai habesha beu.jpg"],
    inStock: true,
    stockCount: 50,
    rating: 4.8,
    reviews: 45,
    ingredients: ["Cake", "Chocolate", "Various Flavors"],
    allergens: ["Contains gluten", "Contains dairy", "May contain nuts"],
    nutritionPer100g: { calories: 320, fat: 18, carbs: 35, protein: 4, fiber: 2 }
  },
  {
    id: "mini-donuts-25pcs",
    name: "Mini Chocolate Donuts",
    category: "Minis",
    price: "ETB 1,750",
    description: "25 pieces of mini chocolate donuts",
    longDescription: "Delicious mini donuts available in Nut, Sprinkle, Double Layer Chocolate, and Coconut flavors. Mix available.",
    quantity: "25 pcs",
    flavors: ["Nut", "Sprinkle", "Double Layer Chocolate", "Coconut"],
    images: ["/products/muhany dubai caramel beu.jpg"],
    inStock: true,
    stockCount: 40,
    rating: 4.7,
    reviews: 38,
    ingredients: ["Flour", "Chocolate", "Sugar", "Various Toppings"],
    allergens: ["Contains gluten", "Contains dairy", "May contain nuts"],
    nutritionPer100g: { calories: 380, fat: 22, carbs: 42, protein: 5, fiber: 1 }
  },
  {
    id: "mini-brownies-25pcs",
    name: "Mini Brownies",
    category: "Minis",
    price: "ETB 2,250",
    description: "25 pieces of rich mini brownies",
    longDescription: "Rich and fudgy mini brownies available in Caramel, Nut, and White Chocolate flavors. Mix available.",
    quantity: "25 pcs",
    flavors: ["Caramel", "Nut", "White Chocolate"],
    images: ["/products/muhany dubai kunafa beu.jpg"],
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviews: 52,
    ingredients: ["Chocolate", "Butter", "Eggs", "Flour", "Various Flavors"],
    allergens: ["Contains gluten", "Contains dairy", "Contains eggs", "May contain nuts"],
    nutritionPer100g: { calories: 450, fat: 28, carbs: 48, protein: 6, fiber: 3 }
  },
  {
    id: "mini-tarts-25pcs",
    name: "Mini Tarts",
    category: "Minis",
    price: "ETB 1,750",
    description: "25 pieces of elegant mini tarts",
    longDescription: "Elegant mini tarts available in Lemon, Caramel, and Chocolate flavors. Perfect for parties and events.",
    quantity: "25 pcs",
    flavors: ["Lemon", "Caramel", "Chocolate"],
    images: ["/products/muhany dubai nutella beu.jpg"],
    inStock: true,
    stockCount: 30,
    rating: 4.6,
    reviews: 29,
    ingredients: ["Pastry", "Various Fillings", "Fresh Ingredients"],
    allergens: ["Contains gluten", "Contains dairy", "May contain nuts"],
    nutritionPer100g: { calories: 280, fat: 15, carbs: 32, protein: 3, fiber: 1 }
  },
  {
    id: "boxegna",
    name: "Boxegna",
    category: "Minis",
    price: "ETB 850",
    description: "Traditional Ethiopian pastry",
    longDescription: "Authentic Ethiopian pastry made with traditional recipes and premium ingredients.",
    quantity: "1 piece",
    images: ["/products/muhany dubai cotton beu.jpg"],
    inStock: true,
    stockCount: 25,
    rating: 4.5,
    reviews: 18,
    ingredients: ["Flour", "Butter", "Sugar", "Traditional Spices"],
    allergens: ["Contains gluten", "Contains dairy"],
    nutritionPer100g: { calories: 350, fat: 20, carbs: 38, protein: 4, fiber: 2 }
  },
  // CHOCOLATES
  {
    id: "dubai-habesha",
    name: "Dubai Chocolate - Habesha",
    category: "Chocolates",
    price: "ETB 1,500",
    description: "Dubai chocolate with Habesha flavor",
    longDescription: "Premium Dubai chocolate infused with authentic Ethiopian Habesha flavors.",
    quantity: "1 piece",
    images: ["/products/muhany dubai habesha beu.jpg"],
    inStock: true,
    stockCount: 30,
    rating: 4.8,
    reviews: 42,
    ingredients: ["Chocolate", "Ethiopian Spices", "Premium Cocoa"],
    allergens: ["Contains dairy", "May contain nuts"],
    nutritionPer100g: { calories: 520, fat: 32, carbs: 58, protein: 6, fiber: 4 }
  },
  {
    id: "dubai-kunafa",
    name: "Dubai Chocolate - Kunafa",
    category: "Chocolates",
    price: "ETB 1,500",
    description: "Dubai chocolate with Kunafa flavor",
    longDescription: "Luxurious Dubai chocolate with traditional Middle Eastern Kunafa flavors.",
    quantity: "1 piece",
    images: ["/products/muhany dubai kunafa beu.jpg"],
    inStock: true,
    stockCount: 25,
    rating: 4.7,
    reviews: 35,
    ingredients: ["Chocolate", "Kunafa", "Premium Cocoa"],
    allergens: ["Contains dairy", "Contains nuts"],
    nutritionPer100g: { calories: 540, fat: 35, carbs: 55, protein: 7, fiber: 3 }
  },
  {
    id: "dubai-oreo",
    name: "Dubai Chocolate - Oreo",
    category: "Chocolates",
    price: "ETB 1,500",
    description: "Dubai chocolate with Oreo flavor",
    longDescription: "Delicious Dubai chocolate combined with classic Oreo cookie flavors.",
    quantity: "1 piece",
    images: ["/products/muhany dubai oreo beu.jpg"],
    inStock: true,
    stockCount: 40,
    rating: 4.9,
    reviews: 58,
    ingredients: ["Chocolate", "Oreo Cookies", "Premium Cocoa"],
    allergens: ["Contains dairy", "Contains wheat"],
    nutritionPer100g: { calories: 480, fat: 28, carbs: 52, protein: 5, fiber: 2 }
  },
  {
    id: "dubai-nutella",
    name: "Dubai Chocolate - Nutella",
    category: "Chocolates",
    price: "ETB 1,500",
    description: "Dubai chocolate with Nutella flavor",
    longDescription: "Rich Dubai chocolate infused with creamy Nutella hazelnut spread.",
    quantity: "1 piece",
    images: ["/products/muhany dubai nutella beu.jpg"],
    inStock: true,
    stockCount: 35,
    rating: 4.8,
    reviews: 47,
    ingredients: ["Chocolate", "Nutella", "Hazelnuts", "Premium Cocoa"],
    allergens: ["Contains dairy", "Contains nuts"],
    nutritionPer100g: { calories: 560, fat: 38, carbs: 48, protein: 8, fiber: 4 }
  },
  {
    id: "dubai-cotton",
    name: "Dubai Chocolate - Cotton Candy",
    category: "Chocolates",
    price: "ETB 1,500",
    description: "Dubai chocolate with Cotton Candy flavor",
    longDescription: "Unique Dubai chocolate with sweet cotton candy flavors for a magical experience.",
    quantity: "1 piece",
    images: ["/products/muhany dubai cotton beu.jpg"],
    inStock: true,
    stockCount: 20,
    rating: 4.6,
    reviews: 28,
    ingredients: ["Chocolate", "Cotton Candy", "Premium Cocoa"],
    allergens: ["Contains dairy"],
    nutritionPer100g: { calories: 450, fat: 25, carbs: 55, protein: 4, fiber: 2 }
  },
  {
    id: "dubai-caramel",
    name: "Dubai Chocolate - Caramel",
    category: "Chocolates",
    price: "ETB 1,500",
    description: "Dubai chocolate with Caramel flavor",
    longDescription: "Smooth Dubai chocolate with rich caramel flavors for a decadent treat.",
    quantity: "1 piece",
    images: ["/products/muhany dubai caramel beu.jpg"],
    inStock: true,
    stockCount: 30,
    rating: 4.7,
    reviews: 39,
    ingredients: ["Chocolate", "Caramel", "Premium Cocoa"],
    allergens: ["Contains dairy"],
    nutritionPer100g: { calories: 490, fat: 30, carbs: 50, protein: 5, fiber: 3 }
  }
];

// Legacy products array for backward compatibility
export const products = muhanyProducts.map(p => ({ name: p.name, image: p.images[0] }));

// Product categories
export const productCategories = [
  "Minis",
  "Chocolates",
  "Collections",
  "Ferrero",
  "Chocolate Pops",
  "Towers",
  "Tortas",
  "Additional Items",
  "Cupcakes & Cookies",
  "Tarts"
];

// Product subcategories
export const productSubcategories = {
  "Minis": ["Cake Balls", "Donuts", "Brownies", "Tarts", "Traditional"],
  "Chocolates": ["Dubai Collection", "Truffles", "Choco Dates", "Delicate Collection"],
  "Collections": ["Truffles", "Choco Dates", "Delicate Collection", "Love in Every Bite"],
  "Ferrero": ["Big", "Medium", "Small"],
  "Chocolate Pops": ["Various Types"],
  "Towers": ["Cake Ball Tower", "Donut Tower"],
  "Tortas": ["Chocolate", "Vanilla", "Cheesecake"],
  "Additional Items": ["Arabic Coffee", "Chocolate Chips", "Cocoa Powder"],
  "Cupcakes & Cookies": ["Simple Cupcakes", "Special Cupcakes"],
  "Tarts": ["Big Chocolate Tart"]
}; 