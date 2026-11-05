import { View, Text, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { getProductById } from '../../data/products'
import * as cart from '../../store/cart'
import './index.css'

export default function Detail () {
  const router = useRouter()
  const id = Number(router.params.id)
  const product = getProductById(id)

  if (!product) {
    return (
      <View className='detail'>
        <Text>Product not found.</Text>
      </View>
    )
  }

  const addToCart = () => {
    cart.add(product)
    Taro.showToast({ title: 'Added to cart', icon: 'success' })
  }

  return (
    <View className='detail'>
      <View className='hero'>
        <Text className='hero-emoji'>{product.emoji}</Text>
      </View>
      <Text className='name'>{product.name}</Text>
      <Text className='price'>${product.price.toFixed(2)}</Text>
      <Text className='desc'>{product.desc}</Text>
      <Button className='add-btn' type='primary' onClick={addToCart}>
        Add to cart
      </Button>
    </View>
  )
}
