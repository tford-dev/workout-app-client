import {api} from './reducer';

//GET request to retrieve Sets
const getSets = async(workoutId, id, emailAddress, password) => {
    const response = await api(`/workouts${workoutId}/exercises/${id}/sets`, 'GET', null, true, {emailAddress, password});
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

//GET request to retrieve a specific set
const getSet = async(workoutId, exerciseId, id, emailAddress, password) => {
    const response = await api(`/workouts/${workoutId}/exercises/${exerciseId}/sets/${id}`, 'GET', null, true, {emailAddress, password});
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

//POST request to create a set
const createSet = async(obj, emailAddress, password) =>{
    const response = await api(`/workout/${obj.workoutId}/exercises${obj.exerciseId}/sets`, 'POST', obj, true, {emailAddress, password});
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

//PUT request to edit/update a set
const updateSet = async(obj, emailAddress, password) =>{
    const response = await api(`/workouts/${obj.workoutId}/exercises/${obj.exerciseId}/sets/${obj.id}`, 'PUT', obj, true, {emailAddress, password});
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

//DELETE request to delete a set from the database
const deleteSet = async(workoutId, exerciseId, id, emailAddress, password) => {
    const response = await api(`/workouts/${workoutId}/exercises/${exerciseId}/sets/${id}`, 'DELETE', null, true, {emailAddress, password});
    if(response.status === 204){
        return "success";
    } else if (response.status === 403 ) {
        console.log(response.message);
        return "forbidden";
    } else {
        throw new Error();
    }
}

export const SetRequests = {
    getSets,
    getSet,
    createSet,
    updateSet,
    deleteSet
}