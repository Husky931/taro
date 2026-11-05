export interface Product {
  id: number
  name: string
  emoji: string
  price: number // in dollars
  desc: string
}

// In-app mock "backend". Step 5 will swap this for a real request.
export const products: Product[] = [
  { id: 1, name: 'Sneakers', emoji: '👟', price: 59.0, desc: 'Lightweight everyday sneakers.' },
  { id: 2, name: 'Backpack', emoji: '🎒', price: 42.5, desc: 'Water-resistant 20L backpack.' },
  { id: 3, name: 'Headphones', emoji: '🎧', price: 89.9, desc: 'Wireless over-ear headphones.' },
  { id: 4, name: 'Watch', emoji: '⌚', price: 129.0, desc: 'Minimal analog wristwatch.' },
  { id: 5, name: 'Sunglasses', emoji: '🕶️', price: 24.0, desc: 'UV400 polarized sunglasses.' },
  { id: 6, name: 'Camera', emoji: '📷', price: 215.0, desc: 'Compact mirrorless camera.' }
]

export function getProductById (id: number): Product | undefined {
  return products.find((p) => p.id === id)
}
