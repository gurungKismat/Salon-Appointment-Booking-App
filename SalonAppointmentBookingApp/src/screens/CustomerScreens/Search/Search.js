import React, {useState} from 'react';
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
} from 'native-base';
import SearchBar from '../../../components/SearchBar';

const SearchScreen = ({navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState('');

  const datas = [
    {
      name: 'hello',
      age: 20,
    },
    {
      name: 'hello',
      age: 20,
    },
  ];

  return (
    <Box w="100%" mt="5">
      <StatusBar
        backgroundColor={"#6200ee"}
      />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <Stack px="5" mt="5">
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Avatar
                    bg="indigo.500"
                    source={{
                      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    }}>
                    KG
                  </Avatar>

                  <Heading size="sm" ml="-1">
                    Reaver Salon
                  </Heading>
                </Stack>
                <Stack>
                  <Text fontWeight="400" fontSize="md">
                    Kapan, Kathmandu
                  </Text>
                  <Text fontWeight="400" fontSize="md">
                    i7987897987
                  </Text>
                </Stack>
              </Stack>
            </Box>
          )}
        />
      </Stack>
    </Box>
  );
};

export default SearchScreen;
