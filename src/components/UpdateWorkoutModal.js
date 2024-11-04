import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateWorkoutModal = ({ show, handleClose, fetchWorkouts, workoutToEdit }) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (workoutToEdit) {
            setName(workoutToEdit.name);
            setDuration(workoutToEdit.duration);
            setStatus(workoutToEdit.status);
        }
    }, [workoutToEdit]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:4000/workouts/updateWorkout/${workoutToEdit._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    duration,
                    status,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update workout');
            }

            fetchWorkouts(); // Refresh workouts after updating
            handleClose(); // Close the modal
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="workoutName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="workoutDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={duration} 
                            onChange={(e) => setDuration(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Workout
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateWorkoutModal;
