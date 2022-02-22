
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Text style={{color: "black"}}>About1</Text>
  </View>
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Text style={{color: "black"}}>Offers</Text>
  </View>
);
const ThirdRoute = () => (
  <View style={[styles.container, { backgroundColor: 'white' }]} >
      <Text style={{color: "black"}}>Services</Text>
  </View>
);

export default class CustomTabBar extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'About' },
      { key: 'second', title: 'Offers' },
      { key: 'third', title: 'Services' },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {

    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'blue' }}
        style={{ backgroundColor: 'transparent', paddingTop: 3, marginTop: 2}}
        renderLabel={({ route, focused, color }) => (
          <Text style={{ color, margin: 8 }}>{route.title}</Text>
        )}
        activeColor= "red"
        inactiveColor="black"
      />
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


});

