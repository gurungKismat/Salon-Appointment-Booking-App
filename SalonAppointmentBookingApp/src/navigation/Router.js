import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import CustomerStack from './CustomerStack';
import SalonStack from './SalonStack';
import firestore from '@react-native-firebase/firestore';

const GetStack = ({user}) => {
  console.log('user : ' + user);

  if (user === null) {
    return <AuthStack />;
  } else if (user === 'customer') {
    return <CustomerStack />;
  } else if (user === 'salon') {
    return <SalonStack />;
  }

  // async function f1() {
  //   const result = await firestore()
  //     .collection('customers')
  //     .doc(user.uid)
  //     .get();
  //   return result;
  // }

  // const doesCustomerExist = f1().then(snapShot => {
  //   const doesCustomerExist = snapShot.exists;
  //   console.log("the val: "+doesCustomerExist)
  //   return doesCustomerExist;
  // });

  // console.log('does Customer Exists: ' + doesCustomerExist);
};

const Router = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  // callback function that handles the user state changed
  const ouAuthStateChanged = user => {
    console.log('onauthstate changed');

    async function f1() {
      let doesCustomerExist;
      let doesSalonExist;

      await firestore()
        .collection('customers')
        .doc(user.uid)
        .get()
        .then(docSnapshot => {
          doesCustomerExist = docSnapshot.exists;
        });

      await firestore()
        .collection('salons')
        .doc(user.uid)
        .get()
        .then(docSnapshot => {
          doesSalonExist = docSnapshot.exists;
        });

      if (doesCustomerExist) {
        console.log('cusoer exist');
        setIsSignedIn('customer');
        if (loading) {
          setLoading(false);
        }
      } else if (doesSalonExist) {
        console.log('salon exist');
        setIsSignedIn('salon');
        if (loading) {
          setLoading(false);
        }
      } else {
        console.log('doesnot exist');
        setIsSignedIn(null);
        if (loading) {
          setLoading(false);
        }
      }
    }
    if (user !== null) {
      f1();
    } else {
      setIsSignedIn(user);
      if (loading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log('use effect called');
    const subscriber = auth().onAuthStateChanged(ouAuthStateChanged);

    // cleanup code
    return subscriber;
  }, []);

  if (loading) {
    console.log('loading checked');
    console.log('signed in val ' + isSignedIn);
    return null;
  }

  return <>{<GetStack user={isSignedIn} />}</>;
};
export default Router;
