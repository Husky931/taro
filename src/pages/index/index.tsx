import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'

export default function Index () {
  useLoad(() => {
    console.log('Home loaded.')
  })

  return (
    <View className='page'>
      <Text className='title'>🛍️ Home</Text>
      <Text className='subtitle'>Products will go here (Step 2)</Text>
    </View>
  )
}
