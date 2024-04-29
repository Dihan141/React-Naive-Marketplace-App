import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'

export default function HomeScreen() {
  return (
    <View className='p-8 ml-[-15px]'>
      <Header />
      <Slider />
    </View>
  )
}