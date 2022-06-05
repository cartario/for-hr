import React, { useState } from 'react';
import { Text, Button, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { RegisterResolver as resolver } from '../utils/validate';

const RegisterScreen = ({ navigation }) => {
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
        <Button title="вернуться назад" onPress={() => navigation.goBack()} />
      </View>

      <Text style={header}>Создать аккаунт</Text>

      <View style={section}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.email ? Object.assign({}, input, styles.inputError) : input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text style={styles.textInputError}>Заполните e-mail</Text>}
      </View>

      <View style={section}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.username ? Object.assign({}, input, styles.inputError) : input}
              placeholder="username"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.username && <Text style={styles.textInputError}>Заполните имя</Text>}
      </View>

      <View style={section}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.password ? Object.assign({}, input, styles.inputError) : input}
              placeholder="Пароль"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.textInputError}>Заполните пароль не менее 6 символов</Text>
        )}
      </View>

      <View style={section}>
        <Controller
          control={control}
          name="confirm"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={errors.confirm ? Object.assign({}, input, styles.inputError) : input}
              placeholder="Пароль еще раз"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.confirm && <Text style={styles.textInputError}>{errors.confirm.message}</Text>}
      </View>

      <TouchableOpacity style={btn} activeOpacity={0.7} onPress={handleSubmit(onSubmit)}>
        <Text style={btnText}>Зарегистрироваться</Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.registerText}>Забыли пароль?</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
