import React from 'react';
import {useNavigation} from '@react-navigation/native';
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
  KeyboardAvoidingView,
} from 'native-base';

const CustomerRegister = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Center w="100%">
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
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>FirstName</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Second Name</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormControl.Label>User Name</FormControl.Label>
              <Input />
              <FormControl>
                <FormControl.Label>Mobile Number</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input type="password" />
              </FormControl>
            </FormControl>
            <Button mt="2" colorScheme="indigo">
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
