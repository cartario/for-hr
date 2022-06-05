import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {THEME} from '../theme';

const AppLoader = ({style, color}) => (
  <View style={{...styles.container, ...styles.horizontal, ...style}}>
    
    <ActivityIndicator size="large" color={color=THEME.MAIN_COLOR}/>
    
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default AppLoader;