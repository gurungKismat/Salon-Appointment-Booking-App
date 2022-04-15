import React, {useEffect, useState} from 'react';
import {View, Dimensions, Animated, StyleSheet, Text} from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon, Divider} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import ServiceList from './ServicesList';
import {Rating} from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore';

const {event, ValueXY} = Animated;
const scrollY = new ValueXY();


const CutomHeaderScreen = ({data}) => {
  const {salonInfo, salonImage} = data.params;
  const [loading, setLoading] = useState(true);
  const [availableTime, setAvailableTime] = useState('');
  // console.log("salonInfo: "+JSON.stringify(salonInfo))
  // console.log('salon Name: ' + JSON.stringify(salonInfo.salonName) + "id: "+salonInfo.salonId);

  const navigation = useNavigation();

  // display the content in the tab views
  const renderContent = () => (
    <View style={styles.contentContiner}>
      <View style={styles.basicInfo}>
        <Text style={{fontSize: 22, color: 'black', fontWeight: '500'}}>
          {/* Reaver Salon */}
          {salonInfo.salonName}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Rating
            type="custom"
            ratingBackgroundColor="silver"
            tintColor="white"
            ratingColor="blue"
            readonly
            imageSize={24}
            style={{paddingVertical: 5}}
          />
          <Text style={{fontWeight: 'bold', color: 'black', marginStart: 5}}>
            4.5
          </Text>
        </View>
        <Text style={styles.basicInfoTxt}>{salonInfo.address}</Text>
        <Text style={styles.basicInfoTxt}>Available Time: {availableTime}</Text>
      </View>
      <Divider thickness={2} my={2} bg="coolGray.200"/>
      <View style={styles.description}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
          About
        </Text>
        <Text style={styles.descriptionText}>{salonInfo.about}</Text>
      </View>
    </View>
  );

  // displays the salon services
  const renderServices = () => {
    return (
      <View style={styles.contentContiner}>
        <ServiceList salonId={salonInfo.salonId} />
      </View>
    );
  };

  // header customization
  const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.headerCotainer}>
        <View style={styles.headerWrapper}>
          <Icon
            ml="1"
            size="7"
            color="white"
            onPress={() => navigation.goBack()}
            as={<MaterialCommunityIcon name="arrow-left" />}
          />
          <Text style={styles.headerText}>Salon Info</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    console.log('customer tabbar useeffect');
    firestore()
      .collection('salonProfile')
      .doc(salonInfo.salonId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const salonAvailableTime =
            documentSnapshot.data().data.salonAvailability.availableTime;
          // console.log('result: ' + JSON.stringify(salonAvailableTime));
          setAvailableTime(salonAvailableTime);
          if (loading) {
            setLoading(false);
          }
        }else {
          // console.log("salon doesnnot exist")
          setLoading(false);
        }
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <StickyParallaxHeader
      headerType="TabbedHeader"
      backgroundImage={{
        // uri:  'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
        uri: salonImage,
      }}
      backgroundColor={'#6366f1'}
      header={renderHeader}
      title={salonInfo.salonName}
      titleStyle={styles.titleStyle}
      foregroundImage={{
        uri: 'https://starwars.png',
      }}
      tabs={[
        {
          title: 'About',
          content: renderContent(),
        },
        {
          title: 'Services',
          content: renderServices(),
        },
      ]}
      tabTextContainerStyle={styles.tabTextContainerStyle}
      tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
      tabTextStyle={styles.tabTextStyle}
      tabTextActiveStyle={styles.tabTextActiveStyle}
      tabWrapperStyle={styles.tabWrapperStyle}
      tabsContainerStyle={styles.tabsContainerStyle}
      scrollEvent={event([{nativeEvent: {contentOffset: {y: scrollY.y}}}], {
        useNativeDriver: false,
      })}
    />
  );
};

export default CutomHeaderScreen;

const styles = StyleSheet.create({
  headerCotainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6366f1',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 20,
    height: 20,
  },
  headerText: {
    color: 'white',
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: '#e8ecf1',
  },
  tabTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },
  tabTextActiveStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'black',
  },
  tabWrapperStyle: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  tabsContainerStyle: {
    paddingHorizontal: 10,
  },
  contentContiner: {
    marginTop: 15,
    padding: 3,
    marginBottom: 10,
    backgroundColor: '#f9fafb'
  },

  basicInfo: {
    backgroundColor: '#f9fafb',
    padding: 10,
    flexDirection: 'column',
    // elevation: 4,
    // borderRadius: 10,
  },

  basicInfoTxt: {
    color: 'black',
    fontSize: 17,
  },

  descriptionText: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
  },

  description: {
    // marginTop: 10,
    padding: 10,
    backgroundColor: '#f9fafb',
    // borderTopStartRadius: 10,
    // borderTopStartRadius: 10,
    // elevation: 10,
  },
});
