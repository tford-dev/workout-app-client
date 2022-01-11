import React, {useState} from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from "js-cookie";
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
    console.log(initialState);

    // const signIn = async (emailAddress, password) => {
    //     const user = await initialState.UserRequests.getUser(emailAddress, password);
    //     if(user !== null){
    //         user.password = password;
    //         dispatch({
    //             type: "SET_USER",
    //             authenticatedUser: user
    //         })
    //     //Sets authenticated user in cookies for 7 daYS
    //     Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 7});
    //     }
    //     return user;
    // } 

    //simple method to modify state value based on what is typed in input/textarea elements
    const change = (event, setState) => {
        const value = event.target.value;
        setState(value);
    }

    //Submit method takes required keys from state and sends the values to api 
    const submit = () => {
        const user = {firstName, lastName, emailAddress, password};
        console.log(user);

        //createUser method takes credentials from context api and course variable to execute request 
        initialState.UserRequests.createUser(user)
            .then(errors => {
                if(errors.length){
                    setErrors([errors])
                } else {
                    initialState.signIn(emailAddress, password)
                        .then(() => {
                            props.history.push("/home");
                        })
                    console.log(`${emailAddress} is successfully signed up and authorized!`);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push("/error");
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
        console.log(initialState);
        return (
            <SignInContainer>
                <FormContainer>
                    <Form 
                        cancel={cancel}
                        errors={errors}
                        submit={submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                    <h2 className="form-header">Sign Up <i className="fas fa-user-plus"></i></h2>
                                    <FormRow>
                                        <FormLabel htmlFor="firstName" className="form-label">First Name</FormLabel>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            onChange={(e)=> change(e, setFirstName)} 
                                            placeholder={firstName}/>
                                    </FormRow>
                                    <FormRow>
                                        <FormLabel htmlFor="lastName" className="form-label">Last Name</FormLabel>
                                        <Input
                                            id="lastName" 
                                            name="lastName" 
                                            type="text" 
                                            onChange={(e) => change(e, setLastName)} 
                                            placeholder={lastName}/>
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

export default SignUp
