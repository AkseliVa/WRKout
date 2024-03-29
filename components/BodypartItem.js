import * as React from 'react'
import { useState } from "react";

const BodypartItem = () => {
    const [bodypartItems, setBodypartItems] = useState([
        { label: 'Back', value: 'back' },
        { label: 'Chest', value: 'chest' },
        { label: 'Cardio', value: 'cardio' },
        { label: 'Lower arms', value: 'lower%20arms' },
        { label: 'Lower legs', value: 'lower%20legs' },
        { label: 'Neck', value: 'neck' },
        { label: 'Shoulders', value: 'shoulders' },
        { label: 'Upper arms', value: 'upper%20arms' },
    ]);

    return [bodypartItems, setBodypartItems];
};

export default BodypartItem;
