import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
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

const SalonRegister = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [salonName, setSalonName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer');
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
  const [emailError, setEmailError] = useState({
    error: '',
    isError: false,
  });
  const [passwordError, setPasswordError] = useState({
    error: '',
    isError: false,
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    error: '',
    isError: false,
  });

  // display loading animation
  function toggleLoading(value) {
    // console.log('animation visible');
    setLoading(value);
  }

  // validate email address
  function validateEmail() {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
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
      // console.log('null address');
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
      // console.log('length incorrect');
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
      // console.log('no error');

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
      // console.log('null mobile');
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
      // console.log('length incorrect');
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
      // console.log('no error');

      const updatedValue = {
        error: '',
        isError: false,
      };

      setMobileNoError({
        ...mobileNoError,
        ...updatedValue,
      });
    }

    if (email.length === 0) {
      // console.log('email null');

      error += 1;
      const updatedValue = {
        error: 'Require',
        isError: true,
      };

      setEmailError({
        ...emailError,
        ...updatedValue,
      });
    } else if (!validateEmail()) {
      // console.log('email  invalid');
      error += 1;

      const updatedValue = {
        error: 'Invalid email address',
        isError: true,
      };

      setEmailError({
        ...emailError,
        ...updatedValue,
      });
    } else {
      const updatedValue = {
        error: '',
        isError: false,
      };

      setEmailError({
        ...emailError,
        ...updatedValue,
      });
    }

    if (password.length === 0) {
      // console.log('password null');

      error += 1;
      const updatedValue = {
        error: 'Require',
        isError: true,
      };

      setPasswordError({
        ...passwordError,
        ...updatedValue,
      });
    } else {
      const updatedValue = {
        error: '',
        isError: false,
      };

      setPasswordError({
        ...passwordError,
        ...updatedValue,
      });
    }

    if (confirmPassword.length === 0) {
      // console.log('confirm password null');

      error += 1;
      const updatedValue = {
        error: 'Require',
        isError: true,
      };

      setConfirmPasswordError({
        ...confirmPasswordError,
        ...updatedValue,
      });
    } else if (confirmPassword !== password) {
      // console.log('password not same');

      error += 1;
      const updatedValue = {
        error: 'Password didnot matched',
        isError: true,
      };

      setConfirmPasswordError({
        ...confirmPasswordError,
        ...updatedValue,
      });
    } else {
      const updatedValue = {
        error: '',
        isError: false,
      };

      setConfirmPasswordError({
        ...confirmPasswordError,
        ...updatedValue,
      });
    }

    if (error === 0) {
      // console.log('all good');
      // console.log('error val: ' + error);
      toggleLoading(true);
      return true;
    } else {
      // console.log('all wrong');
      toggleLoading(false);
      return false;
    }
  }

  // add new customer
  const registerCustomer = () => {
    let success = validateForm();
    if (success !== true) {
      // console.log('registeration failed');
      toggleLoading(false);
      return null;
    }
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        // console.log('User account created & signed in!');
        firestore().collection('salons').doc(auth().currentUser.uid).set({
          salonName: salonName,
          address: address,
          mobileNo: mobileNo,
          email,
        });
        toggleLoading(false);
        alert('account created');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }
        toggleLoading(false);
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <Center w="100%">
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/50124-user-profile.json')}
          animationStyle={{width: 120, height: 120}}
          speed={1}>
          <Text color="black">Signing Up...</Text>
        </AnimatedLoader>
        <Box safeArea p="2" w="85%" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold">
            Create Account
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="md">
            As a Salon
          </Heading>
          <VStack space={6} mt="5">
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

            {emailError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {emailError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                />
              </FormControl>
            )}

            {passwordError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Password</FormControl.Label>

                <Input
                  type={showPassword ? 'text' : 'password'}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialCommunityIcon
                          name={showPassword ? 'eye' : 'eye-off'}
                        />
                      }
                      size={6}
                      mr="2"
                      color="muted.400"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {passwordError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialCommunityIcon
                          name={showPassword ? 'eye' : 'eye-off'}
                        />
                      }
                      size={6}
                      mr="2"
                      color="muted.400"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                />
              </FormControl>
            )}

            {confirmPasswordError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Confirm Password</FormControl.Label>
                {/* <Input
                  type="password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                /> */}
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialCommunityIcon
                          name={showConfirmPassword ? 'eye' : 'eye-off'}
                        />
                      }
                      size={6}
                      mr="2"
                      color="muted.400"
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  }
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {confirmPasswordError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                {/* <Input
                  type="password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                /> */}

                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialCommunityIcon
                          name={showConfirmPassword ? 'eye' : 'eye-off'}
                        />
                      }
                      size={6}
                      mr="2"
                      color="muted.400"
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  }
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                />
              </FormControl>
            )}

            <Button mt="2" colorScheme="indigo" onPress={registerCustomer}>
              Sign up As Client
            </Button>
            <HStack mt="1" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                Already have an account?{' '}
              </Text>
              <Link
                onPress={() => navigation.popToTop()}
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}>
                Login
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default SalonRegister;
