import { useState } from "react";

import { api } from "../services/api";

import { Heading, VStack, Text, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import Logo from '../assets/logo.svg';
import { Button } from "../components/Button";
import { isLoaded } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export function Find(){
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('')
    const { navigate } = useNavigation();

    const toast = useToast();

    async function handleJoinPool(){        
        try{
            setIsLoading(true);
            if(!code.trim())
            {
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            const response = await api.post('/pools/join', { code })
            toast.show({
                title: 'Você entrou no bolão com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            });

            navigate('pools')            

        }catch(error) {
            console.log(error);

            if(error.response?.data?.message === 'Pool not found.'){
                return toast.show({
                    title: 'Bolão não encontrado!',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            if(error.response?.data?.message === 'You alredy joined this pool.'){
                return toast.show({
                    title: 'Você já está nesse bolão.',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            toast.show({
                title: 'Não foi possivel encontrar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false);
        }
    } 
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">                
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} px={1} textAlign="center">
                    Encontre um bolão através de seu código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o código do seu bolão?"   
                    autoCapitalize="characters"                    
                    onChangeText={setCode}
                    value={code}
                />
                
                <Button
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
            </VStack>            
        </VStack>
    )
}