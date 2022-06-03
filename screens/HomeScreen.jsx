import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import tw from 'twrnc';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import useAuth from '../hooks/useAuth';

const DUMMY_DATA = [
  {
    firstName: 'Sonny',
    lastName: 'Sangha',
    job: 'Software Developer',
    photoURL: 'https://avatars.githubusercontent.com/u/24712956?v=4',
    age: 27,
    id: 123,
  },
  {
    firstName: 'Elon',
    lastName: 'Musk',
    job: 'CEO',
    photoURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
    age: 40,
    id: 456,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swiperRef = useRef(null);

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`items-center flex-row justify-between px-5`}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image
            style={tw`h-14 w-14`}
            // eslint-disable-next-line global-require
            source={require('../assets/logo2.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          ref={swiperRef}
          containerStyle={{ backgroundColor: 'transparent' }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log('Swipe Pass');
          }}
          onSwipedRight={() => {
            console.log('Swipe MATCH');
          }}
          backgroundColor="#4FD0E9"
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  textAlign: 'left',
                  color: '#4DED30',
                },
              },
            },
          }}
          renderCard={(card) => (
            <View key={card.id} style={tw`bg-white h-3/4 rounded-xl relative`}>
              <Image
                style={tw`h-full w-full rounded-xl absolute`}
                source={{ uri: card.photoURL }}
              />

              <View
                style={tw`absolute bottom-0 bg-white w-full h-20 flex-row justify-between items-center px-6 py-2 rounded-b-xl shadow-xl`}
              >
                <View>
                  <Text style={tw`text-xl font-bold`}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={tw`flex flex-row justify-evenly`}>
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeLeft()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}
        >
          <Entypo name="cross" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swiperRef.current.swipeRight()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}
        >
          <AntDesign name="heart" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
