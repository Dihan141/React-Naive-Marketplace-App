import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../../firebaseConfig'

const Slider = () => {
    const [slider, setSlider] = useState([])
    const db = getFirestore(app)
    const getSlider = async () => {
        setSlider([])
        const queryString = query(collection(db, 'Sliders'))

        const querySnapshot = await getDocs(queryString)
        
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setSlider(slider => [...slider, doc.data()])
        })
    }

    useEffect(()=>{
        console.log('Slider')
        getSlider()
    },[])
  return (
    <View className='mt-5'>
      <FlatList 
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, idx}) => (
            <View>
                <Image source={{uri: item?.image}} 
                    className='h-[200px] w-[300px] rounded-lg mr-3 object-contain'
                />
            </View>
        )}
      />
    </View>
  )
}

export default Slider