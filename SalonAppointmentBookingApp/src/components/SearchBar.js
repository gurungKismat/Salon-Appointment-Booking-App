import React from 'react';
import {Box, Center, Input, Icon} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = (props) => {
  return (
    <Center>
      <Box w={'80%'}>
        <Center>
          <Input
            placeholder="Search Salons"
            variant="filled"
            borderRadius="10"
            py="2"
            px="2"
            borderWidth="1"
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
  );
};

export default SearchBar;
