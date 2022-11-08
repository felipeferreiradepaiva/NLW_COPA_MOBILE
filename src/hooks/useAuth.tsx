import { useContext } from 'react';

import { AuthContext, AuthContextDataProps, loadUserToken } from '../context/AuthContext'

export function useAuth(): AuthContextDataProps {
    const context = useContext(AuthContext);    
    return context;
}