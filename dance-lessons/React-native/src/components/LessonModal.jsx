import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useSelector } from 'react-redux';
import Tutorial from '../components/Tutorial';
import StartVideo from '../components/StartVideo';
import { THEME } from '../theme';
import AppLoader from '../components/AppLoader';
import { selectLessonById } from '../screens/Lessons/lessonsSlice';

const LessonModal = ({ title, id, type = 'tutorial', goBack }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const lesson = useSelector(selectLessonById(id));

  const handleClose = () => {
    Alert.alert(
      'Уже сдаешься?',
      'Вы действительно хотите закрыть?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Закрыть',
          onPress: () => setModalVisible(!modalVisible),
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {type === 'start' ? (
                <StartVideo lesson={lesson} goBack={setModalVisible} />
              ) : (
                <Tutorial lesson={lesson} />
              )}
            </Text>

            <TouchableHighlight style={{ ...styles.openButton }} onPress={handleClose}>
              <Text style={styles.textStyle}>Закрыть {type} </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    justifyContent: 'space-between',
    height: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    padding: 10,
    elevation: 2,
    backgroundColor: THEME.ORANGE_COLOR,
    borderRadius: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default LessonModal;
