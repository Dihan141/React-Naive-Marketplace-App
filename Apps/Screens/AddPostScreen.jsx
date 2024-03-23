import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { getFirestore, collection, query, getDocs } from 'firebase/firestore'

export default function AddPostScreen() {
    const db = getFirestore(app)
    const [categoryList, setCategoryList] = useState([])

    const getCategories = async () => {
        const queryString = query(collection(db, 'Category'))

        const querySnapshot = await getDocs(queryString)
        
        querySnapshot.forEach((doc) => {
            console.log(doc)
            console.log(doc.data())
            setCategoryList(categoryList => [...categoryList, doc.data])
        })
    }

    useEffect(() => {
        getCategories()
    }, [])
  return (
    <View>
      <Text>AddPostScreen</Text>
    </View>
  )
}