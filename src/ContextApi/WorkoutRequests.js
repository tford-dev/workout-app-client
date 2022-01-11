import {api} from './reducer';

//GET request to retrieve all workouts by a user
const getWorkouts = async(emailAddress, password) => {
    const response = await api('/workouts', 'GET', null, true, {emailAddress, password});
    if(response.status === 200) {
        console.log(emailAddress, password)
        return response.json().then(data => data);
    } else if (response.status === 400) {
        return response.json().then(data => {
            return data.errors;
        });
    } else {
        console.log(emailAddress, password)
        throw new Error();
    }
}

//GET request to retrieve a specific workout by a user
const getWorkout = async(id, emailAddress, password) => {
    const response = await api(`/workouts/${id}`, 'GET', null, true, {emailAddress, password});
    if(response.status === 200) {
        return response.json().then(data => data);
    } else if (response.status === 400) {
        return response.json().then(data => {
            return data.errors;
        });
    } else {
        throw new Error();
    }
}

//POST request to create a workout
const createWorkout = async(obj, emailAddress, password) =>{
    const response = await api(`/workouts`, 'POST', obj, true, {emailAddress, password});
    if(obj.title.length > 0 && obj.description.length > 0){
        if (response.status === 201) {
            return "success";
        } else if (response.status === 401 || 403) {
            return "forbidden";
        }
    } else if (response.status === 400) {
        return response.json().then(data => {
            return data.errors;
        })
    } else {
        throw new Error();
    }
}

//PUT request to edit/update a workout
const updateWorkout = async(obj, emailAddress, password) =>{
    const response = await api(`/workouts/${obj.id}`, 'PUT', obj, true, {emailAddress, password});
    if(obj.title.length > 0 && obj.description.length > 0){
        if (response.status === 204) {
            return "success";
        } else if (response.status === 403 || 401) {
            return "forbidden";
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }
}

//DELETE request to delete a workout from the database
const deleteWorkout = async(id, emailAddress, password) => {
    const response = await api(`/workouts/${id}`, 'DELETE', null, true, {emailAddress, password});
    if(response.status === 204){
        return "success";
    } else if (response.status === 403 ) {
        console.log(response.message);
        return "forbidden";
    } else {
        throw new Error();
    }
}

export const WorkoutRequests = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}