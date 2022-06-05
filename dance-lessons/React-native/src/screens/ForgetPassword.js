import React, { useState } from 'react';
import { Text, Button, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { THEME } from '../theme';

const ForgetPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const { center, header, section, input, btn, btnText } = styles;
  const form = { username, email, password, confirm };

  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log(form);
  };

  return (
    <View style={center}>
      <View style={styles.btnBack}>
        <Button title="вернуться назад" onPress={() => navigation.goBack()} />
      </View>

      <Text style={header}>Забыли пароль?</Text>

      <View style={section}>
        <TextInput style={input} placeholder="Email" value={email} onChangeText={setEmail} />
      </View>

      <TouchableOpacity style={btn} activeOpacity={0.7} onPress={onSubmit}>
        <Text style={btnText}>Восстановить</Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Войти</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 35,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  btn: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'orange',
    borderRadius: 30,
  },
  btnText: {
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  registerText: {
    marginVertical: 15,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: 'blue',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  btnBack: {
    marginBottom: 30,
  },
});
