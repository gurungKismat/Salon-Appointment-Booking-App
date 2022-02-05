import React from "react"; 
import { View, Text, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomeScreen = () => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text style={{color: "black"}}>Home Screen</Text>
    </View>
  );
}

const DetailScreen = () => {
  return (
    <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
      <Text style={{color: "black"}}>Detail Screen</Text>
      {/* <Button onPress={}>Go to HomeScreen</Button> */}
    </View>
  );
}

const App = () => {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Details" component={DetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
