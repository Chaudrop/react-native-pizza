import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Button, Image, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavBar from './navbar';
import AuthContext from './context';
import LoadingScreen from '../assets/loading.png';

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

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function Router() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('access_token');
      } catch (error) {
        userToken = null;
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        try {
          await SecureStore.setItemAsync('access_token', 'dummy-auth-token');
        } catch (error) {
          // empty
        }
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async () => {
        try {
          await SecureStore.setItemAsync('access_token', 'dummy-auth-token');
        } catch (error) {
          // empty
        }
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  function Screens(contextState) {
    const { isLoading, userToken, isSignout } = contextState;
    if (isLoading) {
      return (
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      );
    }

    if (userToken == null) {
      return (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: 'Sign in',
            animationTypeForReplace: isSignout ? 'pop' : 'push',
          }}
        />
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
