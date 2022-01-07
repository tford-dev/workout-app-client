import React from 'react';
import { ExerciseRequests } from './ExerciseRequests';
import { WorkoutRequests } from './WorkoutRequests';
import { SetRequests } from './SetsRequests';
import { UserRequests } from './UserRequests';
//Cookies.getJSON("authenticatedUser") ||

export const api = (path, method='GET', body=null, requiresAuth=false, credentials=null) => {
    const api = 'https://workout-api-tforddev.herokuapp.com/api';
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

export const initialState = {
    menuOpen: false,
    authenticatedUser: null,
    workouts: null,
    exercises: null,
    sets: null,
    ExerciseRequests: ExerciseRequests,
    WorkoutRequests: WorkoutRequests,
    SetRequests: SetRequests,
    UserRequests: UserRequests,
}

export const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case 'SET_USER': 
            return {
                ...state,
                authenticatedUser: action.authenticatedUser
            }
        case 'SET_MENU_OPEN':
            return {
                ...state, 
                menuOpen: action.menuOpen
            };
        case 'SET_WORKOUTS': 
            return {
                ...state,
                workouts: action.workouts
            }
        
        default:
            return state;
    }
}