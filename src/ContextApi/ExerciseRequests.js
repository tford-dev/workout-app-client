import {api} from './reducer';

//GET request to retrieve all exercises by a user
const getExercises = async(id, emailAddress, password) => {
    const response = await api(`/workouts/${id}/exercises`, 'GET', null, true, {emailAddress, password});
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

//GET request to retrieve a specific exercise by a user
const getExercise = async(workoutId, id, emailAddress, password) => {
    const response = await api(`/workouts/${workoutId}/exercises/${id}`, 'GET', null, true, {emailAddress, password});
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

//POST request to create an exercise
const createExercise = async(obj, emailAddress, password) =>{
    const response = await api(`/workouts/${obj.workoutId}/exercises`, 'POST', obj, true, {emailAddress, password});
    if(obj.title.length > 0){
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

//PUT request to edit/update an exercise
const updateExercise = async(obj, emailAddress, password) =>{
    const response = await api(`/workouts/${obj.workoutId}/exercises/${obj.id}`, 'PUT', obj, true, {emailAddress, password});
    if(obj.title.length > 0){
        if (response.status === 204) {
            console.log(obj);
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

//DELETE request to delete an exercise from the database
const deleteExercise = async(workoutId, id, emailAddress, password) => {
    const response = await api(`/workouts/${workoutId}/exercises/${id}`, 'DELETE', null, true, {emailAddress, password});
    if(response.status === 204){
        return "success";
    } else if (response.status === 403 ) {
        console.log(response.message);
        return "forbidden";
    } else {
        throw new Error();
    }
}

export const ExerciseRequests = {
    getExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise
}