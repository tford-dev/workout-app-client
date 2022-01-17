/* eslint-disable */
import React, {useState} from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Form from './Form';
import './components.css';

const SignUp = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [initialState, dispatch] = useStateValue();
    const authUser = initialState.authenticatedUser;

    //simple method to modify state value based on what is typed in input/textarea elements
    const change = (event, setState) => {
        const value = event.target.value;
        setState(value);
    }

    //Submit method takes required keys from state and sends the values to api 
    const submit = async() => {
        const user = {firstName, lastName, emailAddress, password};

        //createUser method takes credentials from context api and course variable to execute request 
        await initialState.UserRequests.createUser(user)
            .then(err => {
                if(err.length){
                    console.log(err)
                    setErrors([...errors, err])
                    console.log(errors)
                } else {
                    initialState.signIn(emailAddress, password)
                        .then(() => {
                            props.history.push("/home");
                        })
                    console.log(`${emailAddress} is successfully signed up and authorized!`);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const cancel = () => {
        props.history.push('/sign-in');
    }

    if(authUser){
            return(
                <Redirect to="/home" />
            )
    } else {
        return (
            <SignInContainer>
                <FormContainer>
                    <Form 
                        cancel={cancel}
                        submit={submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                    <h2 className="form-header">Sign Up <i className="fas fa-user-plus"></i></h2>
                                    {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                                    <FormRow>
                                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            onChange={(e)=> change(e, setFirstName)} 
                                            placeholder={firstName}
                                            required
                                            />
                                    </FormRow>
                                    <FormRow>
                                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                        <Input
                                            id="lastName" 
                                            name="lastName" 
                                            type="text" 
                                            onChange={(e) => change(e, setLastName)} 
                                            placeholder={lastName}
                                            required
                                            />
                                    </FormRow>
                                    <FormRow>
                                        <FormLabel htmlFor="email">Email Address</FormLabel>
                                        <Input 
                                            id="email" 
                                            name="emailAddress" 
                                            type="email" 
                                            onChange={(e) => change(e, setEmailAddress)} 
                                            placeholder={emailAddress}
                                            required
                                            />
                                    </FormRow>
                                    <FormRow>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <Input 
                                            id="password" 
                                            name="password"
                                            type="password" 
                                            onChange={(e) => change(e, setPassword)} 
                                            placeholder={password}
                                            required
                                        />
                                        </FormRow>
                                    <SignInPrompt>
                                    Already have an account? <Link to="/sign-in" className="sign__link">Click here</Link> to sign in!
                                    </SignInPrompt> 
                                            
                            </React.Fragment>
                    )} />
                </FormContainer>
            </SignInContainer>
        );
    }
}

const SignInContainer = styled.div`
    display: flex;
    width: 90%;
    color: #fff;
    margin: auto;
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

const SignInPrompt = styled.p`
    font-size: 13px;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 13px;
    margin-top: -7.5px;
    margin-bottom: -7.5px;
`

export default SignUp
