import React from 'react';
import {Box, Heading, Text, Stack, Center, FlatList} from 'native-base';

const Notification = () => {
  const datas = [
    {
      name: 'hero',
      age: 20,
    },

    {
      name: 'hari',
      age: 30,
    },

    {
      name: 'hero',
      age: 20,
    },

    {
      name: 'hari',
      age: 30,
    },

    {
      name: 'hero',
      age: 20,
    },

    {
      name: 'hari',
      age: 30,
    },
  ];

  return (
    <Stack px="5" mt="5" > 
    <FlatList
      data={datas}
      renderItem={({item}) => (
        <Box      
          my="2"
          w="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          backgroundColor="gray.50"
          shadow="5">
          <Stack p="4" space={2}>
            <Heading size="sm" ml="-1">
              You have an appointment Today
            </Heading>
            <Stack>
              <Text fontWeight="400" fontSize="md">
                Date: 15th December 2022
              </Text>
              <Text fontWeight="400" fontSize="md">
                Time: 1:00 PM
              </Text>
            </Stack>
          </Stack>
        </Box>
      )}
    />
    </Stack>
  );
};

export default Notification;
