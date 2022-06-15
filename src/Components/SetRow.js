/* eslint-disable */
import React, {useState} from 'react';
import Form from './Form';
import { useStateValue } from '../ContextApi/StateProvider';
import styled from 'styled-components';

const SetRow = (props) => {
    const [errors, setErrors] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [repetitions, setRepetitions] = useState(0);
    const [initialState, dispatch] = useStateValue();
    const authUser = JSON.parse(initialState.authenticatedUser);


    const change = (event, setState) => {
        const value = event.target.value;
        setState(value);
        console.log(repetitions);
    }

    const cancel = () => {
        setEditMode(false);
    }

    const deleteSet = () =>{
        let workoutId = parseInt(props.workoutId);
        let exerciseId = parseInt(props.exerciseId);
        let id = props.id;
        
        if(window.confirm("Are sure you want to delete this set? Once deleted, it can not be retrieved.")){
            initialState.SetsRequests.deleteSet(workoutId, exerciseId, id, authUser.emailAddress, authUser.password)
                .then((response) =>{
                    if(response === 'success'){
                        props.callback();
                        alert("Set deleted.");
                    } else {
                        props.history.push('/error');
                    }
                }).catch(err => {
                    console.log(err);
                    props.history.push('/error');
                })
        }
    }

    const submit = () => {
        let workoutId = parseInt(props.workoutId);
        let exerciseId = parseInt(props.exerciseId);
        let id = props.id;
        const reps = {
            repetitions,
        };
  
        initialState.SetsRequests.updateSet(workoutId, exerciseId, id, reps, authUser.emailAddress, authUser.password)
            .then((response)=> {
                if (response === "success"){
                    console.log(`${authUser.emailAddress} updated set: ${reps}`);
                    setEditMode(false);
                    props.callback();
                } else if (response === "forbidden") {
                    console.log("1111")
                    setErrors([...errors, "You do not have permission to update set."]);
                } else {
                    console.log("1111")
                    setErrors([...errors, response])
                    console.log(errors);
                }
            }).catch(err => {
                setErrors([...errors, err])
            })
    }

    return (
        <div>
            {
                editMode ? (
                    <Form
                        cancel={cancel}
                        submit={submit}
                        submitButtonText="Update Set"
                        elements={() => (
                        <React.Fragment>
                            {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                            <FormRow>
                                <FormLabel htmlFor="repNumber">#{props.index} - Enter Reps:</FormLabel>
                                <Input
                                    id="repNumber"
                                    name="repNumber"
                                    type="number"
                                    placeholder={props.repetitions}
                                    onChange={(e)=> change(e, setRepetitions)}
                                    required 
                                />
                            </FormRow>
                        </React.Fragment>
                        )}
                    />
                ) : (
                    <ExerciseSetRow>
                        <p>#{props.index}</p>
                        <p>Reps: {props.repetitions}</p>
                        <EditButton onClick={()=> setEditMode(true)}>Edit</EditButton>
                        <DeleteButton onClick={deleteSet}>Delete</DeleteButton>
                    </ExerciseSetRow>
                )
            }
        </div>
    )
}

const ExerciseSetRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #787878;
`;

const EditButton = styled.button`
    border: none;
    border-radius: 2px;
    color: #fff;
    background-color: #00661b;
    &:hover {
        color: #00661b;
        background-color: #fff;
    }
`;

const DeleteButton = styled.button`
    border: none;
    border-radius: 2px;
    color: #fff;
    background-color: #c20000;
    &:hover {
        color: #c20000;
        background-color: #fff;
    }
`;

const FormRow = styled.div`
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #787878;
`;

const FormLabel = styled.label`
    border: none;
`;

const Input = styled.input`
    width: 65%;
    background: #777777;
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

export default SetRow;
