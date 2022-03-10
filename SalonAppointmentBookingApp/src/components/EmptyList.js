import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const EmptyList = (props) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/68796-empty-search.json')}
        style={styles.emptyAnimation}
        speed={1}
        loop={true}
        autoPlay={true}
      />
      <Text style={styles.textStyle}>{props.message}</Text>
    </View>
  );
};

// No Services Added

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
  },

  emptyAnimation: {
    width: 180,
    height: 180,
  },

  textStyle: {
    fontSize: 19,
    color: 'black',
    marginTop: 10,
  },
});
