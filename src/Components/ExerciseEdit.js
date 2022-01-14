import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Form from './Form';
import { useStateValue } from '../ContextApi/StateProvider';

const ExerciseEdit = (props) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [exercise, setExercise] = useState({});
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

    const change = (event, setState) => {
        const value = event.target.value;
        setState(value);
    }

    const submit = () => {
        let workoutId = props.match.params.workoutId;
        let id = exercise.id;
        const obj = {id, title, workoutId};
        initialState.ExerciseRequests.updateExercise(obj, authUser.emailAddress, authUser.password)
            .then((response)=> {
                if (response === "success"){
                    console.log(`Exercise successfully updated`)
                    props.history.push(`/workouts/${props.match.params.workoutId}/exercises/${props.match.params.id}`);
                } else if (response === "forbidden") {
                    setErrors([...errors, "You must be logged in to edit an exercise."]);
                } else {
                    setErrors([...errors, response])
                    console.log(errors);
                }
            }).catch(err => {
                setErrors([...errors, err])
            })
    }

    const cancel = () => {
        props.history.push(`/workouts/${props.match.params.workoutId}/exercises/${props.match.params.id}`);
    }

    return (
        <NewExerciseContainer>
            <Form 
                cancel={cancel}
                submit={submit}
                submitButtonText="Edit Exercise"
                elements={() => (
                    <React.Fragment>
                            <NewExerciseHeader><i className="far fa-edit"></i> Edit Exercise</NewExerciseHeader>
                            {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                            <FormRow>
                                <FormLabel htmlFor="title">Exercise Name</FormLabel>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    onChange={(e)=> change(e, setTitle)} 
                                    placeholder={exercise.title}
                                    maxLength="16"
                                    required
                                    />
                            </FormRow>
                    </React.Fragment>
            )} />
        </NewExerciseContainer>
    )
}

const NewExerciseContainer = styled.div`
    width: 385px;
    margin: auto;
    margin-bottom: 20px;
    color: #fff;
    background-color: #5e5e5e;
    border-radius: 4px;
    padding: .1px 10px 10px 10px;
    text-align: center;
`;

const NewExerciseHeader = styled.h3`
    margin-bottom: -10px;
    color: #00cc07;
`

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
    background: #5e5e5e;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    color: #fff;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 13px;
    margin-bottom: -7.5px;
`;

export default ExerciseEdit;