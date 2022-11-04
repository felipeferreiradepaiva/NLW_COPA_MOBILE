import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../hooks/useAuth';

import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/Signin'

export function Routes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            { user.name ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    )
}