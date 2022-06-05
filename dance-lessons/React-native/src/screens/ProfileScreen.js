import React from 'react';
import {
  Text,
  Button,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { THEME } from '../theme';
import { profileMock } from '../mock';

const ProfileScreen = ({ navigation }) => {
  const { avatarUrl, name, email, level, totalScore } = profileMock;

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: avatarUrl,
        }}
      />
      <Text style={styles.name}>{name}</Text>
      <Text>{email}</Text>
      <Text style={styles.level}>Уровень: {level}</Text>
      <Text style={styles.totalScore}>Общее количество очков: {totalScore}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  level: {
    marginTop: 30,
    fontWeight: 'bold',
  },
  totalScore: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});
