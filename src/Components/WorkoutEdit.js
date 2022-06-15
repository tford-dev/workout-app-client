/* eslint-disable */
import React, {useState, useEffect} from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Form from './Form';
import './components.css';

const WorkoutEdit = (props) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    //const [workout, setWorkout] = useState({})
    const [errors, setErrors] = useState([]);
    const [initialState, dispatch] = useStateValue();
    const authUser = JSON.parse(initialState.authenticatedUser);

    useEffect(()=>{
        initialState.WorkoutRequests.getWorkout(props.match.params.id, authUser.emailAddress, authUser.password).then(
            response => {
                setId(response.id);
                setTitle(response.title);
                setDescription(response.description);
                setTime(response.time);
            }
        ).catch(err => {
            console.log('Error' + err);
        })
    }, [])

    const change = (event, setState) => {
        const value = event.target.value;
        setState(value);
    }

    //Submit method takes required keys from state and sends the values to api 
    const submit = () => {
        const workout = {id, title, description, time};

        //createUser method takes credentials from context api and course variable to execute request 
        initialState.WorkoutRequests.updateWorkout(workout, authUser.emailAddress, authUser.password)
            .then((response)=> {
                if (response === "success"){
                    console.log(`${authUser.emailAddress} has successfully edited workout ${workout}`)
                    props.history.push(`/workouts/${props.match.params.id}`);
                } else if (response === "forbidden") {
                    setErrors([...errors, "You must be logged in to edit a workout."]);
                } else {
                    setErrors([...errors, response])
                    console.log(errors);
                }
            }).catch(err => {
                setErrors([...errors, err])
            })
        //
    }

    const cancel = () => {
        props.history.push(`/workouts/${props.match.params.id}`);
    }

    return (
        authUser ? (
            <WorkoutEditContainer>
                <FormContainer>
                        <Form 
                            cancel={cancel}
                            submit={submit}
                            submitButtonText="Update Workout"
                            elements={() => (
                                <React.Fragment>
                                        <h2 className="form-header"><i className="fas fa-newspaper"></i> Edit Workout</h2>
                                        {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                                        <FormRow>
                                            <FormLabel htmlFor="title">Title</FormLabel>
                                            <Input
                                                id="title"
                                                name="title"
                                                type="text"
                                                onChange={(e)=> change(e, setTitle)} 
                                                value={title}
                                                maxLength="18"
                                                required
                                                />
                                        </FormRow>
                                        <FormRow>
                                            <FormLabel htmlFor="description">Description</FormLabel>
                                            <Input
                                                id="description" 
                                                name="description" 
                                                type="text" 
                                                onChange={(e) => change(e, setDescription)} 
                                                value={description}
                                                required
                                                />
                                        </FormRow>
                                </React.Fragment>
                        )} />
                    </FormContainer>  
            </WorkoutEditContainer>
        ) : (
            <Redirect to="/sign-in" />
        )
    )
}

const WorkoutEditContainer = styled.div`
    background-color: #777777;
    display: flex;
    width: 90%;
    color: #ffffff;
    margin: auto;
    margin-top: 15px;
    flex-direction: column;
    text-align: center;
    border-radius: 8px;
`;

const FormContainer = styled.div`
    width: 80%;
    margin: auto;
    margin-bottom: 30px;
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

export default WorkoutEdit;