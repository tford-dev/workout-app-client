import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from './Form';
import Exercise from './Exercise';
import NewExercise from './NewExercise'
import SetRow from './SetRow';
import { useStateValue } from '../ContextApi/StateProvider';

const ExercisePage = (props) => {
    const [errors, setErrors] = useState([]);
    const [exercise, setExercise] = useState({});
    const [sets, setSets] = useState([])
    const [repetitions, setRepetitions] = useState(0);
    const [initialState, dispatch] = useStateValue();
    const authUser = JSON.parse(initialState.authenticatedUser);

    useEffect(()=>{
        initialState.ExerciseRequests.getExercise(
            props.match.params.workoutId,
            props.match.params.id,
            authUser.emailAddress, 
            authUser.password
        ).then(
            response => setExercise(response)
        ).catch(err => {
            console.log('Error' + err);
        })
    }, [])

    useEffect(()=>{
        initialState.SetsRequests.getSets(
            props.match.params.workoutId,
            props.match.params.id,
            authUser.emailAddress,
            authUser.password
        ).then(
            response => setSets(response)
        ).catch(err => {
            console.log('Error ' + err);
        })
    },[])

    const updateSets = () => {
        initialState.SetsRequests.getSets(
            props.match.params.workoutId,
            props.match.params.id,
            authUser.emailAddress,
            authUser.password
        ).then(
            response => setSets(response)
        ).catch(err => {
            console.log('Error ' + err);
        })
    }

    const deleteThisExercise = () => {
        let workoutId = props.match.params.workoutId;
        let id = props.match.params.id;
        console.log(workoutId)
        console.log(id)
        if(window.confirm("Are sure you want to delete this exercise? Once deleted, it can not be retrieved.")){
            initialState.ExerciseRequests.deleteExercise(workoutId, id, authUser.emailAddress, authUser.password)
                .then((response) =>{
                    if(response === 'success'){
                        alert("Exercise deleted.")
                        props.history.push(`/workouts/${workoutId}`);
                    } else {
                        props.history.push('/error');
                    }
                }).catch(err => {
                    console.log(err);
                    props.history.push('/error');
                })
        }
    }

    const toEditPage = () => {
        props.history.push(
            `/workouts/${props.match.params.workoutId}/exercises/${props.match.params.id}/edit`
        )
    }

    const change = (event, setState) => {
        const value = event.target.value;
        setState(value);
        console.log(repetitions);
    }

    const cancel = () => {
        props.history.push(`/workouts/${props.match.params.workoutId}`)
    }

    const submit = () => {
        let workoutId = parseInt(props.match.params.workoutId);
        let exerciseId = parseInt(props.match.params.id);
        const reps = {
            repetitions,
        };
    
        initialState.SetsRequests.createSet(reps, workoutId, exerciseId, authUser.emailAddress, authUser.password)
            .then((response)=> {
                if (response === "success"){
                    console.log(`${authUser.emailAddress} logged set: ${reps}`);
                    updateSets()
                } else if (response === "forbidden") {
                    setErrors([...errors, "You do not have permission to log set."]);
                } else {
                    setErrors([...errors, response])
                    console.log(errors);
                }
            }).catch(err => {
                setErrors([...errors, err])
            })
    }

    const indexArr = sets.map((set, i) => {
        return <SetRow
                    key={i}
                    id={set.id}
                    workoutId={props.match.params.workoutId}
                    exerciseId={props.match.params.id}
                    index={(sets.length) - i}
                    repetitions={set.repetitions}
                    callback={updateSets}
                />
    })

    console.log(props.match)
    return (
        <ExercisePageContainer>
            <ExerciseContentContainer>
                <ExerciseHeader>Exercise: {exercise.title}</ExerciseHeader>
                <ExerciseButtonContainer>
                    <EditButton onClick={toEditPage}>
                        <p>Edit Exercise</p>
                    </EditButton>
                    <DeleteButton onClick={deleteThisExercise}>
                        <p>Delete Exercise</p>
                    </DeleteButton>
                </ExerciseButtonContainer>
                <ExerciseForm>
                    <Form
                        cancel={cancel}
                        submit={submit}
                        submitButtonText="Log Set"
                        elements={() => (
                        <React.Fragment>
                            {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                            <FormRow>
                                <FormLabel htmlFor="repNumber">Enter Reps:</FormLabel>
                                <Input
                                    id="repNumber"
                                    name="repNumber"
                                    type="number"
                                    onChange={(e)=> change(e, setRepetitions)}
                                    required 
                                />
                            </FormRow>
                        </React.Fragment>
                        )}
                    />
                </ExerciseForm>
                {indexArr}
            </ExerciseContentContainer>
        </ExercisePageContainer>
    )
}

const ExercisePageContainer = styled.div`
    width: 90%;
    background-color: #424242;
    margin: auto;
    color: #fff;
    padding-top: 1px;
    border-radius: 8px;
`;

const ExerciseContentContainer = styled.div`
    width: 90%;
    margin: auto;
`;

const ExerciseHeader = styled.h2`
    border-bottom: 1px solid #787878;
`;

const ExerciseButtonContainer = styled.div`
    border-bottom: 1px solid #787878;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;
`;

const EditButton = styled.div`
    margin-top: -15px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #00661b;
    & > p {
        margin-right: 10px;
        margin-left: 10px;
    }
    &:hover {
        color: #00661b;
        background-color: #fff;
    }
`;

const DeleteButton = styled.div`
    margin-top: -15px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #c20000;
    & > p {
        margin-right: 10px;
        margin-left: 10px;
    }
    &:hover {
        color: #c20000;
        background-color: #fff;
    }
`;

const ExerciseForm = styled.div`
    padding-bottom: 5px;
    margin-top: -20px;
`;

const FormRow = styled.div`
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
`;

const FormLabel = styled.label`
    border: none;
`;

const Input = styled.input`
    width: 65%;
    background: #424242;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    color: #fff;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 13px;
    margin-top: -7.5px;
    margin-bottom: -7.5px;
`;

export default ExercisePage