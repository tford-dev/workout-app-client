import Cookies from "js-cookie";
import { ExerciseRequests } from './ExerciseRequests';
import { WorkoutRequests } from './WorkoutRequests';
import { SetsRequests } from './SetsRequests';
import { UserRequests } from './UserRequests';

export const api = (path, method='GET', body=null, requiresAuth=false, credentials=null) => {
    const api = 'https://workout-api-tforddev-97efd0f5a3bf.herokuapp.com/api';
    const url = api + path;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };

    if(body !== null){
        options.body = JSON.stringify(body)
    }

    if(requiresAuth){
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
}

const signIn = async (emailAddress, password) => {
    const user = await UserRequests.getUser(emailAddress, password);
    if(user !== null){
        user.password = password;
        initialState.authenticatedUser = user;
    //Sets authenticated user in cookies for 7 daYS
    Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 7});
    }
    //return user --old code
    return window.location.reload();
} 

const signOut = () => {
    Cookies.remove("authenticatedUser");
    initialState.authenticatedUser = null;
}

export const initialState = {
    menuOpen: false,
    authenticatedUser: Cookies.get("authenticatedUser") || null,
    exerciseFormOpen: false,
    ExerciseRequests: ExerciseRequests,
    WorkoutRequests: WorkoutRequests,
    SetsRequests: SetsRequests,
    UserRequests: UserRequests,
    signIn: signIn,
    signOut: signOut
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER': 
            return {
                ...state,
                authenticatedUser: action.authenticatedUser,
            }
        case 'SET_MENU_OPEN':
            return {
                ...state, 
                menuOpen: action.menuOpen
            };
        case 'SET_EXERCISE_FORM_OPEN':
            return {
                ...state,
                exerciseFormOpen: action.exerciseFormOpen
            }

        default:
            return state;
    }
}