import './src/lib/dayjs'
import { StyleSheet, StatusBar } from 'react-native';
import Loading from './src/components/Loading';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Routes } from './src/routes/index,';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold
  });

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <>
      <Routes />
      <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#ffd'
  }
});
