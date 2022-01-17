/* eslint-disable */ 
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import Signin from './Components/SignIn';
import Signup from './Components/Signup';
import Home from './Components/Home';
import WorkoutPage from './Components/WorkoutPage';
import ExercisePage from './Components/ExercisePage';
import ExerciseEdit from './Components/ExerciseEdit';
import Help from './Components/Help';
import NavBar from './Components/NavBar';
import AppError from './Components/AppError';
import SignOut from './Components/SignOut';
import NewWorkout from './Components/NewWorkout';
import styled from 'styled-components';
import WorkoutEdit from './Components/WorkoutEdit';
// <Route path="/" component={} />

function App() {
	return (
        <Router>
            <AppContainer>
                    <NavBar />
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Redirect exact from="/" to="/home" />
                        <Route exact path="/sign-in" component={Signin} />
                        <Route exact path="/sign-up" component={Signup} />
                        <Route exact path="/new-workout" component={NewWorkout} />
                        <Route path="/workouts/:workoutId/exercises/:id/edit" component={ExerciseEdit} />
                        <Route path="/workouts/:workoutId/exercises/:id" component={ExercisePage} />
                        <Route path="/workouts/:id/edit" component={WorkoutEdit} />
                        <Route path="/workouts/:id" component={WorkoutPage} />
                        <Route exact path="/help" component={Help} />
                        <Route exact path="/sign-out" component={SignOut} />
                        <Route exact path="/error" component={AppError} />
                        <Redirect from="*" to="/error" />
                    </Switch>
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
    min-height: 99.9vh;
    padding-bottom: 1px;
`

export default App;