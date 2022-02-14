import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";


const RegisterSelection = () => {
    const navigation = useNavigation();
    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "black"}}>RegisterSelection  Screen</Text>
            <Button title="Client" onPress={() => navigation.navigate("CustomerRegister")}/>
            <Button title="Salon" onPress={() => navigation.navigate("SalonRegister")}/>
        </View>
    );
}

export default RegisterSelection;