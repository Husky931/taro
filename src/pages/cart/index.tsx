import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import * as cart from '../../store/cart'
import './index.css'

export default function Cart () {
  const items = cart.useCart()
  const total = cart.totalPrice()

  if (items.length === 0) {
    return (
      <View className='empty'>
        <Text className='empty-emoji'>🛒</Text>
        <Text className='empty-text'>Your cart is empty</Text>
        <Button className='empty-btn' onClick={() => Taro.switchTab({ url: '/pages/index/index' })}>
          Browse products
        </Button>
      </View>
    )
  }

  const checkout = () => {
    Taro.navigateTo({ url: '/pages/checkout/index' })
  }

  return (
    <View className='cart'>
      <View className='list'>
        {items.map((item) => (
          <View key={item.id} className='row'>
            <Text className='row-emoji'>{item.emoji}</Text>
            <View className='row-info'>
              <Text className='row-name'>{item.name}</Text>
              <Text className='row-price'>${item.price.toFixed(2)}</Text>
            </View>
            <View className='stepper'>
              <Text className='step-btn' onClick={() => cart.dec(item.id)}>−</Text>
              <Text className='step-qty'>{item.qty}</Text>
              <Text className='step-btn' onClick={() => cart.inc(item.id)}>＋</Text>
            </View>
          </View>
        ))}
      </View>

      <View className='footer'>
        <View className='total-row'>
          <Text className='total-label'>Total</Text>
          <Text className='total-value'>${total.toFixed(2)}</Text>
        </View>
        <Button className='checkout-btn' type='primary' onClick={checkout}>
          Checkout
        </Button>
      </View>
    </View>
  )
}
