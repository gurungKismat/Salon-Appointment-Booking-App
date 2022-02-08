import React from "react";
import { View, Text, Button } from "react-native";


const SearchScreen = ({ navigation }) => {
    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "black"}}>Customer Search Screen</Text>
            <Button title="Go to Detail" onPress={() => navigation.navigate("Detail")}/>
        </View>
    );
}

export default SearchScreen;