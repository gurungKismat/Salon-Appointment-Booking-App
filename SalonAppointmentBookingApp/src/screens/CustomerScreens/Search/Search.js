import React, {useState, useEffect} from 'react';
import {
  Box,
  Center,
  Input,
  FlatList,
  Stack,
  Heading,
  Text,
  Avatar,
  StatusBar,
  Icon,
  Image,
  useToast,
} from 'native-base';
import SearchBar from '../../../components/SearchBar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
// import {Box, Center, Input, Icon} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmptyList from '../../../components/EmptyList';

const SearchScreen = ({navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchedSalon, setSearchedSalon] = useState([]);
  const [searchResult, setSearchResult] = useState('No Items Searched');

  const toast = useToast();
  const id = 'test-toast';

  const searchSalon = async () => {
    searchedSalon.splice(0, searchedSalon.length);
    if (searchPhrase !== '') {
      const newSearchPhrase =
        searchPhrase.charAt(0).toUpperCase() + searchPhrase.substring(1);
      // alert(newSearchPhrase);
      const collectionRef = firestore().collection('salons');
      await collectionRef
        .where('salonName', '>=', newSearchPhrase)
        .where('salonName', '<=', newSearchPhrase + '\uf8ff')
        .get()
        .then(documents => {
          if (documents.empty) {
            setSearchResult('No Salon Found');
            if (!toast.isActive(id)) {
              toast.show({
                id,
                title: "No Salon Found!",
              });
            }
            // console.log('no matching documents');
          } else {
            // console.log("docment data: "+document.data())
            const salonData = [];
            documents.forEach(document => {
              // console.log(
              //   'doc id: ' +
              //     document.id +
              //     '  ' +
              //     'doc data: ' +
              //     JSON.stringify(document.data()),
              // );

              const singleSalon = {
                salonId: document.id,
                salonData: document.data(),
              };

              salonData.push(singleSalon);
            });
            // console.log('Salon Data: ' + JSON.stringify(salonData));
            setSearchedSalon(salonData);
          }
        });
    }
  };

  return (
    <Box w="100%" mt="5">
      <StatusBar backgroundColor={'#6200ee'} />
      <Center>
        <Box w={'90%'}>
          <Center>
            <Input
              placeholder="Search Salons"
              variant="filled"
              borderRadius="10"
              py="2"
              px="2"
              value={searchPhrase}
              onChangeText={setSearchPhrase}
              InputLeftElement={
                <Icon
                  onPress={searchSalon}
                  ml="2"
                  size="6"
                  color="muted.500"
                  as={<MaterialCommunityIcon name="magnify" />}
                />
              }
              InputRightElement={
                !!searchPhrase && (
                  <Icon
                    mr="2"
                    size="6"
                    color="muted.500"
                    as={
                      <MaterialCommunityIcon
                        name="close"
                        onPress={() => setSearchPhrase('')}
                      />
                    }
                  />
                )
              }
            />
          </Center>
        </Box>
      </Center>

      <Stack px="5" mt="5">
        {searchedSalon.length > 0 ? (
          <FlatList
            data={searchedSalon}
            renderItem={({item}) => <Item item={item} />}
          />
        ) : (
          <Center>
            <Box mb={32}>
              <EmptyList message={searchResult} />
            </Box>
          </Center>
        )}
      </Stack>
    </Box>
  );
};

const Item = ({item}) => {
  const [imageUri, setImageUri] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('item: ' + JSON.stringify(item));

  const getSalonImage = async reference => {
    const downloadUrl = await reference.getDownloadURL();
    setImageUri(downloadUrl);
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const imgUri = item.salonData.salonImage;
    if (imgUri !== undefined) {
      // console.log('image exist');
      const reference = storage().ref().child('/salonImages').child(imgUri);

      getSalonImage(reference);
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Box
      my={1}
      w="100%"
      py={3}
      rounded="xl"
      overflow="hidden"
      borderColor="coolGray.200"
      backgroundColor="gray.50"
      shadow="3">
      <Stack p="4" space={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Stack direction="column" space={1}>
            <Heading size="sm" ml="-1">
              {/* Reaver Salon */}
              {item.salonData.salonName}
            </Heading>
            <Stack>
              <Text fontWeight="400" fontSize="md">
                {/* Kapan, Kathmandu */}
                {item.salonData.address}
              </Text>
              <Text fontWeight="400" fontSize="md">
                {item.salonData.mobileNo}
              </Text>
            </Stack>
          </Stack>

          <Stack>
            {imageUri === '' ? (
              <Image
                source={{
                  uri: 'https://wallpaperaccess.com/full/317501.jpg',
                }}
                alt="Default Salon Img"
                size="md"
                rounded="md"
              />
            ) : (
              <Image
                source={{
                  uri: imageUri,
                }}
                alt="Default Salon Img"
                size="md"
                rounded="md"
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchScreen;
