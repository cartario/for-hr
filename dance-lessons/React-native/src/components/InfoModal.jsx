import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {THEME} from '../theme';

const InfoModal = ({ visible, onCancel }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} style={styles.modal}>
      <View style={styles.center}>
      <TouchableHighlight
          onPress={() => {
            onCancel(false);
          }}
        >          
          <Ionicons name="close-circle" size={24} color={THEME.MAIN_COLOR} />
        </TouchableHighlight>
        <Text style={styles.header}>Как пользоваться приложением? </Text>
        <View style={styles.text}>
          <Text>
            1. Смотри туториал          
          </Text>
          <Text>           
            2. Жми start и повторяй движения          
          </Text>
          <Text>         
            3. Поставь  себе оценку, двигайся дальше.         
          </Text>
          <Text>          
            4.Удачи и процветания! У тебя все получится!
          </Text>   
        </View>              
      </View>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  modal: {
    padding: 15
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 42,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 24,
    color: THEME.ORANGE_COLOR
  },
  closeModal: {
    margin: 20,
    fontWeight: 'bold'
  },
  text: {
    textAlign: 'left'
  }
});
