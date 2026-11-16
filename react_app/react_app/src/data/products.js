// import cake1 from '../assets/cakes/cake_1.jpg';
// import cake2 from '../assets/cakes/cake_2.jpg';
// import cake3 from '../assets/cakes/cake_3.jpg';
// import cake4 from '../assets/cakes/cake_4.jpg';
// import cake5 from '../assets/cakes/cake_5.jpg';
// import cake6 from '../assets/cakes/cake_6.jpg';
// import cake7 from '../assets/cakes/cake_7.jpg';
// import cake8 from '../assets/cakes/cake_8.jpg';
// import cake9 from '../assets/cakes/cake_9.jpg';
// import cake10 from '../assets/cakes/cake_10.jpg';
// import cake11 from '../assets/cakes/cake_11.jpg';
// import cake12 from '../assets/cakes/cake_12.jpg';

// // This file simulates a data layer. Every function returns a Promise so the
// // rest of the app already behaves the way it will once these are swapped
// // for real `fetch()` calls to a backend (see comments in each function).

// export const PRODUCTS = [
//   {
//     id: 'cake-1',
//     name: 'Midnight Drip Stack',
//     tagline: 'Dark chocolate sponge, salted caramel drip',
//     description:
//       "Three layers of dark chocolate sponge soaked in espresso syrup, filled with salted caramel buttercream, and finished with a slow chocolate drip, gold dragees, and chocolate shards. The one to order when you want the table to go quiet for a second.",
//     price: 32.0,
//     category: 'chocolate',
//     tags: ['bestseller', 'celebration'],
//     image: cake1,
//     rating: 4.9,
//     reviewCount: 214,
//     stock: 14,
//   },
//   {
//     id: 'cake-2',
//     name: 'Sprinkle Lagoon',
//     tagline: 'Vanilla bean cake, teal frosting, rainbow sprinkles',
//     description:
//       'A bright vanilla bean sponge wrapped in silky vanilla buttercream, crowned with a teal frosting pool and a hard candy shell drip. Sprinkles run the whole way round the base. Built for birthdays that want to be seen.',
//     price: 28.0,
//     category: 'vanilla',
//     tags: ['birthday', 'kids-favorite'],
//     image: cake2,
//     rating: 4.7,
//     reviewCount: 158,
//     stock: 20,
//   },
//   {
//     id: 'cake-3',
//     name: 'Classic Black Forest',
//     tagline: 'Chocolate sponge, kirsch cherries, whipped cream',
//     description:
//       'The original. Two tiers of cocoa sponge brushed with kirsch, layered with whipped cream and black cherries, topped with more cream rosettes and a crown of cherries. Old-school, and unapologetic about it.',
//     price: 30.0,
//     category: 'fruit',
//     tags: ['classic'],
//     image: cake3,
//     rating: 4.8,
//     reviewCount: 301,
//     stock: 11,
//   },
//   {
//     id: 'cake-4',
//     name: 'Cookies & Cream Crash',
//     tagline: 'Cocoa sponge, cookie crumble, whole cookies on top',
//     description:
//       'Chocolate cake layered with cookies-and-cream filling, coated in crushed cookie crumbs, and finished with a chocolate drip and a ring of whole sandwich cookies standing guard on top. For people who eat dessert first.',
//     price: 31.0,
//     category: 'chocolate',
//     tags: ['bestseller'],
//     image: cake4,
//     rating: 4.9,
//     reviewCount: 267,
//     stock: 9,
//   },
//   {
//     id: 'cake-5',
//     name: 'Garden Party Chocolate',
//     tagline: 'Rich cocoa cake, buttercream florals',
//     description:
//       'A dense, fudgy chocolate cake piped with a hand-built garden of pink, yellow, and green buttercream flowers across the top edge. Quietly the most requested cake for anniversaries on our list.',
//     price: 29.0,
//     category: 'chocolate',
//     tags: ['anniversary'],
//     image: cake5,
//     rating: 4.8,
//     reviewCount: 132,
//     stock: 16,
//   },
//   {
//     id: 'cake-6',
//     name: 'Blush Rosette',
//     tagline: 'Pink ombre buttercream, gold sprinkle base',
//     description:
//       'Soft pink buttercream piped into a crown of rosettes around the top, fading into a clean white body ringed with a confetti of pastel and gold sprinkles. Elegant without trying hard.',
//     price: 27.0,
//     category: 'vanilla',
//     tags: ['birthday', 'bestseller'],
//     image: cake6,
//     rating: 4.9,
//     reviewCount: 198,
//     stock: 18,
//   },
//   {
//     id: 'cake-7',
//     name: 'Citrus & Cocoa Drip',
//     tagline: 'Lemon-curd center, dark chocolate shell',
//     description:
//       'A bright lemon curd core hidden inside a moist vanilla base, glazed in dark chocolate ganache and topped with chocolate donuts, wafer rounds, and a scatter of nuts. Sweet with a sharp little surprise in the middle.',
//     price: 33.0,
//     category: 'specialty',
//     tags: ['new'],
//     image: cake7,
//     rating: 4.6,
//     reviewCount: 74,
//     stock: 12,
//   },
//   {
//     id: 'cake-8',
//     name: "Baker's Rosette Bouquet",
//     tagline: 'Milk chocolate florals, "Happy Birthday" script',
//     description:
//       'A full bouquet of milk and dark chocolate buttercream roses piped across the top, with a chocolate drip running down the sides and a handwritten "Happy Birthday" in dark cocoa. Built to be the centerpiece.',
//     price: 34.0,
//     category: 'chocolate',
//     tags: ['celebration', 'bestseller'],
//     image: cake8,
//     rating: 4.9,
//     reviewCount: 245,
//     stock: 10,
//   },
//   {
//     id: 'cake-9',
//     name: 'Blackberry Drip',
//     tagline: 'Mixed-berry glaze, white chocolate discs',
//     description:
//       'A pale vanilla cake bathed in a deep blackberry glaze, ringed with whipped cream rosettes and topped with fresh blackberries and hand-painted white chocolate discs. Tart, floral, and a little dramatic.',
//     price: 30.0,
//     category: 'fruit',
//     tags: ['seasonal'],
//     image: cake9,
//     rating: 4.7,
//     reviewCount: 91,
//     stock: 13,
//   },
//   {
//     id: 'cake-10',
//     name: 'Harvest Tier',
//     tagline: 'Three-tier naked cake, fresh fruit & edible flowers',
//     description:
//       'Three semi-naked tiers stacked tall and dressed almost entirely in fresh fruit, berries, and edible flowers cascading down one side. The cake for weddings and milestone birthdays that want a "wow" at first sight.',
//     price: 145.0,
//     category: 'specialty',
//     tags: ['wedding', 'tiered'],
//     image: cake10,
//     rating: 5.0,
//     reviewCount: 38,
//     stock: 5,
//   },
//   {
//     id: 'cake-11',
//     name: 'Cherry Noir',
//     tagline: 'Glossy dark chocolate shell, fresh cherries, red ribbon',
//     description:
//       'A deep, glossy dark chocolate mirror glaze over chocolate sponge, scattered with shaved chocolate curls and fresh cherries, finished with a red satin ribbon tied around the base. Dramatic, a little gothic, completely delicious.',
//     price: 36.0,
//     category: 'chocolate',
//     tags: ['celebration'],
//     image: cake11,
//     rating: 4.9,
//     reviewCount: 176,
//     stock: 8,
//   },
//   {
//     id: 'cake-12',
//     name: 'Golden Hour Drip',
//     tagline: 'Chocolate sponge, gold leaf accents, festive toppers',
//     description:
//       'Chocolate cake finished with a glossy drip, gold-dusted chocolates, macarons, and a "Happy Birthday" topper on a bed of fresh greenery. The cake that photographs as well as it tastes.',
//     price: 32.0,
//     category: 'chocolate',
//     tags: ['birthday', 'bestseller'],
//     image: cake12,
//     rating: 4.8,
//     reviewCount: 220,
//     stock: 15,
//   },
// ];

// const SIMULATED_LATENCY_MS = 250;

// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// /**
//  * Fetch all products.
//  * SWAP LATER: replace body with
//  *   const res = await fetch('/api/products');
//  *   if (!res.ok) throw new Error('Failed to load products');
//  *   return res.json();
//  */
// export async function fetchProducts() {
//   await delay(SIMULATED_LATENCY_MS);
//   return PRODUCTS;
// }

// /**
//  * Fetch a single product by id.
//  * SWAP LATER: replace body with
//  *   const res = await fetch(`/api/products/${id}`);
//  *   if (!res.ok) throw new Error('Product not found');
//  *   return res.json();
//  */
// export async function fetchProductById(id) {
//   await delay(SIMULATED_LATENCY_MS);
//   const product = PRODUCTS.find((p) => p.id === id);
//   if (!product) {
//     throw new Error('Product not found');
//   }
//   return product;
// }

// const BASE_URL='https://cake-website-backend.onrender.com/api/v1';

const BASE_URL=import.meta.env.VITE_API_URL;

export async function fetchproducts(){
  const res=await fetch(`${BASE_URL}/products/`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function fetchproductById(id){
  const res=await fetch(`${BASE_URL}/products/${id}/`);
  if (!res.ok) throw new Error('products not found.');
  return res.json();
}


export const CATEGORIES = [
  { id: 'all', label: 'All cakes' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'vanilla', label: 'Vanilla' },
  { id: 'fruit', label: 'Fruit' },
  { id: 'specialty', label: 'Specialty' },
];

