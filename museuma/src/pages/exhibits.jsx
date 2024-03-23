import React from 'react'

const exhibits = [
    {
      title: 'Modern Art: A Retrospective',
      description: 'Explore the evolution of modern art through this comprehensive retrospective featuring works by renowned artists of the 20th century.',
      location: 'Gallery 1',
      image: '/exhibit1.jpg',
    },
    {
      title: 'Ancient Civilizations Unveiled',
      description: 'Marvel at artifacts, sculptures, and relics that offer glimpses into the rich cultural heritage of bygone eras.',
      location: 'Gallery 2',
      image: '/exhibit2.jpg',
    },
    {
        title: "Exploring Nature's Canvas: Landscapes from Around the World",
        description: "From majestic mountains to serene seascapes, immerse yourself in the beauty and diversity of our natural world captured by talented artists.",
        location: 'Gallery 3',
        image: '/exhibit3.jpg',
    },
  ];

function Exhibits() {
    return(
        <div className="p-4 mx-auto max-w-7xl">
            <div className="text-4xl font-bold mb-8 text-center">Exhibits</div>
            <p className="mb-6 text-2xl text-gray-600">
                Welcome to the heart of artistic discovery at Bakers Museum. 
                Our exhibits offer a captivating journey through diverse realms of art, history, and culture. 
                Immerse yourself in a world of creativity, innovation, 
                and storytelling as you browse through our current and upcoming exhibits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {exhibits.map((exhibition, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
                        <img src={exhibition.image} alt={`Image for ${exhibition.title}`} className="w-full h-64 object-cover mb-4"/>
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2">{exhibition.title}</h2>
                            <p className="text-gray-700 mb-4">{exhibition.description}</p>
                            <p className="text-sm text-gray-500">Location: {exhibition.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Exhibits