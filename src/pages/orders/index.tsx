import { View, Text } from '@tarojs/components'
import * as orders from '../../store/orders'
import './index.css'

function formatDate (ts: number): string {
  const d = new Date(ts)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function Orders () {
  const list = orders.useOrders()

  if (list.length === 0) {
    return (
      <View className='empty'>
        <Text className='empty-emoji'>📦</Text>
        <Text className='empty-text'>No orders yet</Text>
      </View>
    )
  }

  return (
    <View className='orders'>
      {list.map((order) => (
        <View key={order.orderId} className='order'>
          <View className='order-head'>
            <Text className='order-id'>{order.orderId}</Text>
            <Text className='order-status'>✓ Confirmed</Text>
          </View>
          <Text className='order-date'>{formatDate(order.createdAt)}</Text>
          <View className='order-items'>
            {order.items.map((item) => (
              <Text key={item.id} className='order-item'>
                {item.emoji} {item.name} × {item.qty}
              </Text>
            ))}
          </View>
          <View className='order-foot'>
            <Text className='order-total'>Total: ${order.total.toFixed(2)}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}
