import {Colors as StaticColors, Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {Divider} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WText from './customText';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {toggleTheme} from '@app/redux/actions/actions';
import {getThemeColor} from '@app/constants/colors';

interface DropDownData {
  label: string;
  value: string;
}
interface DropDownProps {
  color?: string;
}
const DropDown = (props?: DropDownProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const data: DropDownData[] = [
    {label: 'Cart', value: 'cart'},
    {label: 'Theme', value: 'theme'},
    {label: 'Settings', value: 'settings'},
  ];

  const dispatch = useDispatch();
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const styles = StyleSheet.create({
    dropDownItem: {
      paddingHorizontal: screenWidth * 0.04,
    },
    dropdown: {
      backgroundColor: Colors.screenColor,
      position: 'absolute',
      left: screenWidth * 0.55,
      borderRadius: 20,
      paddingVertical: 8,
      width: screenWidth * 0.4,
    },
  });

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);

    if (value === 'theme') {
      dispatch(toggleTheme(theme === 'light' ? 'dark' : 'light'));
    } else if (value === 'cart') {
      navigation.navigate(Routes.CartScreen);
    } else if (value === 'settings') {
      dispatch(toggleTheme('system'));
    }
    // else if (value === 'system') {
    //   console.log(value, systemTheme);
    //   dispatch(toggleTheme(systemTheme === 'light' ? 'light' : 'dark'));
    // }
  };

  // TODO: display different floating drop down lists based on where user is in different screens

  // TODO: Alert modal to confirm deletion of account, then dispatch log out

  // TODO: Edit modal to change username, email and password
  return (
    <View
      style={{
        position: 'absolute',
        top: screenHeight * 0.07,
        right: screenWidth * 0.03,
      }}>
      <SelectDropdown
        data={data}
        statusBarTranslucent
        renderItem={(
          selectedItem: DropDownData,
          index: number,
          isSelected: boolean,
        ) => {
          return (
            <View
              style={{
                ...styles.dropDownItem,
                borderBottomWidth: 1,
                borderBottomColor: Colors.primary,
              }}>
              <WText
                style={{
                  paddingVertical: 13,
                  paddingLeft: 5,
                  fontSize: 18,
                }}>
                {selectedItem.label}
              </WText>
            </View>
          );
        }}
        dropdownOverlayColor="transparent"
        renderButton={() => {
          return (
            <View
              style={{
                alignItems: 'flex-end',
                backgroundColor: Colors.lighterBlack,
                borderRadius: 100,
                padding: 5,
              }}>
              <Ionicons
                name="ellipsis-vertical"
                color={Colors.primary}
                size={30}
              />
            </View>
          );
        }}
        onSelect={(selectedItem: DropDownData, index: number) => {
          handleOptionSelect(selectedItem.value);
        }}
        dropdownStyle={styles.dropdown}
      />
    </View>
  );
};

export default DropDown;
