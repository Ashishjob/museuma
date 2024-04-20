import React from 'react'
import { useState, useEffect } from 'react'

function Exhibits() {

    const [exhibits, setExhibits] = useState([]);

    useEffect(() => {
        const fetchExhibits = async () => {
            try {
                const response = await fetch(
                    "https://museuma.onrender.com/manage-exhibits"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch exhibits");
                }
                const data = await response.json();
                setExhibits(data);
            } catch (error) {
                console.error("Error fetching exhibits:", error);
                // Handle error as needed
            }
        };

        fetchExhibits();
    }, []);

    return (
        <div className="p-4 mx-auto max-w-7xl">
            <div className="text-4xl mb-8 text-center">Exhibits</div>
            <p className="mb-6 text-2xl text-gray-600">
                Welcome to the heart of artistic discovery at Bakers Museum.
                Our exhibits offer a captivating journey through diverse realms of art, history, and culture.
                Immerse yourself in a world of creativity, innovation,
                and storytelling as you browse through our current and upcoming exhibits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {exhibits.map((exhibition, index) => {
                    if (exhibition.Description.toLowerCase() === "restaurant" || exhibition.active === 0){
                        return null;
                    }

                    return (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
                            <img src={exhibition.image} alt={`Image for ${exhibition.title}`} className="w-full h-64 object-cover mb-4" />
                            <div className="p-4">
                                <h2 className="text-2xl mb-2">{exhibition.Description}</h2>
                                <p className="text-gray-700 mb-4">{exhibition.description}</p>
                                <p className="text-sm text-gray-500">Location: {exhibition.Location}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Exhibits