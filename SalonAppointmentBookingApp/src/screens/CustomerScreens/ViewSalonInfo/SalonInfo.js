import React from 'react';
import {
  Box,
  Center,
  Text,
  Stack,
  AspectRatio,
  Image,
  Heading,
} from 'native-base';

const SalonInfoUi = () => {
  return (
    <Stack space={4}>
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Stack space={4} bg="amber.100" direction="column" px={4}>
        <Heading size="lg">Reaver Salon</Heading>
        <Stack space={1}>
        <Heading size="sm">Naxal, Kathmandu</Heading>
        <Heading size="sm">Available Time: 9:00 AM to 5:00 PM</Heading>
        </Stack>
      </Stack>
    </Stack>
  );
};

const SalonInfo = () => {
  return (
    <Box flex="1" bg="red.100">
      <SalonInfoUi />
    </Box>
  );
};

export default SalonInfo;
