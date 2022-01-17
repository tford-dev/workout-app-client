import React, {useState} from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from "js-cookie";
import Form from './Form';
import './components.css';

const SignIn = (props) => {
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
    const submit = () => {
        initialState.signIn(emailAddress, password)
            .then((user) => {
                //If user does not exist, errors is pushed an error message that will be rendered to user
                if(user === null){
                    setErrors([...errors, "Sign-In was unsuccessful."])
                } else {
                    if(window.location.pathname === "/error"){
                        props.history.push("/home");
                    }
                    dispatch({
                        type: "SET_USER",
                        authenticatedUser: user,
                    })
                    console.log(`${emailAddress} is now signed in!`);
                    window.location.reload();
                }
            })
            .catch( err => {
                console.log(err.message);
                setErrors([...errors, err.message]);
            })
    }

    const cancel = () => {
        props.history.push('/sign-up');
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
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                    <h2 className="form-header">Sign In <i className="fas fa-sign-in-alt"></i></h2>
                                    {errors.map((error, i) => <ErrorMessage key={i}>{error}</ErrorMessage>)}
                                    <FormRow>
                                        <FormLabel htmlFor="email">Email Address</FormLabel>
                                            <Input 
                                                id="email" 
                                                name="emailAddress" 
                                                type="email" 
                                                onChange={(e)=> change(e, setEmailAddress)} 
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
                                                onChange={(e)=> change(e, setPassword)} 
                                                placeholder={password}
                                                required
                                            />
                                        </FormRow>
                                    <SignInPrompt>
                                    Don't have a user account? <Link to="/sign-up" className="sign__link">Click here</Link> to sign up!
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

export default SignIn
