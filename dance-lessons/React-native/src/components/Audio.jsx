import React from 'react';
import { Button, View } from 'react-native';
import { Audio } from 'expo-av';

const audioUrls= [
  "https://res.cloudinary.com/dwhyb2a2q/video/upload/q_auto:low/v1612424251/music/Erik_B._and_Rakim_-_Dont_Sweat_The_Technique_p29fmc_dvjeiw.mp3",
  "https://res.cloudinary.com/dwhyb2a2q/video/upload/q_auto:low/v1612424286/music/attache_-_bassbin_ballerina_ynsug5_cmsayb.mp3",
  "https://res.cloudinary.com/dwhyb2a2q/video/upload/q_auto:low/v1612424229/music/Boogie_Down_Productions_-_Jack_of_Spades_krcwtc_wfb7u6.mp3",
  "https://res.cloudinary.com/dwhyb2a2q/video/upload/q_auto:low/v1612424286/music/Show_A.G._-_Next_Level_l2ejyr_unjq90.mp3",
  "https://res.cloudinary.com/dwhyb2a2q/video/upload/q_auto:low/v1612424346/music/Fdel_-_Get_Up_On_Ya_Feet_w0v4i5_zyn1ii.mp3"
];

const RANDOM_AUDIO_URL = audioUrls[Math.floor(Math.random() * audioUrls.length)];

const AppAudio = ({onReady}) => {
  const [sound, setSound] = React.useState();  

  const playSound = async () => {
    // console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: RANDOM_AUDIO_URL });
    setSound(sound);
    
    // console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    playSound();
  }, []);

  React.useEffect(() => {
    return sound
      ? () => {
          // console.log('Unloading Sound');
          sound.unloadAsync();
          
        }
      : undefined;
  }, [sound]);

  if(sound){
    // onReady(true)
  }

  return (
    <View>
      {/* <Button title="Play Sound" onPress={playSound} /> */}
    </View>
  );
};

export default AppAudio;
