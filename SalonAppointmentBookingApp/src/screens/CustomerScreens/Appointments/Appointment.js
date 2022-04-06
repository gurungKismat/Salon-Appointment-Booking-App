import React, {useEffect, useState} from 'react';
import {
  View,
  useWindowDimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Box, Center, Stack, Heading, Image, Text, HStack} from 'native-base';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EmptyList from '../../../components/EmptyList';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const DATA = [
  {name: 'kismat', age: 21},
  {name: 'tobi', age: 22},
];

const Item = ({item}) => {
  return (
    // <TouchableOpacity>
    //   <Box
    //     my={1}
    //     w="100%"
    //     py={3}
    //     rounded="xl"
    //     overflow="hidden"
    //     borderColor="coolGray.200"
    //     backgroundColor="gray.50"
    //     shadow="3">
    //     <Stack>
    //     <Box position="absolute" top="0" bg="red.100" p={2}>
    //           <Text>hello</Text>
    //         </Box>
    //       <Stack
    //         direction="row"
    //         justifyContent="space-between"
    //         alignItems="center">
    //         <Stack direction="column" space={1}>

    //           <Heading size="sm" ml="-1">
    //             {/* Reaver Salon */}
    //             {item.salonName}
    //           </Heading>
    //           <Stack>
    //             <Text fontWeight="400" fontSize="md">
    //               {/* Kapan, Kathmandu */}
    //               {item.salonAddress}
    //             </Text>

    //             <Text fontWeight="400" fontSize="md">
    //               Date: {item.date}
    //             </Text>
    //             <Text fontWeight="400" fontSize="md">
    //               {/* Time: 2:00 to 3:00 */}
    //               Time: {item.time}
    //             </Text>
    //           </Stack>
    //         </Stack>

    // <Stack>
    //   {item.salonImage === '' ? (
    //     <Image
    //       source={{
    //         uri: 'https://wallpaperaccess.com/full/317501.jpg',
    //       }}
    //       alt="Default Salon Img"
    //       size="md"
    //       rounded="md"
    //     />
    //   ) : (
    //     <Image
    //       source={{
    //         uri: item.salonImage,
    //       }}
    //       alt="Default Salon Img"
    //       size="md"
    //       rounded="md"
    //     />
    //   )}
    // </Stack>
    //       </Stack>
    //     </Stack>
    //   </Box>
    // </TouchableOpacity>
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Heading size="sm" px="3" mt={4}>
            {item.salonName}
          </Heading>
          <View
            style={item.requestResult === 'Pending' ? styles.pending : styles.accepted}>
            <Text style={{color: 'white'}}>{item.requestResult}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', padding: 12,}}>
            <View>
              <Text fontWeight="400" fontSize="md">
                {item.salonAddress}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Date: {item.date}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Time: {item.time}
              </Text>
            </View>
          </View>
          <View style={{paddingVertical: 10, paddingHorizontal: 13}}>
            {item.salonImage === '' ? (
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
                  uri: item.salonImage,
                }}
                alt="Default Salon Img"
                size="md"
                rounded="md"
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#e7e5e4',
    width: '100%',
    flexDirection: 'column',
    borderRadius: 20,
  },

  accepted: {
    backgroundColor: '#065f46',
    paddingHorizontal: 6,
    paddingVertical: 7,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  pending: {
    backgroundColor: '#ea580c',
    paddingHorizontal: 6,
    paddingVertical: 7,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  }
});

const FirstRoute = () => {
  const [data, setData] = useState();
  const [saloninfo, setSalonInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState('');

  const fetchAppointmentData = async currentUserId => {
    await firestore()
      .collection('Appointments')
      .where('customerId', '==', currentUserId)
      .onSnapshot(documents => {
        const datas = [];
        documents.forEach(document => {
          console.log(
            'document id: ' +
              document.id +
              'documentData: ' +
              JSON.stringify(document.data()),
          );
          datas.push(document.data());
        });
        setSalonInfo(datas);
        if (loading) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    const currentUserId = auth().currentUser.uid;
    fetchAppointmentData(currentUserId);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 12, marginTop: 20}}>
        <FlatList
          data={saloninfo}
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
        <FlatList data={DATA} renderItem={({item}) => <Item item={item} />} />
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
