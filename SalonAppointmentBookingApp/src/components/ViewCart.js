import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ViewCart = () => {
  return (
    <View style={styles.viewCartContainer}>
      <View style={styles.viewCart}>
        <TouchableOpacity style={styles.viewCartBg}>
          <Text style={{color: 'white', fontSize: 20}}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  viewCartContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      position: "absolute",
      bottom: 10,
      zIndex: 999,
  },

  viewCart: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  viewCartBg: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'relative',
    width: 300,
  },
});
