import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function Routes() {
    return (
        <GestureHandlerRootView className='flex-1 bg-background'>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}