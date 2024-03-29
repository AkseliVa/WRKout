import { useState } from "react";

const SearchTermItems = () => {
    const [items, setItems] = useState([
        { label: 'Exercise name', value: 'name' },
        { label: 'Bodypart', value: 'bodypart' },
        { label: 'Equipment', value: 'equipment' }
    ]);

    return [items, setItems];
};

export default SearchTermItems;
