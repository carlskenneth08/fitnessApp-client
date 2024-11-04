// AddWorkoutModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddWorkoutModal = ({ show, handleClose, fetchWorkouts }) => {
    const [workoutName, setWorkoutName] = useState('');
    const [duration, setDuration] = useState('');
    const [status, setStatus] = useState('pending');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/workouts/addWorkout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: workoutName, duration, status }),
            });

            if (!response.ok) {
                throw new Error('Failed to add workout');
            }

            setWorkoutName('');
            setDuration('');
            setStatus('pending');
            handleClose();
            fetchWorkouts(); // Fetch updated workouts after adding
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="add-workout-modal">
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>Add a New Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="workoutName">
                        <Form.Label>Workout Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter workout name"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            required
                            className="border-primary"
                        />
                    </Form.Group>
                    <Form.Group controlId="duration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter duration (e.g., 30 mins)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            className="border-primary"
                        />
                    </Form.Group>
                    <Button id="AddWorkout" variant="primary" type="submit" className="mt-3">
                        Add Workout
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddWorkoutModal;
