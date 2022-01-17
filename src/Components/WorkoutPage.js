import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import Exercise from './Exercise';
import NewExercise from './NewExercise'
import { useStateValue } from '../ContextApi/StateProvider';

const WorkoutPage = (props) => {
    const [initialState, dispatch] = useStateValue();
    const [workout, setWorkout] = useState({});
    const authUser = JSON.parse(initialState.authenticatedUser);
    const [exercises, setExercises] = useState([]);
    const indexArr = exercises.map(exercise => {
        return <Exercise
                    key={exercise.id}
                    workoutId={props.match.params.id}
                    id={exercise.id}
                    title={exercise.title}
                />
    })

    useEffect(()=>{
        initialState.WorkoutRequests.getWorkout(props.match.params.id, authUser.emailAddress, authUser.password).then(
            response => setWorkout(response)
        ).catch(err => {
            console.log('Error' + err);
        })
    }, [])

    useEffect(()=>{
        initialState.ExerciseRequests.getExercises(props.match.params.id, authUser.emailAddress, authUser.password).then(
            response => setExercises(response),
        ).catch(err => {
            console.log('Error ' + err);
        })
    }, [])

    const updateExercises = () => {
        initialState.ExerciseRequests.getExercises(props.match.params.id, authUser.emailAddress, authUser.password).then(
            response => setExercises(response),
        ).catch(err => {
            console.log('Error ' + err);
        })
    }

    const openForm = () => {
        dispatch({
            type: 'SET_EXERCISE_FORM_OPEN',
            exerciseFormOpen: true
        })
    }

    const closeForm = () => {
        dispatch({
            type: 'SET_EXERCISE_FORM_OPEN',
            exerciseFormOpen: false
        })
    }

    const deleteWorkout = () => {
        if(authUser.userId === workout.userId){
            if(window.confirm("Are sure you want to delete this workout? Once deleted, it can not be retrieved.")){
                initialState.WorkoutRequests.deleteWorkout(workout.id, authUser.emailAddress, authUser.password)
                    .then((response) =>{
                        if(response === 'success'){
                            props.history.push('/home');
                            alert("Workout deleted.")
                        } else {
                            props.history.push('/error');
                        }
                    }).catch(err => {
                        console.log(err);
                        props.history.push('/error');
                    })
            }
        } else {
            alert("You are not authorized to delete this workout.")
        }
    }

    return (
        authUser ? (
            <WorkoutContainer>
                <WorkoutContentContainer>
                    <h1>{workout.title}</h1>
                    <p style={{marginTop: '-15px'}}>{workout.description}</p>
                    <p style={{marginTop: '-5px'}}>{workout.time}</p>
                    {
                        initialState.exerciseFormOpen ? (
                            <NewExercise workoutId={props.match.params.id} updateFunction={updateExercises} />
                        ) : (
                            null
                        )
                    }
                    
                    <WorkoutExerciseContainer>
                        <WorkoutButtonContainer>
                            {
                                initialState.exerciseFormOpen ? (
                                    <WorkoutNewButton tabIndex={1} onClick={closeForm} style={{backgroundColor: '#ffb300'}}>
                                        <p><i className="fas fa-times-circle"></i> Cancel</p>
                                    </WorkoutNewButton>
                                ) : (
                                    <WorkoutNewButton tabIndex={1} onClick={openForm}>
                                        <p><i className="fas fa-plus-circle"></i> Add Exercise</p>
                                    </WorkoutNewButton>
                                )
                            }
                            <WorkoutEditButton tabIndex={1}>
                                <Link to={`/workouts/${props.match.params.id}/edit`} className='link'>
                                    <p ><i className="fas fa-edit"></i> Edit Workout</p>
                                </Link>
                            </WorkoutEditButton>
                            <WorkoutDeleteButton tabIndex={1} onClick={deleteWorkout}>
                                <p><i className="fas fa-trash-alt"></i> Delete</p>
                            </WorkoutDeleteButton>
                        </WorkoutButtonContainer>
                        {indexArr}
                    </WorkoutExerciseContainer>
                </WorkoutContentContainer>
            </WorkoutContainer>
        ) : (
            <Redirect to="/sign-in" />
        )
    )
}

const WorkoutContainer = styled.div`
    width: 90%;
    background-color: #424242;
    margin: auto;
    padding-top: 1px;
    border-radius: 8px;
    color: #fff;
    text-align: center;
`;

const WorkoutContentContainer = styled.div`
    width: 90%;
    text-align: center;
    margin: auto;
    padding-top: 1px;
`;

const WorkoutButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const WorkoutEditButton = styled.div`
    width: 30%;
    background-color: #00d0ff;
    color: #787878;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #787878;
        color: #00d0ff;
    }
`;

const WorkoutDeleteButton = styled.div`
    width: 30%;
    background-color: #c20000;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #ffffff;
        color: #c20000;
    }
`;

const WorkoutNewButton = styled.div`
    width: 30%;
    background-color: #00cc07;
    color: #787878;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #787878;
        color: #00cc07;
    }
`

const WorkoutExerciseContainer = styled.div`
    width: 100%;
    margin: auto;
    padding-bottom: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 15px;
`


export default WorkoutPage;