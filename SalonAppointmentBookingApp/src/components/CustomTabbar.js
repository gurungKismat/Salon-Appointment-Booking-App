import React from 'react';
import {View, Dimensions, Animated, StyleSheet, Text} from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import ServiceList from './ServicesList';


const {event, ValueXY} = Animated;
const scrollY = new ValueXY();

const text = {
  biography: `The bounty hunter known as "the Mandalorian" was dispatched by "the Client" and Imperial Dr. Pershing to capture the Child alive, however the Client would allow the Mandalorian to return the Child dead for a lower price.
  The assassin droid IG-11 was also dispatched to terminate him. After working together to storm the encampment the infant was being held in, the Mandalorian and IG-11 found the Child. IG-11 then attempted to terminate the Child. The Mandalorian shot the droid before the he was able to assassinate the Child.
  Shortly after, the Mandalorian took the Child back to his ship. On the way they were attacked by a trio of Trandoshan bounty hunters, who attempted to kill the Child. After the Mandalorian defeated them, he and the Child camped out in the desert for the night. While the Mandalorian sat by the fire, the Child ate one of the creatures moving around nearby. He then approached the bounty hunter and attempted to use the Force to heal one of the Mandalorian's wounds. The Mandalorian stopped him and placed him back into his pod. The next day, the pair made it to the Razor Crest only to find it being scavenged by Jawas. The Mandalorian attacked their sandcrawler for the scavenged parts and attempted to climb it while the Child followed in his pod. However, the Mandalorian was knocked down to the ground`,
  powers: 'Powers and Abilities',
  appearances: 'Appearances',
};

const CutomHeaderScreen = () => {
  const navigation = useNavigation();

  // display the content in the tab views
  const renderContent = x => (
    <View style={styles.contentContiner}>
      <Text style={styles.contentText}>{x}</Text>
    </View>
  );

  // displays the salon services
  const renderServices = serviceList => {
    return (
      <View style={styles.contentContiner}>
        <ServiceList />
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
            size="8"
            color="white"
            onPress={() => navigation.goBack()}
            as={<MaterialCommunityIcon name="arrow-left" />}
          />
          <Text style={styles.headerText}>Salon Info</Text>
        </View>
      </View>
    );
  };

  return (
    <StickyParallaxHeader
      headerType="TabbedHeader"
      backgroundImage={{
        uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
      }}
      backgroundColor={'#6200ee'}
      header={renderHeader}
      title={'Salon Name'}
      titleStyle={styles.titleStyle}
      foregroundImage={{
        uri: 'https://starwars.png',
      }}
      tabs={[
        {
          title: 'About',
          content: renderContent(text.biography),
        },
        {
          title: 'Services',
          content: renderServices(text.powers),
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
    backgroundColor: '#6200ee',
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
    fontSize: 40,
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
    // height: windowHeight,
    marginTop: 10,
    padding: 10,
    marginBottom: 70,
  },
  contentText: {
    fontSize: 16,
    color: 'black',
  },
});
