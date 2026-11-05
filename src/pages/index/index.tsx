import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { products, Product } from '../../data/products'
import './index.css'

export default function Index () {
  useLoad(() => {
    console.log('Home loaded.')
  })

  const goToDetail = (p: Product) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${p.id}` })
  }

  return (
    <View className='home'>
      <Text className='home-title'>🛍️ Shop</Text>
      <View className='grid'>
        {products.map((p) => (
          <View key={p.id} className='card' onClick={() => goToDetail(p)}>
            <Text className='card-emoji'>{p.emoji}</Text>
            <Text className='card-name'>{p.name}</Text>
            <Text className='card-price'>${p.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
