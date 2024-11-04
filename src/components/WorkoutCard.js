// WorkoutCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './WorkoutCard.css'; // Import the CSS file for specific styles

const WorkoutCard = ({ workout, onComplete, onEdit, onDelete }) => {
    // Helper function to format the date
    console.log('Workout Data:', workout);
    const formatDate = (date) => {
        if (!date) return 'No date provided';
        const parsedDate = new Date(date);
        
        // Check if the date is valid
        if (isNaN(parsedDate.getTime())) {
            // Try to parse it as a Unix timestamp if it is a number
            const unixTimestamp = Number(date);
            if (!isNaN(unixTimestamp)) {
                return new Date(unixTimestamp).toLocaleDateString();
            }
            return 'Invalid date';
        }
        
        return parsedDate.toLocaleDateString();
    };

    return (
        <Card className="workout-card">
            <Card.Body>
                <Card.Title className="workout-title">{workout.name}</Card.Title>
                <Card.Text className="workout-duration">Duration: {workout.duration}</Card.Text>
                <Card.Text className="workout-status">Status: {workout.status}</Card.Text>
                <Card.Text className="workout-date">Date Added: {formatDate(workout.dateAdded)}</Card.Text>
                
                <Button variant="success" onClick={() => onComplete(workout._id)} disabled={workout.status === 'completed'}>
                    Mark as Completed
                </Button>
                <Button variant="info" onClick={() => onEdit(workout)} className="ml-2">
                    Update
                </Button>
                <Button variant="danger" onClick={() => onDelete(workout._id)} className="ml-2">
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default WorkoutCard;
