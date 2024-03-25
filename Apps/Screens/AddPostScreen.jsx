import { View, Text, TextInput, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { getFirestore, collection, query, getDocs } from 'firebase/firestore'
import { Formik } from 'formik'

export default function AddPostScreen() {
    const db = getFirestore(app)
    const [categoryList, setCategoryList] = useState([])

    const getCategories = async () => {
      setCategoryList([])
        const queryString = query(collection(db, 'Category'))

        const querySnapshot = await getDocs(queryString)
        
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setCategoryList(categoryList => [...categoryList, doc.data])
        })
    }

    useEffect(() => {
        getCategories()
    }, [])
  return (
    <View className="p-10">
      <View>
        <Text className="text-[27px] font-bold">Add New Item</Text>
        <Text className="text-gray-500 mb-5">Add new item and start selling</Text>
      </View>
      <Formik
        initialValues={{title:'', desc:'', category:'', address:'', price:'', image:''}}
        onSubmit={value=>console.log(value)}
      >
        {({handleSubmit, handleBlur, handleChange, values}) => (
          <View>
            <TextInput 
              placeholder='Title' 
              className="border rounded-[10px] w-full p-3 mt-2 mb-3"
              value={values?.title}
              onChangeText={handleChange('title')}
            />
            <TextInput 
              placeholder='Description' 
              className="border rounded-[10px] w-full p-3 mt-2 mb-3"
              style={styles.input}
              value={values?.desc}
              numberOfLines={5}
              onChangeText={handleChange('desc')}
            />
            <TextInput 
              placeholder='Address' 
              className="border rounded-[10px] w-full p-3 mt-2 mb-3"
              value={values?.address}
              onChangeText={handleChange('address')}
            />
            <TextInput 
              placeholder='Price' 
              className="border rounded-[10px] w-full p-3 mt-2 mb-3"
              value={values?.price}
              keyboardType='number-pad'
              onChangeText={handleChange('price')}
            />

            <TouchableOpacity 
              onPress={handleSubmit}
              className="bg-blue-500 p-4 mt-5 rounded-full"
            >
              <Text className="text-white text-center">Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    textAlignVertical:'top'
  }
})
