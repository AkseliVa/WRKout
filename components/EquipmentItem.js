import { useState } from "react";

const EquipmentItem = () => {
    const [equipmentItems, setEquipmentItems] = useState([
        {label: 'Assisted', value: 'assisted'},
        {label: 'Band', value: 'band'},
        {label: 'Barbell', value: 'barbell'},
        {label: 'Bodyweight', value: 'body%20weight'},
        {label: 'Bosu ball', value: 'bosu%20ball'},
        {label: 'Cable', value: 'cable'},
        {label: 'Dumbbell', value: 'dumbbell'},
        {label: 'Elliptical machine', value: 'elliptical%20machine'},
        {label: 'Ez-barbell', value: 'ez%20barbell'},
        {label: 'Hammer', value: 'hammer'},
        {label: 'Kettlebell', value: 'kettlebell'},
        {label: 'Leverage machine', value: 'leverage%20machine'},
        {label: 'Medicine ball', value: 'medicine%20ball'},
        {label: 'Olympic barbell', value: 'olympic%20barbell'},
        {label: 'Resistance band', value: 'resistance%20band'},
        {label: 'Roller', value: 'roller'},
        {label: 'Rope', value: 'rope'},
        {label: 'Skierg machine', value: 'skierg%20machine'},
        {label: 'Sled machine', value: 'sled%20machine'},
        {label: 'Smith machine', value: 'smith%20machine'},
        {label: 'Stability ball', value: 'stability%20ball'},
        {label: 'Stationary bike', value: 'stationary%20bike'},
        {label: 'Stepmill machine', value: 'stepmill%20machine'},
        {label: 'Tire', value: 'tire'},
        {label: 'Trap bar', value: 'trap%20bar'},
        {label: 'Upperbody ergometer', value: 'upper%20body%20ergometer'},
        {label: 'Weighted', value: 'weighted'},
        {label: 'Wheelroller', value: 'wheel%20roller'},
    ])

    return [equipmentItems, setEquipmentItems];
};

export default EquipmentItem;
