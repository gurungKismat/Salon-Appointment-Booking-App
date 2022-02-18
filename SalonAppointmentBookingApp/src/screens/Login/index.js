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
} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginForm = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [detail, setDetail] = useState({email: 'hello', password: '123'});
  const [errorMsg, setErrorMsg] = useState({message: 'Require'});

  const validateDetails = () => {
    if (emailId === detail.email && password === detail.password) {
      console.log('success opening home...');
    } else if (emailId !== detail.email && password === detail.password) {
      let newMsg = {messge: 'Email Incorrect!!!'};
      setErrorMsg({
        ...errorMsg,
        ...newMsg,
      });
      console.log('Email incorrect!');
    } else if (emailId === detail.email && password !== detail.password) {
      let newMsg = {messge: 'Password Incorrect!!!'};
      setErrorMsg({
        ...errorMsg,
        ...newMsg,
      });
      console.log('password incorrect!');
    } else {
      console.log('Both incorrect');
    }
  };

  // check if the email and password inputs are empty
  const isEmpty = () => {
    console.log('email id: ' + emailId);
    console.log('password: ' + password);
    if (emailId.length === 0) {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }

    if (password.length === 0) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }

    if (emailId !== '' && password !== '') {
      validateDetails();
    }
  };

  return (
    <Center w="100%">
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
                      <MaterialCommunityIcon name={show ? 'eye' : 'eye-off'} />
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
                      <MaterialCommunityIcon name={show ? 'eye' : 'eye-off'} />
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
            </FormControl>
          )}

          <Link
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500',
            }}
            alignSelf="flex-end"
            mt="1">
            Forget Password?
          </Link>
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
  );
};

const Login = () => {
  return (
    <Center flex={1} px="3">
      <LoginForm />
    </Center>
  );
};

export default Login;
