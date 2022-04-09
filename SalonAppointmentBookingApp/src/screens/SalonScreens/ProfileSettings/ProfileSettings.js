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
} from 'native-base';
import AnimatedLoader from 'react-native-animated-loader';

const ProfileSettings = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [loadAnimation, setLoadAnimation] = useState(false);
  const [salonName, setSalonName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [about, setAbout] = useState('');

  const [salonNameError, setSalonNameError] = useState({
    error: '',
    isError: false,
  });
  const [addressError, setAddressError] = useState({
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

  var newAddress;
  var newMobileNo;
  var newSalonName;
  var newAbout;

  // display loading animation
  function toggleLoading(value) {
    // console.log('animation visible');
    setLoadAnimation(value);
  }

  // validate data
  function validateForm() {
    let error = 0;

    if (newSalonName.length === 0) {
      // console.log('null');
      error += 1;
      const updated = {
        error: 'Require',
        isError: true,
      };
      setSalonNameError({
        ...salonNameError,
        ...updated,
      });
      // console.log('username error' + JSON.stringify(userNameError));
    } else if (newSalonName.length < 3 || newSalonName.length > 20) {
      // console.log('short');
      error += 1;

      const updated = {
        error: 'Name should at least contain 3 character',
        isError: true,
      };
      setSalonNameError({
        ...salonNameError,
        ...updated,
      });
    } else {
      const updated = {
        error: '',
        isError: false,
      };
      setSalonNameError({
        ...salonNameError,
        ...updated,
      });
    }

    if (newAddress.length === 0) {
      console.log('null address');
      error += 1;

      const updatedValue = {
        error: 'Require',
        isError: true,
      };

      setAddressError({
        ...addressError,
        ...updatedValue,
      });
    } else if (newAddress.length < 3) {
      console.log('length incorrect');
      error += 1;

      const updatedValue = {
        error: 'Address should contain at least three characters',
        isError: true,
      };

      setAddressError({
        ...addressError,
        ...updatedValue,
      });
    } else {
      console.log('no error');

      const updatedValue = {
        error: '',
        isError: false,
      };

      setAddressError({
        ...addressError,
        ...updatedValue,
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
    newAddress = address.trim();
    newMobileNo = mobileNo.trim();
    newSalonName = salonName.trim();
    newAbout = about.trim();
  }

  // add new customer
  const updateSalonProfile = () => {
    removeWhiteSpace();
    let success = validateForm();
    if (success) {
      removeWhiteSpace();
      console.log('newAddress: ' + address);
      firestore()
        .collection('salons')
        .doc(auth().currentUser.uid)
        .update({
          address: newAddress,
          mobileNo: newMobileNo,
          salonName: newSalonName,
          about: newAbout,
        })
        .then(() => {
          console.log('User updated!');
          toggleLoading(false);
        })
        .catch(error => {
          console.error(error);
          toggleLoading(false);
        });
    }
  };

  // clears the text from the input field
  const clearText = () => {
    setSalonName('');
    setAddress('');
    setMobileNo('');
    setAbout('');
    setSalonNameError({isError: false});
    setAddressError({isError: false});
    setMobileNoError({isError: false});
    setAboutError({isError: false});
  };

  useEffect(() => {
    console.log('params: ' + JSON.stringify(route.params));

    const paramsDatas = route.params;
    setSalonName(paramsDatas.salonName);
    setAddress(paramsDatas.address);
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
    <ScrollView>
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
            {salonNameError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Salon Name</FormControl.Label>
                <Input
                  value={salonName}
                  onChangeText={setSalonName}
                  placeholder="Salon Name"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {salonNameError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Salon Name</FormControl.Label>
                <Input
                  value={salonName}
                  onChangeText={setSalonName}
                  placeholder="Salon Name"
                />
              </FormControl>
            )}

            {addressError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Address</FormControl.Label>
                <Input
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Address"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {addressError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Address</FormControl.Label>
                <Input
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Address"
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
                  placeholder="Add Salon Description"
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
