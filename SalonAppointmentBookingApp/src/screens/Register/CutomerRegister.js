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

const CustomerRegister = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userName, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [userNameError, setUserNameError] = useState({
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

  // check if number exists
  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  function toggleLoading(value) {
    console.log('animation visible');
    setLoading(value);
  }

  // validate data
  function validateForm() {
    let error = 0;

    // if username is null
    if (userName.length === 0) {
      // console.log('null');
      error += 1;
      const updated = {
        error: 'Require',
        isError: true,
      };
      setUserNameError({
        ...userNameError,
        ...updated,
      });
      // console.log('username error' + JSON.stringify(userNameError));
    } else if (userName.length < 3 || userName.length > 20) {
      // if username is less than 3 character and more than 20
      // console.log('short');
      error += 1;

      const updated = {
        isError: true,
      };
      setUserNameError({
        ...userNameError,
        ...updated,
      });

      // console.log('usererror: ' + JSON.stringify(userNameError));
    } else if (hasNumber(userName)) {
      // if username contains any number
      console.log('contains number');
      error += 1;
      const updated = {
        error: 'Can not contain numeric values',
        isError: true,
      };
      setUserNameError({
        ...userNameError,
        ...updated,
      });
    } else {
      // if user name is suitable
      // console.log('no error');
      console.log('username correct');
      const updated = {
        error: '',
        isError: false,
      };
      setUserNameError({
        ...userNameError,
        ...updated,
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

    if (email.length === 0) {
      console.log('email null');

      error += 1;
      const updatedValue = {
        error: 'Require',
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
      console.log('password null');

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
      console.log('confirm password null');

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
      console.log('password not same');

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
      // alert('Signup Successful');
      toggleLoading(true);
      console.log('all good');
      console.log('count val ' + error);
      return true;
    } else {
      console.log('all wrong');
      console.log('count val ' + error);
      setLoading(false);
      return false;
    }
  }

  // add new customer
  const registerCustomer = () => {
    let success = validateForm();

    if (success !== true) {
      console.log("registeration failed")
      toggleLoading(false);
      return null;
    }
 
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        console.log('User account created & signed in!');
        firestore().collection('customers').doc(auth().currentUser.uid).set({
          userId: auth().currentUser.uid,
          name: userName,
          email,
          password,
          mobileNo: mobileNo
        });
        toggleLoading(false);
        alert('account created')
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
            As a Client
          </Heading>
          <VStack space={7} mt="5">
            {userNameError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>User Name</FormControl.Label>
                <Input
                  value={String(userName)}
                  onChangeText={setName}
                  placeholder="User Name"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {userNameError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>User Name</FormControl.Label>
                <Input
                  value={String(userName)}
                  onChangeText={setName}
                  placeholder="User Name"
                />
              </FormControl>
            )}

            {mobileNoError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Mobile Number</FormControl.Label>
                <Input
                  value={String(mobileNo)}
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
                  value={String(mobileNo)}
                  onChangeText={setMobileNo}
                  placeholder="Mobile Number"
                />
              </FormControl>
            )}

            {emailError.isError ? (
              <FormControl isInvalid>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={String(email)}
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
                  value={String(email)}
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
                  placeholder="Password"
                  value={String(password)}
                  onChangeText={setPassword}
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
                  placeholder="Password"
                  value={String(password)}
                  onChangeText={setPassword}
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
                  placeholder="Confirm Password"
                  value={String(confirmPassword)}
                  onChangeText={setConfirmPassword}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {confirmPasswordError.error}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
           

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
                  placeholder="Confirm Password"
                  value={String(confirmPassword)}
                  onChangeText={setConfirmPassword}
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

export default CustomerRegister;

