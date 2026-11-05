import Taro from '@tarojs/taro'
import { useSyncExternalStore } from 'react'
import { CartItem } from './cart'

export interface Order {
  orderId: string
  items: CartItem[]
  total: number
  createdAt: number
}

const STORAGE_KEY = 'orders'

let orders: Order[] = loadFromStorage()
const listeners = new Set<() => void>()

function loadFromStorage (): Order[] {
  try {
    const saved = Taro.getStorageSync(STORAGE_KEY)
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function commit (next: Order[]) {
  orders = next
  try {
    Taro.setStorageSync(STORAGE_KEY, orders)
  } catch {
    // ignore storage errors
  }
  listeners.forEach((l) => l())
}

export function addOrder (order: Order) {
  // newest first
  commit([order, ...orders])
}

export function getOrders (): Order[] {
  return orders
}

function subscribe (listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useOrders (): Order[] {
  return useSyncExternalStore(subscribe, getOrders, getOrders)
}
