import {LargeButton} from '@app/components/login/buttons';
import TextFields from '@app/components/login/textInput';
import {Routes} from '@app/constants';
import {Colors} from '@app/constants/colors';
import {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import {ScreenProps} from '@app/navigation/navigation';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import {APP_NAME, API_KEY, COMPANY_EMAIL} from '@env';
import {useLogin} from '@app/utilities/hooks/authentication/useLogin';

const LoginScreen = ({navigation}: ScreenProps) => {
  const [emailPlacHolder, setEmailPlaceHolder] = useState('email');
  const [passwordPlacHolder, setPasswordPlaceHolder] = useState('password');
  const [checked, setChecked] = useState(false);
  const [validateChange, setValidateChange] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(true);
  const [userAuthState, setUserAuthState] = useState<boolean>(false);

  const handleFieldBlur = (fieldName: any) => {};
  const {handleLogin, isLoading, setIsLoading} = useLogin();

  useEffect(() => {
    setUserAuthState(false);
    // Implement splash screen then redirection of user
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        setUserAuthState(true);
        navigation.navigate(Routes.Home);
      }
      setUserAuthState(true);
    });
    setUserAuthState(true);
    return unsubscribe;
  }, []);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .trim()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return userAuthState ? (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnBlur
      validateOnChange={validateChange}
      validationSchema={loginValidationSchema}
      onSubmit={values => {
        setValidateChange(true);
        handleLogin(values, navigation);
      }}>
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        isSubmitting,
        isValid,
        touched,
      }) => (
        <View style={styles.container}>
          <Text
            style={{
              color: Colors.primaryTextColor,
              fontSize: 30,
              fontFamily: 'OpenSans-SemiBold',
              marginBottom: 6,
            }}>
            Hello
          </Text>
          <Text style={[styles.textStyle, {marginBottom: '7%'}]}>
            Let’s Learn More About Plants
          </Text>
          <TextFields
            onFocused={() => setEmailPlaceHolder('')}
            placeHolderText={emailPlacHolder}
            valueText={values.email}
            keyboardType="email-address"
            labelText="Email"
            onBlur={e => handleFieldBlur('email')}
            callBack={handleChange('email')}
          />
          {isValid === false && isValidEmail === false && (
            <Text style={{fontSize: 12, color: 'red'}}>{errors.email}</Text>
          )}
          <TextFields
            onFocused={() => setPasswordPlaceHolder('')}
            placeHolderText={passwordPlacHolder}
            valueText={values.password}
            labelText="Password"
            onBlur={e => handleFieldBlur('password')}
            callBack={handleChange('password')}
            displayRightIcon
            togglePasswordDisplay={() => setDisplayPassword(!displayPassword)}
            displayPassword={displayPassword}
          />
          {isValid === false && isValidPassword === false && (
            <Text style={{fontSize: 12, color: 'red'}}>{errors.password}</Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                color={Colors.primary}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
              />
              <Text style={styles.textStyle}>Remember me</Text>
            </View>
            <Text style={styles.textStyle}>Forgot Password?</Text>
          </View>
          <Text>
            {API_KEY}
            {APP_NAME}
            {COMPANY_EMAIL}
          </Text>
          <LargeButton
            text={isLoading ? 'Loading...' : 'Log in'}
            extraStyle={
              isLoading ? styles.loadingButtonStyle : styles.loginButtonStyle
            }
            onPress={
              !isLoading
                ? () => {
                    Keyboard.dismiss();
                    loginValidationSchema.validate(values).then(async () => {
                      setIsValidEmail(true);
                      setIsValidPassword(true);
                    });
                    handleSubmit();
                  }
                : () => {}
            }
          />
          <View
            style={{
              alignItems: 'center',
              marginTop: '4%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.textStyle}>Don’t Have Account? </Text>
            <TouchableOpacity
              onPress={values => {
                navigation.navigate(Routes.SignUp);
              }}
              activeOpacity={0.9}>
              <Text style={{color: Colors.primary}}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  ) : (
    <ActivityIndicator />
  );
};

export const styles = StyleSheet.create({
  loginButtonStyle: {
    alignItems: 'center',
    marginTop: '7%',
  },
  loadingButtonStyle: {
    alignItems: 'center',
    marginTop: '7%',
    backgroundColor: Colors.disabledButtonColor,
  },
  container: {
    backgroundColor: Colors.screenColor,
    flexDirection: 'column',
    paddingTop: '15%',
    paddingLeft: '7%',
    paddingRight: '7%',
    flex: 1,
  },
  textStyle: {
    color: Colors.primaryTextColor,
    fontFamily: 'OpenSans-Regular.ttf',
  },
});
export default LoginScreen;
