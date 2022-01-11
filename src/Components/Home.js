import React, {useEffect} from 'react'
import styled from 'styled-components';
import { useStateValue } from '../ContextApi/StateProvider';

const Home = () => {
    const [initialState, dispatch] = useStateValue();
    const authUser = JSON.parse(initialState.authenticatedUser);
    initialState.WorkoutRequests.getWorkouts(authUser.emailAddress, authUser.password);
    return ( 
        <HomeContainer>
            <h1>Hello world</h1>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
`;

export default Home
