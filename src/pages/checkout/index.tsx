import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import * as cart from '../../store/cart'
import * as orders from '../../store/orders'
import { submitOrder } from '../../services/api'
import './index.css'

export default function Checkout () {
  const items = cart.useCart()
  const total = cart.totalPrice()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const placeOrder = async () => {
    if (!name.trim() || !address.trim()) {
      Taro.showToast({ title: 'Enter name & address', icon: 'none' })
      return
    }
    setSubmitting(true)
    try {
      const res = await submitOrder({
        items,
        total,
        customer: { name: name.trim(), address: address.trim() }
      })
      orders.addOrder({
        orderId: res.orderId,
        items,
        total,
        createdAt: res.createdAt
      })
      cart.clear()
      Taro.showToast({ title: 'Order placed!', icon: 'success' })
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/orders/index' })
      }, 800)
    } catch (err) {
      console.error(err)
      Taro.showToast({ title: 'Order failed', icon: 'none' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <View className='checkout'>
      <Text className='section-title'>Order summary</Text>
      <View className='summary'>
        {items.map((item) => (
          <View key={item.id} className='sum-row'>
            <Text className='sum-name'>{item.emoji} {item.name} × {item.qty}</Text>
            <Text className='sum-price'>${(item.price * item.qty).toFixed(2)}</Text>
          </View>
        ))}
        <View className='sum-row sum-total'>
          <Text>Total</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>
      </View>

      <Text className='section-title'>Shipping</Text>
      <View className='field'>
        <Text className='label'>Name</Text>
        <Input
          className='input'
          placeholder='Your name'
          value={name}
          onInput={(e) => setName(e.detail.value)}
        />
      </View>
      <View className='field'>
        <Text className='label'>Address</Text>
        <Input
          className='input'
          placeholder='Shipping address'
          value={address}
          onInput={(e) => setAddress(e.detail.value)}
        />
      </View>

      <Button
        className='place-btn'
        type='primary'
        loading={submitting}
        disabled={submitting}
        onClick={placeOrder}
      >
        {submitting ? 'Placing…' : `Place order · $${total.toFixed(2)}`}
      </Button>
    </View>
  )
}
