import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBroser from 'expo-web-browser';
import { api } from '../services/api';
import AsyncStorage  from '@react-native-async-storage/async-storage'

WebBroser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;

}

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextDataProps);

export async function loadUserToken(context: AuthContextDataProps){   
    
        
    const value = await AsyncStorage.getItem('@storage_Key:Token')
    console.log("valor Storage token:",value)
    if(value !== null) {
        api.defaults.headers.common['Authorization'] = `Bearer ${value}`;
        const userInfoResponse = await api.get('/me');
        context.user = userInfoResponse.data.user;
        return context;                    
    }
    else{
        return context;  
    }
        
    
}

export function AuthContextProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false);
    
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: process.env.CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })    

    async function signIn(){
        try{
            setIsUserLoading(true);
            await promptAsync();
        } catch(error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        try{
            setIsUserLoading(true);
            
            const tokenResponse = await api.post('/users', { access_token });
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

            const userInfoResponse = await api.get('/me');
            setUser(userInfoResponse.data.user);

            console.log("Registrando token...")
            await AsyncStorage.setItem('Token', tokenResponse.data.token)
            console.log("Registrado!")               

        }catch (error){
            console.log(error)
        }finally{
            setIsUserLoading(false);
        }
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken);
        }
        (async () => {
            try {
                const value = await AsyncStorage.getItem('Token')   
                console.log('Valor storage: ',value)
                if(value){
                    api.defaults.headers.common['Authorization'] = `Bearer ${value}`;
                    const userInfoResponse = await api.get('/me');
                    setUser(userInfoResponse.data.user);
                }
            } catch(e) {
                console.log("Erro ao consultar storage!")
            }
        }   
        )();          
    },[response]);

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}
