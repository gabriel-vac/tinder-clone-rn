import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   // Its just like an useEffet but when the component paint on the screen
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, [navigation]);

  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
        // source={{ uri: 'https://tinder.com/static/tinder.png' }}
        // eslint-disable-next-line global-require
        source={require('../assets/tinder.png')}
      >
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[
            tw`absolute bottom-40 w-52 bg-white p-4 rounded-2xl`,
            { marginHorizontal: '25%' },
          ]}
        >
          <Text style={tw`text-center font-semibold text-lg`}>
            Sign In and get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
