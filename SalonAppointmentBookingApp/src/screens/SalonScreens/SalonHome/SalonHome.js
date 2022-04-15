import React from 'react';
import {
  VStack,
  Center,
  Box,
  Heading,
  AspectRatio,
  Image,
  Stack,
  Pressable,
  StatusBar,
} from 'native-base';
import GetIcons from '../../../components/GetIcons';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <Stack space={2} direction="row">
      <StatusBar backgroundColor={'#6366f1'} />
      <VStack space={2}>
        <Pressable onPress={() => navigation.navigate('SalonAppointment')}>
          <Box
            width={40}
            height={48}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            background={'coolGray.50'}
            shadow="3"
            bg={'indigo.300'}>
            <Box mt="3">
              <AspectRatio w="100%" ratio={16 / 9}>
                <Center>
                  <Image
                    size={'md'}
                    source={GetIcons.pendingAppointments}
                    alt="image"
                  />
                </Center>
              </AspectRatio>
            </Box>
            <Center p="2">
              <Heading size="sm" color={'white'}>
                Appointments
              </Heading>
            </Center>
          </Box>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('SalonAvailability')}>
          <Box
            width={40}
            height={48}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            background={'coolGray.50'}
            shadow="3"
            bg={'rose.200'}
            justifyContent="space-evenly">
            <Box mt="3">
              <AspectRatio w="100%" ratio={16 / 9}>
                <Center>
                  <Image
                    size={'md'}
                    source={GetIcons.addAvailbility}
                    alt="image"
                  />
                </Center>
              </AspectRatio>
            </Box>
            <Center p="2">
              <Heading size="sm" color={'white'}>
                Add Availability
              </Heading>
            </Center>
          </Box>
        </Pressable>
      </VStack>

      <VStack space={2}>
        <Pressable onPress={() => navigation.navigate('SalonServices')}>
          <Box
            w={40}
            h={56}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            background={'coolGray.50'}
            shadow="3"
            bg={'warning.300'}
            justifyContent="space-evenly">
            <Box mt="3">
              <AspectRatio w="100%" ratio={16 / 9}>
                <Center>
                  <Image
                    size={'md'}
                    source={GetIcons.addServices}
                    alt="image"
                  />
                </Center>
              </AspectRatio>
            </Box>
            <Center p="2">
              <Heading size="sm" color={'white'}>
                Add Services
              </Heading>
            </Center>
          </Box>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('SalonProfile')}>
          <Box
            size={40}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            background={'coolGray.50'}
            shadow="3"
            bg={'info.400'}
            justifyContent="space-evenly">
            <Box mt="2">
              <AspectRatio w="100%" ratio={16 / 9}>
                <Center>
                  <Image
                    size={'lg'}
                    source={GetIcons.profile}
                    alt="image"
                  />
                </Center>
              </AspectRatio>
            </Box>
            <Center p="2">
              <Heading size="sm" color={'white'}>
                Profile
              </Heading>
            </Center>
          </Box>
        </Pressable>
      </VStack>
    </Stack>
  );
};

const Eg = () => {
  return (
    <Center flex={1} bg="white" px={'10%'} py={'10%'}>
      <Home />
    </Center>
  );
};

export default Eg;
