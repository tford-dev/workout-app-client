/* eslint-disable */ 
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Signin from './Components/SignIn';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Workouts from './Components/Workouts';
import Workout from './Components/Workout';
import Exercises from './Components/Exercises';
import Exercise from './Components/Exercise';
import Help from './Components/Help';
import NavBar from './Components/NavBar';
import AppError from './Components/AppError';
import SignOut from './Components/SignOut';
import PrivateRoute from './Components/PrivateRoute';
import { useStateValue } from './ContextApi/StateProvider';
import styled from 'styled-components';
// <Route path="/" component={} />

function App() {
	return (
        <Router>
            <AppContainer>
                    <NavBar />
                    <PrivateRoute path="/home" component={Home} />
                    <Route path="/sign-in" component={Signin} />
                    <Route path="/sign-up" component={Signup} />
                    <Route path="/workouts" component={Workouts} />
                    <Route path="/workouts/:id" component={Workout} />
                    <Route path="/workouts/:workoutId/exercises" component={Exercises} />
                    <Route path="/workouts/:workoutId/exercises/:id" component={Exercise} />
                    <Route path="/help" component={Help} />
                    <Route path="/sign-out" component={SignOut} />
                    <Route path="/error" component={AppError} />
            </AppContainer>
        </Router>
	);
}

const AppContainer = styled.div`
	margin: 0;
    font-family: 'Helvetica Neue', sans-serif;
    font-family: 'Helvetica 25 UltraLight', sans-serif;
    font-family: 'Helvetica 35 Thin', sans-serif;
    font-family: 'Helvetica 45 Light', sans-serif;
    font-family: 'Helvetica 55 Roman', sans-serif;
    font-family: 'Helvetica 65 Medium', sans-serif;
                                                
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000;
    min-height: 100vh;
`

export default App;