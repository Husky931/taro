import Taro from '@tarojs/taro'
import { useSyncExternalStore } from 'react'
import { Product } from '../data/products'

export interface CartItem {
  id: number
  name: string
  emoji: string
  price: number
  qty: number
}

const STORAGE_KEY = 'cart'

// --- internal state ---------------------------------------------------------
let items: CartItem[] = loadFromStorage()
const listeners = new Set<() => void>()

function loadFromStorage (): CartItem[] {
  try {
    const saved = Taro.getStorageSync(STORAGE_KEY)
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function commit (next: CartItem[]) {
  items = next
  try {
    Taro.setStorageSync(STORAGE_KEY, items)
  } catch {
    // ignore storage errors
  }
  updateTabBadge()
  listeners.forEach((l) => l())
}

function updateTabBadge () {
  const count = totalQty()
  try {
    if (count > 0) {
      Taro.setTabBarBadge({ index: 1, text: String(count) })
    } else {
      Taro.removeTabBarBadge({ index: 1 })
    }
  } catch {
    // tabBar may not be ready yet; ignore
  }
}

// --- public API -------------------------------------------------------------
export function add (product: Product) {
  const existing = items.find((i) => i.id === product.id)
  if (existing) {
    commit(items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)))
  } else {
    commit([...items, {
      id: product.id,
      name: product.name,
      emoji: product.emoji,
      price: product.price,
      qty: 1
    }])
  }
}

export function inc (id: number) {
  commit(items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))
}

export function dec (id: number) {
  commit(
    items
      .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0)
  )
}

export function remove (id: number) {
  commit(items.filter((i) => i.id !== id))
}

export function clear () {
  commit([])
}

export function totalQty (): number {
  return items.reduce((sum, i) => sum + i.qty, 0)
}

export function totalPrice (): number {
  return items.reduce((sum, i) => sum + i.qty * i.price, 0)
}

export function getItems (): CartItem[] {
  return items
}

// --- React binding ----------------------------------------------------------
function subscribe (listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useCart (): CartItem[] {
  return useSyncExternalStore(subscribe, getItems, getItems)
}
