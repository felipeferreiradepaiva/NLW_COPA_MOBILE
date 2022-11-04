import { Heading, VStack, Text } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import Logo from '../assets/logo.svg';
import { Button } from "../components/Button";

export function Find(){
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
                />
                
                <Button
                    title="BUSCAR BOLÃO"
                />
            </VStack>            
        </VStack>
    )
}