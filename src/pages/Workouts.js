// WorkoutPage.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import WorkoutCard from '../components/WorkoutCard'; // Import WorkoutCard
import AddWorkoutModal from '../components/AddWorkoutModal';
import UpdateWorkoutModal from '../components/UpdateWorkoutModal';

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [workoutToEdit, setWorkoutToEdit] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const fetchWorkouts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/workouts/getMyWorkouts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch workouts');
            }

            const data = await response.json();
            setWorkouts(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCompleteWorkout = async (workoutId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:4000/workouts/completeWorkoutStatus/${workoutId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'completed' }),
            });

            if (!response.ok) {
                throw new Error('Failed to update workout status');
            }

            fetchWorkouts(); // Refresh workouts after updating
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteWorkout = async (workoutId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:4000/workouts/deleteWorkout/${workoutId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete workout');
            }

            fetchWorkouts(); // Refresh workouts after deletion
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditWorkout = (workout) => {
        setWorkoutToEdit(workout);
        setShowUpdateModal(true);
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <Container>
            <h2 className="mt-4 mb-4">Your Workouts</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Workout
            </Button>
            <AddWorkoutModal show={showModal} handleClose={() => setShowModal(false)} fetchWorkouts={fetchWorkouts} />
            <UpdateWorkoutModal 
                show={showUpdateModal} 
                handleClose={() => setShowUpdateModal(false)} 
                fetchWorkouts={fetchWorkouts} 
                workoutToEdit={workoutToEdit} 
            />
            {workouts.length === 0 ? (
                <div className="text-center mt-5">
                    <h4>No workouts available.</h4>
                </div>
            ) : (
                <Row>
                    {workouts.map((workout) => (
                        <Col key={workout._id} md={4} className="mb-4">
                            <WorkoutCard 
                                workout={workout} 
                                onComplete={handleCompleteWorkout} 
                                onEdit={handleEditWorkout} 
                                onDelete={handleDeleteWorkout} 
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default WorkoutPage;
