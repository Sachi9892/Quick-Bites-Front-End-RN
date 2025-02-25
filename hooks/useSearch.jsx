import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/appconstant";

export const useSearch = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (text) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/search?query=${text}`
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
