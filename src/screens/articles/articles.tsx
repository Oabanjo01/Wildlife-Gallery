import {View, Text, ScrollView, Platform, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import {Colors} from '@app/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import ArticlesPage from '@assets/images/ArticlesPage.svg';
import Backbutton from '@app/utilities/backbutton';
import {ScreenProps} from '@app/navigation/navigation';
import {PhotographyData} from '@app/constants/data/homepage';

const Articles = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.screenColor,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never">
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.1, 1]}
          colors={['#61D2C4', '#29D890']}
          style={{
            opacity: 1,
            height: dashboardHeight,
            width: screenWidth,
          }}>
          <View style={{position: 'absolute', right: 0}}>
            <ArticlesPage />
          </View>

          <View
            style={{
              position: 'absolute',
              left: screenWidth * 0.05,
              right: screenWidth * 0.05,
              bottom: -dashboardHeight * 0.1,
              flexDirection: 'row',
              backgroundColor: Colors.whiteColor,
              alignItems: 'center',
              borderRadius: 40,
              paddingHorizontal: screenWidth * 0.03,
              ...Platform.select({
                ios: {
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowOffset: {width: 1, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                },
                android: {
                  elevation: 7,
                },
              }),
            }}>
            <Ionicons
              size={26}
              style={{marginLeft: 10}}
              color={Colors.primary}
              name={'search-outline'}
            />
            <TextInput
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              selectionColor={Colors.primary}
              cursorColor={Colors.primary}
              maxLength={24}
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                borderColor: 'transparent',
              }}
            />
          </View>
        </LinearGradient>
        <Backbutton />
        <View
          style={{
            marginTop: screenHeight * 0.09,
            height: screenHeight * 0.36,
            marginHorizontal: screenWidth * 0.05,
            borderRadius: 20,
            overflow: 'hidden',
            flexDirection: 'column-reverse',
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.5,
                shadowRadius: 5,
              },
              android: {
                elevation: 5,
                shadowColor: Colors.primary,
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 20,
              },
            }),
          }}>
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              height: screenHeight * 0.15,
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
            }}>
            <Text
              style={{
                textAlign: 'justify',
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                marginHorizontal: 10,
                marginTop: 5,
              }}>
              Plants are nature's marvels, providing oxygen and beauty to our
              surroundings.
            </Text>
            <View></View>
          </View>
          <Image
            style={{
              flex: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: screenWidth,
              alignSelf: 'center',
            }}
            source={require('../../../assets/images/sampleplant3.jpg')}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Articles;
