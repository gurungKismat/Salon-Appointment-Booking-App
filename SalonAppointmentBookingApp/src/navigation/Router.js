import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import  AuthStack  from "./AuthStack";
import CustomerStack from "./CustomerStack";
import SalonStack from "./SalonStack";


const GetStack = ({ stackName }) => {
    console.log("stack name: "+stackName);
    if (stackName === null) { // render login screen
        return <AuthStack/>

    }else if (stackName === "Customer") { // render customer home screen
        return <CustomerStack/>

    } else if (stackName === "Salon") { // render salon homescreen
        return <SalonStack/>
    }else {
       return <CustomerStack/> 
    }
}

const Router = () => {

    const [isSignedIn, setIsSignedIn] = useState(null);
    const [loading, setLoading] = useState(false);

    // callback function that handles the user state changed
    const ouAuthStateChanged = (user) => {
        console.log("onauthstate changed")
        setIsSignedIn(user);
        if (loading) {
              setLoading(false);
        }
      
    }

    useEffect(() => {
        console.log("use effect called")
        const subscriber = auth().onAuthStateChanged(ouAuthStateChanged);

        // cleanup code
        return subscriber;
    }, [])

    if (loading) {
        console.log("loading checked")
        console.log("signed in val "+isSignedIn)
        return null;
    }

    return (
        <>
         {<GetStack stackName={"Salon"}/>}
        </>
       
    );
}

export default Router;