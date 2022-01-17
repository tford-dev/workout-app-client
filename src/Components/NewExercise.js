/* eslint-disable */ 
import React, {useState} from 'react';
import styled from 'styled-components';
import Form from './Form';
import { useStateValue } from '../ContextApi/StateProvider';

const NewExercise = (props) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [initialState, dispatch] = useStateValue();
    const authUser = JSON.parse(initialState.authenticatedUser);

    const submit = () => {
        let workoutId = parseInt(props.workoutId);
        const exercise = {title, workoutId};
        initialState.ExerciseRequests.createExercise(exercise, authUser.emailAddress, authUser.password)
            .then((response)=> {
                if (response === "success"){
                    console.log(`${authUser.emailAddress} has successfully created exercise ${exercise}`)
                    dispatch({
                        type: 'SET_EXERCISE_FORM_OPEN',
                        exerciseFormOpen: false
                    })
                    props.updateFunction();
                } else if (response === "forbidden") {
                    setErrors([...errors, "You must be logged in to create an exercise."]);
                } else {
                    setErrors([...errors, response])
                    console.log(errors);
                }
            }).catch(err => {
                setErrors([...errors, err])
            })
    }

    const change = (event, setState) => {
        const value = event.target.value;
        setState(value);
    }

    const cancel = () => {
        dispatch({
            type: 'SET_EXERCISE_FORM_OPEN',
            exerciseFormOpen: false
        })
    }

    return (
        <NewExerciseContainer>
            <Form 
                cancel={cancel}
                submit={submit}
                submitButtonText="Add Exercise"
                elements={() => (
                    <React.Fragment>
                            <NewExerciseHeader><i className="fas fa-plus-circle"></i> Add Exercise</NewExerciseHeader>
                            {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                            <FormRow>
                                <FormLabel htmlFor="title">Exercise Name</FormLabel>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    onChange={(e)=> change(e, setTitle)} 
                                    placeholder={title}
                                    maxLength="18"
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
    margin-top: -7.5px;
    margin-bottom: -7.5px;
`;

export default NewExercise