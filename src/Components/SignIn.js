import React, {useState} from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from "js-cookie";
import Form from './Form';

const SignIn = (props) => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [initialState, dispatch] = useStateValue();
    const authUser = initialState.authenticatedUser;

    const signIn = async (emailAddress, password) => {
        const user = await initialState.UserRequests.getUser(emailAddress, password);
        if(user !== null){
            user.password = password;

            dispatch({
                type: "SET_USER",
                authenticatedUser: user
            })
        //Sets authenticated user in cookies for 24 hours
        Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 7});
        }
        return user;
    } 

    //simple method to modify state value based on what is typed in input/textarea elements
    const changeEmail = (event) => {
        const value = event.target.value;
        setEmailAddress(value);
    }

    const changePassword = (event) => {
        const value = event.target.value;
            setPassword(value);
    }

    //Submit method takes required keys from state and sends the values to api 
    const submit = () => {
        // {from} returns user to privateRoute that user tried to access after being authenticated or previous page before requesting to sign in
        const {from} = props.location.state || {from: {pathname: props.history.goBack()}};
        const {emailAddress, password, errors} = this.state;

        
            signIn(emailAddress, password)
                .then((user) => {
                    //If user does not exist, this.state.errors is pushed an error message that will be rendered to user
                    if(user === null){
                        this.setState(()=>{
                            return {errors: [...errors, "Sign-In was unsuccessful."]}
                        })
                    //If sign in is successful, user is redirected to previous page or private route
                    } else {
                        props.history.push(from);
                        if(window.location.pathname === "/error"){
                            props.history.push("/");
                        }
                        console.log(`${emailAddress} is now signed in!`);
                    }
                })
                .catch(err => {
                    console.log(err);
                    props.history.push("/error");
                })
    }

    const cancel = () => {
        props.history.push('/signup');
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
                        errors={errors}
                        submit={submit}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                
                                    <h2 className="form-header">Sign In <i className="fas fa-sign-in-alt"></i></h2>
                                    <FormRow>
                                        <FormLabel htmlFor="email">Email Address</FormLabel>
                                            <Input 
                                                id="email" 
                                                name="emailAddress" 
                                                type="email" 
                                                onChange={()=>changeEmail} 
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
                                                onChange={()=>changePassword} 
                                                placeholder={password}
                                                required
                                            />
                                        </FormRow>
                                    <p className="form-label sign-prompt">
                                    Don't have a user account? <Link to="/signup" className="sign-link">Click here</Link> to sign up!
                                    </p>  
                                            
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
    background-color: ;
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
    width: 70%;
    border: none;
`;

export default SignIn
