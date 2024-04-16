import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig'
import { getFirestore, collection, query, getDocs, addDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo'

export default function AddPostScreen() {
    const db = getFirestore(app)
    const storage = getStorage()
    const { user } = useUser()
    const [categoryList, setCategoryList] = useState([])
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const getCategories = async () => {
      setCategoryList([])
        const queryString = query(collection(db, 'Category'))

        const querySnapshot = await getDocs(queryString)
        
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setCategoryList(categoryList => [...categoryList, doc.data()])
        })
    }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }

    const onFormSubmit = async (values) => {
      setLoading(true)
      const response = await fetch(image)
      const blob = await response.blob()
      const storageRef = ref(storage, 'posts/' + Date.now() + '.jpg')

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!')
      }).then((response) => {
        getDownloadURL(storageRef).then( async (url) => {
          console.log(url)
          values.image = url
          values.userId = user.id
          values.userName = user.fullName
          values.userEmail = user.primaryEmailAddress.emailAddress
          const docRef = await addDoc(collection(db, 'Posts'), values)

          if(docRef){
            setLoading(false)
            Alert.alert('Success!', 'Your post has been added successfully')
            console.log("Document added")
          }
        })
      })
    }

    const inputValidation = (values) => {
      errors = {}
      if(!values.title){
        ToastAndroid.show('Title must be present', ToastAndroid.SHORT)
        errors.name = 'Title must be present'
      }

      if(!values.price){
        ToastAndroid.show('Price must be present', ToastAndroid.SHORT)
        errors.price = 'Price must be present'
      }
      
      return errors
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
        onSubmit={value => onFormSubmit(value)}
        validate={values => inputValidation(values)}
      >
        {({handleSubmit, handleBlur, handleChange, values, setFieldValue}) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image? 
                <Image source={{uri: image}} 
                  className="h-[100px] w-[100px] ml-[-10px] rounded-[10px]"
                />:
                <Image source={require('./../../assets/Images/img-placeholder.png')} 
                  className="h-[100px] w-[100px] ml-[-10px]"
                />
              }
            </TouchableOpacity>

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
            <View className="border rounded-[10px] w-full mt-2 mb-3 text-[15px]">
              <Picker
                selectedValue={values?.category}
                onValueChange={item => setFieldValue('category', item)}
              >
                {categoryList && categoryList.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name}/>
                ))}
              </Picker>
            </View>
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
              disabled={loading}
            >
              {loading? 
                <ActivityIndicator color='#fff' />
                : 
                <Text className="text-white text-center">Submit</Text>
              }
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
