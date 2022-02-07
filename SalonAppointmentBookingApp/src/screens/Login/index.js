import React from "react";
import { View, Text, Button} from "react-native";


const Login = ({ navigation }) => {
    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "black"}}>Login Screen</Text>
            <Button title="Register" onPress={() => navigation.navigate("Register")}/>
        </View>
    );
}

export default Login;