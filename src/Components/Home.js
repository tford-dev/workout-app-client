/* eslint-disable */ 
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Workout from './Workout';
import NewWorkoutButton from './NewWorkoutButton';
import { useStateValue } from '../ContextApi/StateProvider';
import { Redirect } from 'react-router-dom';

const Home = () => {
    const [initialState, dispatch] = useStateValue();
    const authUser = JSON.parse(initialState.authenticatedUser);
    const [workouts, setWorkouts] = useState([]);
    const indexArr = workouts.map(workout => {
        return <Workout
                    key={workout.id}
                    id={workout.id}
                    title={workout.title}
                    time={workout.time}
                />
    })
    useEffect(async() => {
        await initialState.WorkoutRequests.getWorkouts(authUser.emailAddress, authUser.password).then(
            response => setWorkouts(response),
            dispatch({
                type:"SET_WORKOUTS",
                workouts: workouts
            })
        ).catch(err => {
            console.log('Error' + err);
        })
    }, [])
    
    return ( 
        authUser ? (
            <HomeContainer>
                <NewWorkoutButton tabIndex={1}/>
                {indexArr}
            </HomeContainer>
        ) : (
            <Redirect to="/sign-in" />
        )
    )
}

const HomeContainer = styled.div`
    color: white;
    max-width: 90%;
    margin: auto;
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 15px;
`;

export default Home
