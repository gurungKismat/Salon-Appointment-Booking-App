
import React from 'react';
import {Button, Heading, VStack, Center} from 'native-base';
import { useNavigation } from "@react-navigation/native";

const SelectionInterface = () => {
    const navigation = useNavigation();
  return (
    <VStack space="50" mb="90">
      <Center>
        <Heading>Create Account</Heading>
      </Center>

      <VStack space="5">
        <Center>
          <Button w="100%" size="lg" colorScheme='indigo' onPress={() => navigation.navigate("CustomerRegister")} >Sign Up As A Client</Button>
        </Center>

        <Center>
          <Heading>Or</Heading>
        </Center>

        <Center>
          <Button w="100%" size="lg" colorScheme="indigo" onPress={() => navigation.navigate("SalonRegister")}>Set Up My Business</Button>
        </Center>
      </VStack>
    </VStack>
  );
};

const RegisterationSelection = () => {
  return (
    <Center flex={1}>
      <SelectionInterface />
    </Center>
  );
};

export default RegisterationSelection;
