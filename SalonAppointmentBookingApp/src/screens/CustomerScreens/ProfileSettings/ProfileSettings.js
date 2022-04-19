// import React from "react";
// import {View, Text} from "react-native";

// const CustomerProfileSettings = () => {
//     return (
//         <View>
//             <Text style={{color: "black"}}>Customer Profiel Settings</Text>
//         </View>
//     )
// }

// export default CustomerProfileSettings;

import React, {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  StatusBar,
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  ScrollView,
  HStack,
  Text,
  WarningOutlineIcon,
  useToast,
} from 'native-base';
import AnimatedLoader from 'react-native-animated-loader';

const ProfileSettings = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [loadAnimation, setLoadAnimation] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const [mobileNo, setMobileNo] = useState('');
  const [about, setAbout] = useState('');

  const [customerNameError, setCustomerNameError] = useState({
    error: '',
    isError: false,
  });

  const [mobileNoError, setMobileNoError] = useState({
    error: '',
    isError: false,
  });
  const [aboutError, setAboutError] = useState({
    error: '',
    isError: false,
  });

  const toast = useToast();
  const id = 'test-toast';

  var newMobileNo;
  var newCustomerName;
  var newAbout;

  // display loading animation
  function toggleLoading(value) {
    // console.log('animation visible');
    setLoadAnimation(value);
  }

  // validate data
  function validateForm() {
    let error = 0;

    if (newCustomerName.length === 0) {
      // console.log('null');
      error += 1;
      const updated = {
        error: 'Require',
        isError: true,
      };
      setCustomerNameError({
        ...customerNameError,
        ...updated,
      });
      // console.log('username error' + JSON.stringify(userNameError));
    } else if (newCustomerName.length < 3 || newCustomerName.length > 20) {
      // console.log('short');
      error += 1;

      const updated = {
        error: 'Name should at least contain 3 character',
        isError: true,
      };
      setCustomerNameError({
        ...customerNameError,
        ...updated,
      });
    } else {
      const updated = {
        error: '',
        isError: false,
      };
      setCustomerNameError({
        ...customerNameError,
        ...updated,
      });
    }

    if (newMobileNo.length === 0) {
      console.log('null mobile');
      error += 1;

      const updatedValue = {
        error: 'Require',
        isError: true,
      };

      setMobileNoError({
        ...mobileNoError,
        ...updatedValue,
      });
    } else if (newMobileNo.length !== 10 || isNaN(newMobileNo)) {
      console.log('length incorrect');
      error += 1;

      const updatedValue = {
        error: 'Provide 10 digits in numerical form',
        isError: true,
      };

      setMobileNoError({
        ...mobileNoError,
        ...updatedValue,
      });
    } else {
      console.log('no error');

      const updatedValue = {
        error: '',
        isError: false,
      };

      setMobileNoError({
        ...mobileNoError,
        ...updatedValue,
      });
    }

    if (newAbout.length === 0) {
      console.log('about null');

      error += 1;
      const updatedValue = {
        error: 'Require',
        isError: true,
      };

      setAboutError({
        ...aboutError,
        ...updatedValue,
      });
    } else {
      const updatedValue = {
        error: '',
        isError: false,
      };

      setAboutError({
        ...aboutError,
        ...updatedValue,
      });
    }

    if (error === 0) {
      console.log('all good');
      console.log('error val: ' + error);
      toggleLoading(true);
      return true;
    } else {
      console.log('all wrong');
      return false;
    }
  }

  function removeWhiteSpace() {
    newMobileNo = mobileNo.trim();
    newCustomerName = customerName.trim();
    newAbout = about.trim();
  }

  // display toast after updating customer info
  const displayToast = () => {
    if (!toast.isActive(id)) {
      toast.show({
        id,
        title: 'Profile Updated',
        placement: 'top',
      });
    }
  };

  // add new customer
  const updateSalonProfile = () => {
    removeWhiteSpace();
    let success = validateForm();
    if (success) {
      removeWhiteSpace();
      firestore()
        .collection('customers')
        .doc(auth().currentUser.uid)
        .update({
          mobileNo: newMobileNo,
          name: newCustomerName,
          about: newAbout,
        })
        .then(() => {
          console.log('User updated!');
          toggleLoading(false);
          // display toast after adding new service
          displayToast();
        })
        .catch(error => {
          console.error(error);
          toggleLoading(false);
          displayToast();
        });
    }
  };

  // clears the text from the input field
  const clearText = () => {
    setCustomerName('');
    setMobileNo('');
    setAbout('');
    setCustomerNameError({isError: false});
    // setAddressError({isError: false});
    setMobileNoError({isError: false});
    setAboutError({isError: false});
  };

  useEffect(() => {
    // console.log('params: ' + JSON.stringify(route.params));

    const paramsDatas = route.params;
    setCustomerName(paramsDatas.name);
    setMobileNo(paramsDatas.mobileNo);
    if (paramsDatas.about !== undefined) {
      setAbout(paramsDatas.about);
    }

    if (loading) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ScrollView bg="coolGray.50">
      <StatusBar backgroundColor={'#6366f1'} />
      <Center w="100%">
        <AnimatedLoader
          visible={loadAnimation}
          overlayColor="rgba(255,255,255,0.75)"
          //   source={require('../../assets/50124-user-profile.json')}
          source={require('../../../assets/50124-user-profile.json')}
          animationStyle={{width: 120, height: 120}}
          speed={1}>
          <Text color="black">Updating Salon Profile...</Text>
        </AnimatedLoader>
        <Box safeArea px="7" w="100%">
          <VStack space={4} mt="5">
            {customerNameError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Customer Name</FormControl.Label>
                <Input
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="Customer Name"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {customerNameError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Customer Name</FormControl.Label>
                <Input
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="Customer Name"
                />
              </FormControl>
            )}

            {mobileNoError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Mobile Number</FormControl.Label>
                <Input
                  value={mobileNo}
                  onChangeText={setMobileNo}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {mobileNoError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Mobile Number</FormControl.Label>
                <Input
                  value={mobileNo}
                  onChangeText={setMobileNo}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                />
              </FormControl>
            )}

            {aboutError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>About</FormControl.Label>
                <Input
                  value={about}
                  onChangeText={setAbout}
                  placeholder="Add Salon Description"
                  multiline={true}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {aboutError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>About</FormControl.Label>
                <Input
                  value={about}
                  onChangeText={setAbout}
                  placeholder="Write about yourself"
                  multiline={true}
                />
              </FormControl>
            )}

            <Center mt="4" px="5">
              <HStack space={8}>
                <Button
                  w="50%"
                  mt="2"
                  colorScheme="indigo"
                  onPress={updateSalonProfile}>
                  Update Profile
                </Button>

                <Button
                  w="50%"
                  mt="2"
                  variant="solid"
                  colorScheme="secondary"
                  onPress={clearText}>
                  Clear text
                </Button>
              </HStack>
            </Center>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default ProfileSettings;
