import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  WarningOutlineIcon,
  Icon,
  Image,
} from 'native-base';
import {StatusBar, View, StyleSheet} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import AnimatedLoader from 'react-native-animated-loader';

const LoginForm = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({message: 'Require'});
  const [loading, setLoading] = useState(false);

  var newEmail;

  const validateDetails = () => {
    auth()
      .signInWithEmailAndPassword(newEmail, password)
      .then(() => {
        setLoading(false);
        console.log('signin success');
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else if (errorCode === 'auth/user-not-found') {
          alert('User with the given email doesnot exist');
        } else if (errorCode === 'auth/invalid-email') {
          alert('Invalid email address');
        } else {
          alert(errorMessage);
        }
        setLoading(false);
        console.log(error);
      });
  };

  // removes the white space from the text input
  function removeWhiteSpace() {
    newEmail = emailId.trim();
  }

  // check if the email and password inputs are empty
  const isEmpty = () => {
    console.log('email id: ' + emailId);
    console.log('password: ' + password);
    removeWhiteSpace();
    if (newEmail.length === 0) {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }

    if (password.length === 0) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }

    // if the email and password input are not empty
    if (newEmail !== '' && password !== '') {
      setLoading(true);
      validateDetails();
    }
  };

  return (
    <>
      <Center w="100%">
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../assets/50124-user-profile.json')}
          animationStyle={{width: 120, height: 120}}
          speed={1}>
          <Text color="black">Signing In...</Text>
        </AnimatedLoader>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            Welcome Back
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Sign in to continue!
          </Heading>
          <VStack space={3} mt="5">
            {showEmailError === true ? (
              <FormControl isInvalid>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcon name="account" />}
                      size={6}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  // style={styles.inputStyle}
                  // style={borderColor: 'red'}
                  
                  borderRadius="lg"
                  placeholder="Email"
                  value={emailId}
                  onChangeText={text => setEmailId(text)}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errorMsg.message}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>

                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcon name="account" />}
                      size={6}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  // style={styles.inputStyle}
                  borderColor="#a5b4fc"
                  borderWidth={2}
                  variant="outline"
                  placeholder="Email"
                  value={emailId}
                  onChangeText={text => setEmailId(text)}
                />
              </FormControl>
            )}
            {showPasswordError ? (
              <FormControl isInvalid>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type={show ? 'text' : 'password'}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialCommunityIcon
                          name={show ? 'eye' : 'eye-off'}
                        />
                      }
                      size={6}
                      mr="2"
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                  placeholder="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {errorMsg.message}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type={show ? 'text' : 'password'}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialCommunityIcon
                          name={show ? 'eye' : 'eye-off'}
                        />
                      }
                      size={6}
                      mr="2"
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                  InputLeftElement={
                    <Icon
                      as={<MaterialCommunityIcon name="lock" />}
                      size={6}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  borderColor="#a5b4fc"
                  borderWidth={2}
                  placeholder="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </FormControl>
            )}

            {/* <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1">
              Forget Password?
            </Link> */}
            <Button mt="2" colorScheme="indigo" onPress={isEmpty}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                Don't have an account?.{' '}
              </Text>
              <Link
                onPress={() => navigation.navigate('RegisterSelection')}
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </>
  );
};

const Login = () => {
  return (
    <>
      <StatusBar backgroundColor={'#6366f1'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9fafb',
        }}>
        <Image
          size="24"
          borderRadius={100}
          source={require('../../assets/icons/newlogo.jpg')}
          alt="Alternate Text"
        />
        <LoginForm />
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 10,
    borderColor: '#d1d5db',
  },
});
