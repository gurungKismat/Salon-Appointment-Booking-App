import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector ,useDispatch} from 'react-redux';

const ViewCart = () => {
  const cartItems = useSelector(state => state.service);
  const navigation = useNavigation();
  const viewCartPressed = () => {
    // alert("hello")
    navigation.navigate('ServiceList');
  };


  return (
    <>
      {cartItems.length > 0 ? (
        <View style={styles.viewCartContainer}>
          <View style={styles.viewCart}>
            <TouchableOpacity
              style={styles.viewCartBg}
              onPress={viewCartPressed}>
              <Text style={{color: 'white', fontSize: 20}}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  viewCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
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
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'relative',
    width: 300,
  },
});
