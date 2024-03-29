import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerTitle: 'Update your profile',
  //     headerStyle: {
  //       backgroundColor: '#FF5846',
  //     },
  //     headerTitleStyle: { color: 'white' },
  //   });
  // }, []);

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job,
      age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={tw`flex-1 items-center pt-1`}>
      <Image
        style={tw`h-20 w-full`}
        resizeMode="contain"
        source={{ uri: 'https://links.papareact.com/2pf' }}
      />

      <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage} // (text) => setImage(text)
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter a Profile Pic URL"
      />

      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob} // (text) => setJob(text)
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter your occupation"
      />

      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Step 3: The Age
      </Text>
      <TextInput
        maxLength={2}
        value={age}
        onChangeText={setAge} // (text) => setAge(text)
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter your age"
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={updateUserProfile}
        disabled={incompleteForm}
        style={[
          tw`w-64 p-3 rounded-xl absolute bottom-10 bg-red-400`,
          incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`,
        ]}
      >
        <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
