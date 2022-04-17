import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  Icon,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const PopularSalons = ({item}) => {
  // console.log('flatlist salons data: ' + JSON.stringify(item));
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [star, setStar] = useState(0);

  const getRating = () => {
    const storedRating = item.ratings;
    let totalRating = 0;
    let totalResponse = 0;
    for (let x in storedRating) {
      totalRating += Number(x) * Number(storedRating[x]);
      totalResponse += Number(storedRating[x]);
    }
    let finalRating = totalRating / totalResponse;
    setStar(finalRating);
  };

  const getImageUrl = () => {
    firestore()
      .collection('salons')
      .doc(item.salonId)
      .get()
      .then(async documentSanpshot => {
        if (documentSanpshot.exists) {
          const url = documentSanpshot.data().salonImage;
          // console.log('image url : ' + url);

          if (url !== undefined) {
            // console.log('image exist');
            const reference = storage().ref().child('/salonImages').child(url);
            const downloadUrl = await reference.getDownloadURL();
            setImageUri(downloadUrl);

            getRating();

            if (loading) {
              setLoading(false);
            }
          }
        }
      });
  };

  useEffect(() => {
    getImageUrl();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SalonInfo', {
          salonInfo: item,
          salonImage: imageUri,
        })
      }>
      <Box
        mx="2"
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            {imageUri === null ? (
              <Image
                source={{
                  uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt="image"
              />
            ) : (
              <Image
                source={{
                  uri: imageUri,
                  // uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt="image"
              />
            )}
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5">
            SALON
          </Center>
        </Box>
        <Stack p="4" space={1}>
          <Stack space={2} direction="row" justifyContent="space-between">
            <Heading size="sm" ml="-1">
              {/* Reaver */}
              {item.salonName}
            </Heading>

            <Stack direction="row" space={2}>
              <Icon
                ml="2"
                size="6"
                color="yellow.400"
                as={<MaterialCommunityIcon name="star" />}
              />
              {isNaN(star) ? <Text>{0}</Text> : <Text>{star}</Text>}
            </Stack>
          </Stack>
          <Stack>
            <Text fontWeight="400" fontSize="xs">
              {/* Kapan, Kathmandu */}
              {item.address}
            </Text>
            <Text fontWeight="400" fontSize="xs">
              {/* 98324234234 */}
              {item.mobileNo}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </TouchableOpacity>
  );
};

export default PopularSalons;
