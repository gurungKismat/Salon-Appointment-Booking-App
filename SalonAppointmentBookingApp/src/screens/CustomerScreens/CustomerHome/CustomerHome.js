import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  VStack,
  HStack,
  ScrollView,
  Center,
  Box,
  Heading,
  Text,
  Avatar,
  Input,
  Icon,
  AspectRatio,
  Image,
  Stack,
  FlatList,
  Pressable,
  StatusBar,
} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import popularServices from '../../../components/PopularServices';
import PopularSalons from '../../../components/PopularSalons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HomeUi = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("use effect of customer home");
    const fetchSalons = firestore().collection('salons').onSnapshot(querySnapshot => {
      // console.log("total salons: "+documentSnapshot.size);  
      querySnapshot.forEach(documentSnapshot => {
        // console.log("salonid: "+documentSnapshot.id, documentSnapshot.data())
        
      })
    })

    return () => fetchSalons();

  }, [])

  return (
    <ScrollView>
      <StatusBar
        backgroundColor={"#6200ee"}
      />
      <VStack space={5} mt={8} mb={5}>
        <HStack justifyContent={'space-between'}>
          <Center>
            <Heading size={'md'}>Hi Kismat</Heading>
          </Center>
          <Center>
            <Pressable onPress={() => navigation.navigate("CustomerProfile")}>
            <Avatar
              bg="indigo.500"
              source={{
                uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}>
              KG
            </Avatar>
            </Pressable>
          </Center>
        </HStack>
        <Center>
          <Box w={'100%'}>
            <Center>
              <Input
                placeholder="Search Salons"
                variant="filled"
                borderRadius="10"
                py="2"
                px="2"
                borderWidth="1"
                onPressIn={() => navigation.navigate('Discover')}
                InputLeftElement={
                  <Icon
                    ml="2"
                    size="6"
                    color="gray.400"
                    as={<MaterialCommunityIcon name="magnify" />}
                  />
                }
              />
            </Center>
          </Box>
        </Center>
        <Heading size="md" mt="4">
          Popular Services
        </Heading>

        {/* card view with pic */}
        <FlatList
          horizontal
          data={popularServices}
          renderItem={({item}) => (
            <Pressable onPress={() => alert('clicked')}>
              <Box
                mx="2"
                size={40}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                background={item.containerColor}
                shadow="3">
                <Box mt="4">
                  <AspectRatio w="100%" ratio={16 / 9}>
                    <Center>
                      <Image
                        size={'md'}
                        source={item.serviceImg}
                        alt="image"
                        color={'white'}
                      />
                    </Center>
                  </AspectRatio>
                </Box>
                <Center p="2">
                  <Heading size="md" color={'white'}>
                    {item.serviceName}
                  </Heading>
                </Center>
              </Box>
            </Pressable>
          )}
        />

        {/* popular Salons */}
        <Heading size="md" mt="4">
          Popular Salons
        </Heading>

        {/* card view with pic */}
        <FlatList
          horizontal
          data={popularServices}
          renderItem={({item}) => <PopularSalons />}
        />
      </VStack>
    </ScrollView>
  );
};

const HomeScreen = () => {
  return (
    <Center flex={1} px="4">
      <HomeUi />
    </Center>
  );
};

export default HomeScreen;
