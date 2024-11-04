const API_BASE_URL = 'https://fitnessapp-api-ln8u.onrender.com';

const getToken = () => localStorage.getItem('token');

export const getMyWorkouts = async () => {
    const response = await fetch(`${API_BASE_URL}/workouts/getMyWorkouts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch workouts');
    }
    return await response.json();
};

export const addWorkout = async (workout) => {
    const response = await fetch(`${API_BASE_URL}/workouts/addWorkout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
    });
    if (!response.ok) {
        throw new Error('Failed to add workout');
    }
    return await response.json();
};

export const updateWorkout = async (id, workout) => {
    const response = await fetch(`${API_BASE_URL}/workouts/updateWorkout/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
    });
    if (!response.ok) {
        throw new Error('Failed to update workout');
    }
    return await response.json();
};

export const deleteWorkout = async (id) => {
    const response = await fetch(`${API_BASE_URL}/workouts/deleteWorkout/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete workout');
    }
};

export const completeWorkout = async (id) => {
    const response = await fetch(`${API_BASE_URL}/workouts/completeWorkoutStatus/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to complete workout');
    }
    return await response.json();
};
