import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";

const Router = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <NavigationContainer>
            {isSignedIn ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    );
}

export default Router;