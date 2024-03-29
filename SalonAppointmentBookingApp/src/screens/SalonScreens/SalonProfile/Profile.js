import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Image, Divider, Heading, Icon} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import AnimatedLoader from 'react-native-animated-loader';
import storage from '@react-native-firebase/storage';

const Profile = () => {
  const [salonInfo, setSalonInfo] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [pickerResponse, setPickerResponse] = useState(null);
  const [loadAnimation, setLoadAnimation] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // logout user from their account
  const signOut = () => {
    setLoadAnimation(true);
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  // get the image url
  const getImageUrl = async reference => {
    const iamgeDownloadUrl = await reference.getDownloadURL();
    setDownloadUrl(iamgeDownloadUrl);
  };

  // uploads the image to firebase storage
  async function uploadsalonImage(response) {
    const imageUri = response.assets[0].uri;
    // console.log('image Uri: ' + imageUri);
    const filename = response.assets[0].fileName;
    // console.log('file name: ' + filename);
    // const reference = storage().ref(filename);
    const reference = storage().ref().child('/salonImages').child(filename);

    // console.log('reference: ' + reference);
    try {
      await firestore()
        .collection('salons')
        .doc(auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const salonData = documentSnapshot.data();
            // console.log('slaon data: ' + JSON.stringify(salonData));
            if (salonData.salonImage != undefined) {
              // console.log('not udefined');
              // console.log('initial refernece: ' + reference);
              // console.log('ending refernece: ' + salonData.salonImage);
              const ref = storage().refFromURL(
                'gs://salon-appointment-booking-app.appspot.com/salonImages/' +
                  salonData.salonImage,
              );

              ref.delete().then(() => {
                console.log('image deleted');
              });
            }
          }
        });

      const task = reference.putFile(imageUri);
      task.then(async () => {
        await firestore()
          .collection('salons')
          .doc(auth().currentUser.uid)
          .update({
            salonImage: filename.toString(),
          });
        // getImageUrl(reference);
        const downloadURL = await reference.getDownloadURL();
        setDownloadUrl(downloadURL);
        // console.log('donwload url : ' + downloadURL);
      });
    } catch (e) {
      console.error(e);
    }
  }

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response: ' + JSON.stringify(response));

      if (!response.didCancel) {
        // firestore()
        //   .collection('salons')
        //   .doc(auth().currentUser.uid)
        //   .update({
        //     // salonImage:  response.assets[0].uri
        //   })
        //   .then(() => {
        //     // console.log('Image uploaded!');
        //     setPickerResponse(response);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });

        // const imageUri = response.assets[0].uri;
        uploadsalonImage(response);
      }
    });
  }, []);

  useEffect(() => {
    console.log('use effect of profile settings');
    firestore()
      .collection('salons')
      .doc(auth().currentUser.uid)
      .onSnapshot(document => {
        if (document.exists) {
          console.log('exist');
          const salonDatas = document.data();
          console.log('salon document data: ' + JSON.stringify(salonDatas));
          setSalonInfo(salonDatas);
          if (salonDatas.salonImage !== undefined) {
            const reference = storage()
              .ref()
              .child('/salonImages')
              .child(salonDatas.salonImage);
            getImageUrl(reference);
          }
          if (loading) {
            setLoading(false);
          }
        }
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={'#6366f1'} />
      <View style={styles.mainContainer}>
        <AnimatedLoader
          visible={loadAnimation}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../../assets/50124-user-profile.json')}
          animationStyle={{width: 120, height: 120}}
          speed={1}>
          <Text color="black">Updating Salon Profile...</Text>
        </AnimatedLoader>
        <View style={styles.topContainer}>
          <View style={styles.topItems}>
            <View style={styles.imageStyle}>
              {downloadUrl === null || downloadUrl === undefined ? (
                <Image
                  size={40}
                  borderRadius={100}
                  resizeMode="cover"
                  source={require('../../../assets/icons/gallerydefault.png')}
                  alt={'Salon Profile Picture'}
                />
              ) : (
                <Image
                  size={40}
                  borderRadius={100}
                  resizeMode="cover"
                  source={{uri: downloadUrl}}
                  alt={'Salon Profile Picture'}
                />
              )}
              <Icon
                as={<MaterialCommunityIcon name={'camera-plus'} />}
                size={8}
                right={5}
                top={10}
                color="muted.200"
                onPress={onImageLibraryPress}
              />
            </View>
            <View style={styles.basicInfo}>
              <Text style={{color: 'white', fontSize: 20, alignSelf: 'center'}}>
                {salonInfo.salonName}
              </Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {salonInfo.address}
              </Text>
            </View>
            <View style={styles.topContainerButtons}>
              <TouchableOpacity
                style={styles.editProfileBtn}
                onPress={() =>
                  navigation.navigate('ProfileSettings', salonInfo)
                }>
                <Text style={{color: 'white'}}>Edit Profile</Text>
              </TouchableOpacity>
              <Divider orientation="vertical" mx="1" />
              <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
                <Text style={{color: 'white'}}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={styles.bottomContainer}>
          <View style={styles.bottomItemColumn}>
            <View style={styles.email}>
              <Icon
                as={<MaterialCommunityIcon name={'email'} />}
                size={7}
                right={3}
                color="muted.500"
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: 'black', fontSize: 17}}>Email</Text>
                <Text style={{color: 'black', fontSize: 17}}>
                  {/* grgkismat78@gmail.com */}
                  {salonInfo.email}
                </Text>
              </View>
            </View>
            <Divider bg="light.300" my="3" />
            <View style={styles.email}>
              <Icon
                as={<MaterialCommunityIcon name={'cellphone'} />}
                size={7}
                right={3}
                color="muted.500"
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: 'black', fontSize: 17}}>Mobile</Text>
                <Text style={{color: 'black', fontSize: 17}}>
                  {salonInfo.mobileNo}
                </Text>
              </View>
            </View>
            <Divider bg="light.300" my="3" />
            <View style={styles.email}>
              <Icon
                as={<MaterialCommunityIcon name={'information'} />}
                size={7}
                right={3}
                color="muted.500"
              />
              <View style={{flexDirection: 'column', paddingHorizontal: 5}}>
                <Text style={{color: 'black', fontSize: 17}}>About</Text>
                <Text
                  style={{color: 'black', fontSize: 17, textAlign: 'justify'}}>
                  {/* Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. */}
                  {salonInfo.about}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },

  topContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#6366f1',
  },

  topItems: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  basicInfo: {
    marginTop: 10,
  },

  topContainerButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  editProfileBtn: {
    width: '30%',
    backgroundColor: '#4338ca',
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
  },

  signOutBtn: {
    width: '30%',
    backgroundColor: '#4338ca',
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
  },

  bottomContainer: {
    flex: 1,
  },

  bottomItemColumn: {
    flexDirection: 'column',
    padding: 25,
  },

  email: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  mobile: {
    flexDirection: 'row',
  },
});

const profileStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },

  topContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topItemColumn: {
    flexDirection: 'column',
    marginTop: 10,
  },

  topContentContainer: {
    flexDirection: 'column',
  },

  editProfilBtn: {
    marginVertical: 10,
    backgroundColor: 'red',
    paddingVertical: 15,
    width: '30%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    marginTop: 5,
    flexDirection: 'column',
  },
});

// import React, {useState, useCallback} from 'react';
// import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';

// const Test = () => {
//   const [pickerResponse, setPickerResponse] = useState(null);
//   const [visible, setVisible] = useState(false);

//   const onImageLibraryPress = useCallback(() => {
//     const options = {
//       selectionLimit: 1,
//       mediaType: 'photo',
//       includeBase64: false,
//     };
//     ImagePicker.launchImageLibrary(options, setPickerResponse);
//   }, []);

//   const onCameraPress = React.useCallback(() => {
//     const options = {
//       saveToPhotos: true,
//       mediaType: 'photo',
//       includeBase64: false,
//     };
//     ImagePicker.launchCamera(options, setPickerResponse);
//   }, []);

//   if (pickerResponse !== null) {
//     var uri = pickerResponse.assets[0].uri;
//     console.log("uri: "+uri)
//   }
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <TouchableOpacity onPress={onImageLibraryPress}>
//         <Text style={{color: 'black'}}>Select Image</Text>
//       </TouchableOpacity>

//       <Text style={{color: 'black', marginTop: 20}}>
//         {JSON.stringify(pickerResponse)}
//       </Text>
//       {pickerResponse !== null ? (
//         <Text style={{color: 'red', marginTop: 20}}>
//           {JSON.stringify(pickerResponse.assets[0].width)}
//         </Text>
//       ) : (
//         <Text />
//       )}

//       {pickerResponse !== null ? (
//         <Image
//           style={{marginTop: 10, width: 200, height: 200}}
//           source={{
//             uri: uri,
//           }}
//         />
//       ) : (
//         <Text />
//       )}
//     </View>
//   );
// };

// export default Test;
