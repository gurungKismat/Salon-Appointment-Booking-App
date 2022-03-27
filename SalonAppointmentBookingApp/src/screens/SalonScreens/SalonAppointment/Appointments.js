import React from 'react';
import {View, Text, useWindowDimensions, StatusBar} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EmptyList from '../../../components/EmptyList';

const FirstRoute = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    {/* <Text style={{color: 'black'}}>First</Text> */}
    <EmptyList message="No Upcoming Appointments" />
  </View>
);

const SecondRoute = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <EmptyList message="No Past Appointments" />
  </View>
);

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
