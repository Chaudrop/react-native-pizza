import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavBar from './navbar';
import AuthContext from './context';
import LoadingScreen from '../assets/loading.png';
import LoginScreen from './screens/login';
import RegistrationScreen from './screens/register';
import firebase from './firebase/config';

function SplashScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={LoadingScreen}
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function Router() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'STOP_LOADING':
          return {
            ...prevState,
            isLoading: false,
          };
        case 'RESTORE_USER':
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            user: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: null,
    },
  );

  React.useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            dispatch({ type: 'RESTORE_USER', user: userData });
          })
          .catch(() => {
            dispatch({ type: 'STOP_LOADING' });
          });
      } else {
        dispatch({ type: 'STOP_LOADING' });
      }
    });
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (user) => {
        dispatch({ type: 'SIGN_IN', user });
      },
      signOut: async () => {
        await firebase.auth().signOut();
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (user) => {
        dispatch({ type: 'SIGN_IN', user });
      },
    }),
    [],
  );

  function Screens(contextState) {
    const { isLoading, user, isSignout } = contextState;
    if (isLoading) {
      return (
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      );
    }

    if (user === null) {
      return (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Sign in',
              animationTypeForReplace: isSignout ? 'pop' : 'push',
            }}
          />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </>
      );
    }

    return <Stack.Screen name="Home" component={NavBar} options={{ headerShown: false }} />;
  }

  return (
    <AuthContext.Provider value={{ ...authContext, state }}>
      <NavigationContainer>
        <Stack.Navigator>{Screens(state)}</Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
