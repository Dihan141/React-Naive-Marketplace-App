import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

export default function Header() {
    const { user } = useUser()
  return (
    <View>
        <View className='flex flex-row gap-2 items-center'>
            <Image source={{uri: user?.imageUrl}} 
                className='w-12 h-12 rounded-full'
            />

            <View>
                <Text className='text-[16px]'>Welcome</Text>
                <Text className='text-[20px] font-bold'>{user?.fullName}</Text>   
            </View>
        </View>

        <View className='rounded-full p-2 bg-white mt-5 px-5 flex flex-row items-center'>
            <Ionicons name='search' size={24} color='gray' />
            <TextInput className='ml-2' placeholder='Search' />
        </View>
    </View>
  )
}