import React, {useState} from 'react';
import {
  View,
  useWindowDimensions,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  Box,
  Center,
  Stack,
  Heading,
  Image,
  Text,
} from 'native-base';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EmptyList from '../../../components/EmptyList';

const DATA = [
  {name: 'kismat', age: 21},
  {name: 'tobi', age: 22},
];

const Item = ({item}) => {
  const [imageUri, setImageUri] = useState('');
  return (
    <TouchableOpacity
     >
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
                Reaver Salon
                {/* {item.salonName} */}
              </Heading>
              <Stack>
                <Text fontWeight="400" fontSize="md">
                  Kapan, Kathmandu
                  {/* {item.address} */}
                </Text>
              
                <Text fontWeight="400" fontSize="md">
                  Date: 20/24/2022
                  {/* {item.address} */}
                </Text>
                <Text fontWeight="400" fontSize="md">
                 Time: 2:00 to 3:00
                  {/* {item.address} */}
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
    </TouchableOpacity>
  );
}

const FirstRoute = () => {
  const [data, setData] = useState();
  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 12, marginTop: 20}}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
      />
      </View>
    </View>
  );
};

const SecondRoute = () => {
  const [data, setData] = useState();
  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 12, marginTop: 20}}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item item={item} />}
      />
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Upcoming'},
    {key: 'second', title: 'Past'},
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'white'}}
        style={{backgroundColor: '#6200ee', border: 0}}
      />
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#6200ee'} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </>
  );
}

const Appointment = () => {
  return <TabViewExample />;
};

export default Appointment;
