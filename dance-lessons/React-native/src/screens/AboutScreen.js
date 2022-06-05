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
import { useSelector, useDispatch } from 'react-redux';
import { THEME } from '../theme';

const AboutScreen = ({ navigation }) => {
  const [form, setForm] = React.useState('');
  // const { isLoaded } = useSelector(({ user }) => user);
  // const { isSuccessAdded } = useSelector(({ events }) => events); //по идее надо отдельный, но для быстроты использую этот

  const dispatch = useDispatch();

  // const isValid = form.length > 3;

  const handleSubmit = () => {
    // dispatch(Operations.postFeedback(form));
    setForm('');
  };

  return (
    <View style={styles.center}>
      <Button title="вернуться назад" onPress={() => navigation.goBack()} />
      <Text style={styles.header}>О приложении</Text>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Версия 1.0.0. </Text>
        <Text>https://kruti-verti-break.ru</Text>
      </View>

      {/* <Text style={{ ...styles.header, marginTop: 20 }}>Обратная связь</Text>
      <Button title="скрыть клавиатуру" onPress={() => Keyboard.dismiss()} />
      <TextInput
        style={styles.input}
        placeholder="введите текст(минимум 3 символа)"
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={64}
        defaultValue={form}
        onChangeText={setForm}
      />
      {isSuccessAdded && <Text style={styles.tost}>Успешно отправлено</Text>}
      <TouchableOpacity
        activeOpacity={0.7}
        style={isValid ? styles.btn : { ...styles.btn, backgroundColor: 'grey' }}
        onPress={handleSubmit}
        disabled={!isValid}
      >
        <Text style={{ color: '#fff' }}>{isLoaded ? 'Отправление...' : 'Отправить'}</Text>
      </TouchableOpacity> */}

      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginTop: 20 }}>Разработка и дизайн: </Text>
        <Text>Vasiliy Zaikov</Text>
        <Text>cartario@yandex.ru</Text>
      </View>
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
  btn: {
    alignItems: 'center',
    width: '70%',
    padding: 10,
    backgroundColor: THEME.MAIN_COLOR,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 20,
  },
});
