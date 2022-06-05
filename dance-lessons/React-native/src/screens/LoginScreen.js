import React from 'react';
import { Text, Button, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { loginResolver as resolver } from '../utils/validate';

const LoginScreen = ({ navigation }) => {
  const { center, header, section, input, btn, btnText } = styles;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(resolver);

  const onSubmit = (data) => console.log(data);

  return (
    <View style={center}>
      <View style={styles.btnBack}>
        <Button title="на главную" onPress={() => navigation.goBack()} />
      </View>

      <Text style={header}>Войти в личный кабинет</Text>

      <View style={section}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.email ? Object.assign({}, input, styles.inputError) : input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        {errors.email && <Text style={styles.textInputError}>Заполните e-mail</Text>}
      </View>

      <View style={section}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.password ? Object.assign({}, input, styles.inputError) : input}
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.textInputError}>Заполните пароль не менее 6 симовлов</Text>
        )}
      </View>

      <TouchableOpacity style={btn} activeOpacity={0.7} onPress={handleSubmit(onSubmit)}>
        <Text style={btnText}>Войти</Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.registerText}>Забыли пароль?</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Создать аккаунт</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    width: '100%',
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
  inputError: {
    position: 'relative',
    borderColor: 'red',
  },
  textInputError: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: 16,
    fontSize: 10,
    color: 'red',
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
