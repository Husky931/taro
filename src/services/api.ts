import { CartItem } from '../store/cart'

export interface OrderPayload {
  items: CartItem[]
  total: number
  customer: {
    name: string
    address: string
  }
}

export interface OrderResponse {
  orderId: string
  status: 'confirmed'
  createdAt: number
}

// Fake "backend". This simulates a network round-trip with a delay.
// Step 5 will replace the body with a real Taro.request() call —
// the signature (payload in, Promise<OrderResponse> out) stays the same.
export function submitOrder (payload: OrderPayload): Promise<OrderResponse> {
  console.log('[api] submitOrder ->', payload)
  return new Promise((resolve) => {
    setTimeout(() => {
      const res: OrderResponse = {
        orderId: 'ORD' + Date.now(),
        status: 'confirmed',
        createdAt: Date.now()
      }
      console.log('[api] submitOrder <-', res)
      resolve(res)
    }, 700)
  })
}
