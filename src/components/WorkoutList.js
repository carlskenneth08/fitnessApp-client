import React, { useEffect, useState } from 'react';
import WorkoutCard from './WorkoutCard';
import { getMyWorkouts, deleteWorkout } from '../api/workoutService'; // Ensure you implement deleteWorkout
import AddWorkoutModal from './AddWorkoutModal';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const userWorkouts = await getMyWorkouts();
            setWorkouts(userWorkouts);
        };
        fetchWorkouts();
    }, []);

    const handleDelete = async (id) => {
        await deleteWorkout(id);
        setWorkouts(workouts.filter(workout => workout.id !== id));
    };

    return (
        <div>
            <button id="AddWorkout" onClick={() => setShowModal(true)}>Add Workout</button>
            <AddWorkoutModal show={showModal} handleClose={() => setShowModal(false)} />
            {workouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default WorkoutList;
