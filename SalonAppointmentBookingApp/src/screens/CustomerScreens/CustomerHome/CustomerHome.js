import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from "react-native";


const HomeScreen = () => {
    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "black"}}>Customer Home Screen</Text>
            <MaterialCommunityIcons name="home" color={'red'} size={50} />
        </View>
    );
}

export default HomeScreen;