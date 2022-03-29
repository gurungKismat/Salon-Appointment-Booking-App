import React from 'react';
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
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {

  const navigation = useNavigation();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };



  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'#6200ee'} />
      <View style={styles.topContainer}>
        <View style={styles.topItems}>
          <View style={styles.imageStyle}>
            <Image
              size={40}
              borderRadius={100}
              resizeMode="cover"
              source={require('../../../assets/icons/gallerydefault.png')}
              alt={'Salon Profile Picture'}
            />
            <Icon
              as={<MaterialCommunityIcon name={'camera-plus'} />}
              size={8}
              right={3}
              color="white"
              onPress={() => alert('picture upload')}
            />
          </View>
          <View style={styles.basicInfo}>
            <Text style={{color: 'white', fontSize: 20, alignSelf: 'center'}}>
              Black Paradise
            </Text>
            <Text style={{color: 'white', fontSize: 18}}>Kapan, Kathmandu</Text>
          </View>
          <View style={styles.topContainerButtons}>
            <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate("ProfileSettings")}>
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
                grgkismat78@gmail.com
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
              <Text style={{color: 'black', fontSize: 17}}>934523234</Text>
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
              <Text style={{color: 'black', fontSize: 17, textAlign: 'justify'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#6200ee',
  },

  topItems: {
    flexDirection: 'column',
    alignItems: 'center',
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
    backgroundColor: '#6366f1',
    paddingVertical: 13,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
  },

  signOutBtn: {
    width: '30%',
    backgroundColor: '#6366f1',
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
