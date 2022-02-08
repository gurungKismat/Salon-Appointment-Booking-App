import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import  AuthStack  from "./AuthStack";
import CustomerStack from "./CustomerStack";
import SalonStack from "./SalonStack";


const GetStack = ({ stackName }) => {
    console.log("stack name: "+stackName);
    if (stackName === null) {
        return <AuthStack/>

    }else if (stackName === "Customer") {
        return <CustomerStack/>
        
    } else if (stackName === "Salon") {
        return <SalonStack/>
    }
}

const Router = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userToken, setUserToken] = useState("Salon");

    return (
        <>
         {<GetStack stackName={userToken}/>}
        </>
       
    );
}

export default Router;