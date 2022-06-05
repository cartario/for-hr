import React from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectLessons } from '../screens/Lessons/lessonsSlice';

const AboutScreen = ({ navigation }) => {
  const testData = useSelector(selectLessons);

  return (
    <View style={styles.center}>
      <Text style={{ marginTop: 20 }}>Разработка и дизайн: </Text>
      <Text>Vasiliy Zaikov</Text>
      <Text>cartario@yandex.ru</Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontFamily: 'open-bold',
  },
  tost: {
    width: '70%',
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
  },
  input: {
    width: '70%',
    height: 100,
    marginVertical: 10,
    padding: 20,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 20,
    color: 'black',
    backgroundColor: '#fff',
  },
  btn: {},
});
