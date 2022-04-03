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
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import popularServices from '../../../components/PopularServices';
import PopularSalons from '../../../components/PopularSalons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['NativeBase:']);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [salonDatas, setSalonDatas] = useState([]);
  const [customerDatas, setCustomerDatas] = useState(null);
  const [customerAvatar, setCustomerAvatar] = useState(null);

  const getAvatar = async customerImg => {
    const reference = storage()
      .ref()
      .child('/customerProfilePicture')
      .child(customerImg);
    const downloadUrl = await reference.getDownloadURL();
    setCustomerAvatar(downloadUrl);
  };

  useEffect(() => {
    console.log('use effect customer data');
    const fetchCustomerData = firestore()
      .collection('customers')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setCustomerDatas(documentSnapshot.data());
          const customerImg = documentSnapshot.data().customerImage;
          if (customerImg !== undefined) {
            getAvatar(customerImg);
          }
        }
      });

    return () => fetchCustomerData();
  }, []);

  useEffect(() => {
    console.log('use effect of customer home salon datas');

    const salonInfoArray = [];

    const fetchSalons = firestore()
      .collection('salons')
      .onSnapshot(querySnapshot => {
        // console.log("total salons: "+documentSnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'salonid: ' + documentSnapshot.id,
            documentSnapshot.data(),
          );
          // salonInfoArray.push(documentSnapshot.data());
          const salonId = {salonId: documentSnapshot.id};
          const salonInfos = documentSnapshot.data();
          const mergedData = {...salonId, ...salonInfos};
          salonInfoArray.push(mergedData);
        });

        setSalonDatas(salonInfoArray);
        if (loading) {
          setLoading(false);
        }
      });

    return () => fetchSalons();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={'#6200ee'} />
      <Stack bg="muted.10">
        <ScrollView mx={5} mt={5} mb={5}>
          <VStack space={5}>
            <HStack justifyContent={'space-between'}>
              <Center>
                {customerDatas && (
                  <Heading size={'md'}>{`Hi ${
                    customerDatas.name.split(' ')[0]
                  }`}</Heading>
                )}
              </Center>
              <Center>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CustomerProfile')}>
                  {customerDatas.customerImage === undefined ? (
                    <Avatar
                      bg="#6200ee"
                      mr="1"
                      source={{
                        uri: 'https://bit.ly/broken-link',
                      }}>
                      {customerDatas.name.charAt(0)}
                    </Avatar>
                  ) : (
                    <Avatar
                      bg="indigo.500"
                      source={{
                        uri: customerAvatar,
                      }}>
                      {customerDatas.name.charAt(0)}
                    </Avatar>
                  )}
                </TouchableOpacity>
              </Center>
            </HStack>
            <Center>
              <Box w={'100%'}>
                <Center>
                  <Input
                    color="amber.100"
                    placeholder="Search Salons"
                    variant="filled"
                    borderRadius="10"
                    py="2"
                    px="2"
                    // borderWidth="1"
                    onPressIn={() => navigation.navigate('Discover')}
                    InputLeftElement={
                      <Icon
                        ml="2"
                        size="6"
                        color="muted.500"
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
                <TouchableOpacity onPress={() => alert('clicked')}>
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
                            // color={'white'}
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
                </TouchableOpacity>
              )}
            />

            {/* popular Salons */}
            <Heading size="md" mt="4">
              Popular Salons
            </Heading>

            {/* card view with pic */}
            <FlatList
              horizontal
              data={salonDatas}
              renderItem={({item}) => <PopularSalons item={item} />}
            />
          </VStack>
        </ScrollView>
      </Stack>
    </>
  );
};

// const HomeScreen = () => {
//   return (

//   );
// };

export default HomeScreen;

// <Center flex={1} px="4">
//   <HomeUi />
// </Center>
