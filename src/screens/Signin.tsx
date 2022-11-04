import { Center, Text, Icon } from "native-base";
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

import Logo from '../assets/logo.svg';

import { Button } from '../components/Button';

export function SignIn() {
    const { signIn, user } = useAuth();
    
    return(
        <Center flex={1} bgColor="gray.900" p={7}>        
            <Logo width={212} height={40} />  
            <Button 
                title="ENTRAR COM GOOGLE"
                type="SECONDARY"
                leftIcon={<Icon as={Fontisto} name="google" color="white" size="md"/> }
                mt={12}
                onPress={signIn}
             />
             <Text color="white" textAlign="center" px={8} mt={4}>Não utilizamos nenhuma informação além do seu e-mail para criação da sua conta.</Text>
        </Center>
    )
}