import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  StatusBar,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  ScrollView,
  Link,
  HStack,
  Text,
  WarningOutlineIcon,
  Icon,
} from 'native-base';
import AnimatedLoader from 'react-native-animated-loader';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileSettings = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // display loading animation
  function toggleLoading(value) {
    // console.log('animation visible');
    setLoading(value);
  }

  // validate data
  function validateForm() {
    let error = 0;

    if (salonName.length === 0) {
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
    } else if (salonName.length < 3 || salonName.length > 20) {
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

    if (address.length == 0) {
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
    } else if (address.length < 3) {
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

    if (mobileNo.length == 0) {
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
    } else if (mobileNo.length !== 10 || isNaN(mobileNo)) {
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

    if (about.length === 0) {
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
      toggleLoading(false);
      return false;
    }
  }

  // add new customer
  const updateSalonProfile = () => {
    let success = validateForm();
    if (success !== true) {
      console.log('registeration failed');
      toggleLoading(false);
      return null;
    }
    return auth()
      .createUserWithEmailAndPassword(about, password)
      .then(userCredentials => {
        console.log('User account created & signed in!');
        firestore().collection('salons').doc(auth().currentUser.uid).set({
          salonName: salonName,
          address: address,
          mobileNo: mobileNo,
          email: about,
          password,
        });
        toggleLoading(false);
        alert('account created');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        toggleLoading(false);
        console.error(error);
      });
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

  return (
    <ScrollView>
      <StatusBar backgroundColor={'#6200ee'} />
      <Center w="100%">
        <AnimatedLoader
          visible={loading}
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

                <Button w="50%" mt="2" colorScheme="indigo" onPress={clearText}>
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
