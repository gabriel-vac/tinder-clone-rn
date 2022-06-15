import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/RecieverMessage';
import { db } from '../firebase';

const MessageScreen = () => {
  const { user } = useAuth();
  const router = useRoute();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const { matchDetails } = router.params;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'matches', matchDetails.id, 'messages'),
          orderBy('timestamp', 'asc')
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput('');
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        callEnabled
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw`pl-4`}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={messages.id} message={message} />
              ) : (
                <ReceiverMessage key={messages.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View
        style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}
      >
        <TextInput
          style={tw`h-10 text-lg`}
          placeholder="Send Message..."
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />
        <Button title="Send" color="#ff5864" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
