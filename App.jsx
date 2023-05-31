import { Provider as NativeProvider } from 'react-native-paper';
import MenuScreen from './src/screens/MenuScreen';
import { useColorScheme } from 'react-native';


export default function App() {
  const theme = useColorScheme();

  return (
    <NativeProvider
      theme={theme}
    ><MenuScreen/></NativeProvider>
    
  );
}
