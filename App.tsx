import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { AuthContextProvider } from './src/context/AuthContext';

import { SignIn } from './src/screens/Signin';
import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      { fontsLoaded ? <SignIn /> : <Loading />}        
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24
  }
});
