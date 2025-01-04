import { useState } from "react";
import axios from "axios";

export const useSearch = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (text) => {
        try {
            const response = await axios.get(
                `http://192.168.1.102:8081/user/search?query=${text}`
            );
            setSuggestions(response.data.slice(0, 8));
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleInputChange = (text) => {
        setQuery(text);
        if (text.length > 0) {
            fetchSuggestions(text);
        } else {
            setSuggestions([]);
        }
    };

    return {
        query,
        suggestions,
        setQuery,
        handleInputChange,
    };
};
