import { HStack, useToast, VStack } from "native-base";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Share } from 'react-native';

import { api } from '../services/api';
import { GameProps } from "../components/Game";

import { Header } from "../components/Header";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";

interface RouteParams {
    id: string
}

export function Details() {
    const [isLoading, setIsLoading] = useState(true); 
    const [poolDetails, setPoolDetail] = useState<PoolCardProps>({} as PoolCardProps); 
    const [optionSelected, setOptionSelected] = useState<'Seus Palpites' | 'Ranking do Grupo'>('Seus Palpites');

    const route = useRoute();
    const toast = useToast();
    const { id } = route.params as RouteParams;

    const { navigate } = useNavigation();
    
    async function fetchPoolDetail() {
        try{
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`);
            setPoolDetail(response.data.pool);

        }catch(error){
            console.log(error);
            toast.show({
                title: 'Não foi possível carregar os detalhes do bolões',
                placement: 'top',
                bgColor: 'red.500'
            });            
        }finally{
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code
        });
    }

    useEffect(() => {
        fetchPoolDetail();
    }, [id])
    
    if(isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header onShare={handleCodeShare} title={poolDetails.title} showBackButton showShareButton />
            {
                poolDetails._count?.participants > 0 ?
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails} />

                    <HStack bgColor={"gray.800"} p={1} rounded={"sm"} fontSize={"xs"} mb={4}>
                        <Option title="Seus palpites" isSelected={optionSelected === 'Seus Palpites'} onPress={() => setOptionSelected('Seus Palpites')} />
                        <Option title="Ranking do Grupo" isSelected={optionSelected === 'Ranking do Grupo'}  onPress={() => setOptionSelected('Ranking do Grupo')} />
                    </HStack>

                    <Guesses poolId={poolDetails.id} code={poolDetails.code} />
                </VStack>
                :
                <EmptyMyPoolList code={poolDetails.code}  />
            }
        </VStack>
    );
}