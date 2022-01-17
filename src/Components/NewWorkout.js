import React, {useState} from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from "js-cookie";
import Form from './Form';
import './components.css';

const NewWorkout = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const [initialState, dispatch] = useStateValue();
    const authUser = JSON.parse(initialState.authenticatedUser);

    const change = (event, setState) => {
        const value = event.target.value;
        setState(value);
    }

    //Submit method takes required keys from state and sends the values to api 
    const submit = () => {
        const date = new Date();
        let day = date.getDay();
        if(day === 1){
            day = "Monday"
        } else if (day === 2){
            day = "Tuesday"
        } else if (day === 3){
            day = "Wednesday"
        } else if (day === 4){
            day = "Thursday"
        } else if (day === 5){
            day = "Friday"
        } else if (day === 6){
            day = "Saturday"
        } else {
            day = "Sunday"
        };
        const fullDate = `${day}, ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        let time = fullDate;
        const workout = {title, description, time};

        //createUser method takes credentials from context api and course variable to execute request 
        initialState.WorkoutRequests.createWorkout(workout, authUser.emailAddress, authUser.password)
            .then((response)=> {
                if (response === "success"){
                    console.log(`${authUser.emailAddress} has successfully created workout ${workout}`)
                    props.history.push('/home');
                } else if (response === "forbidden") {
                    setErrors([...errors, "You must be logged in to create a workout."]);
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
        props.history.push('/home');
    }

    return (
        authUser ? (
            <NewWorkoutContainer>
                <FormContainer>
                        <Form 
                            cancel={cancel}
                            submit={submit}
                            submitButtonText="Create Workout"
                            elements={() => (
                                <React.Fragment>
                                        <h2 className="form-header"><i className="fas fa-newspaper"></i> Create Workout</h2>
                                        {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                                        <FormRow>
                                            <FormLabel htmlFor="title">Title</FormLabel>
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
                                        <FormRow>
                                            <FormLabel htmlFor="description">Description</FormLabel>
                                            <Input
                                                id="description" 
                                                name="description" 
                                                type="text" 
                                                onChange={(e) => change(e, setDescription)} 
                                                placeholder={description}
                                                required
                                                />
                                        </FormRow>
                                </React.Fragment>
                        )} />
                    </FormContainer>  
            </NewWorkoutContainer>
        ) : (
            <Redirect to="/sign-in" />
        )
    )
}

const NewWorkoutContainer = styled.div`
    background-color: #000;
    display: flex;
    width: 90%;
    color: #fff;
    margin: auto;
    margin-top: 15px;
    flex-direction: column;
    background-color: #424242;
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

export default NewWorkout
