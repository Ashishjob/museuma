import React, { useState } from 'react';

function Artworks() {
    // This will be replaced with actual data later
    const artworks = [
        {
            title: 'The Whispering Wind',
            artist: 'Joseph Michael Baker',
            description: 'An evocative exploration of movement and sound, captured in the medium of oil on canvas.',
            medium: 'Oil on canvas',
            date: '01/13/2004',
            image: '/museuma1.png',
        },
        {
            title: 'Dance of the Fireflies',
            artist: 'Jane Doe',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            medium: 'Acrylic on canvas',
            date: '02/14/2005',
            image: '/museuma2.png',
        },
        {
            title: 'Echoes of the Ocean',
            artist: 'John Smith',
            description: 'A serene watercolor tribute to the rhythmic ebb and flow of the sea.',
            medium: 'Watercolor on paper',
            date: '03/15/2006',
            image: '/museuma3.png',
        },
        {
            title: 'Shadows and Whispers',
            artist: 'Emily Johnson',
            description: 'A haunting exploration of light and darkness, rendered in stark charcoal on paper.',
            medium: 'Charcoal on paper',
            date: '04/16/2007',
            image: '/museuma4.png',
        },
        {
            title: 'Blossom in the Storm',
            artist: 'Robert Brown',
            description: 'A pastel on paper piece that captures the resilience and beauty of nature amidst chaos.',
            medium: 'Pastel on paper',
            date: '05/17/2008',
            image: '/museuma5.png',
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('asc');
    const [sort, setSort] = useState('title');

    const filteredArtworks = artworks
        .filter(artwork =>
            artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sort === 'title') {
                return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            } else if (sort === 'date') {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return order === 'asc' ? dateA - dateB : dateB - dateA;
            }
        });

    return (
        <main className=''>
            <div className="p-4">
                <h1 className="text-4xl mb-4 bg-[#EFEDE5] rounded-xl pl-2">Artworks</h1>
                <div className="mb-4 flex w-full">
                    <input
                        type="text"
                        placeholder="Search artworks"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="border border-gray-200 rounded p-2 mr-2 flex-grow"
                    />
                    <select value={sort} onChange={e => setSort(e.target.value)} className="border border-gray-200 rounded p-2 w-1/6">
                        <option value="title">Sort by Title</option>
                        <option value="date">Sort by Date</option>
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {filteredArtworks.map((artwork, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-2">
                            <img src={artwork.image} alt={artwork.title} className="w-full h-64 object-cover rounded" />
                            <div className='flex flex-row justify-between'>
                                <h2 className="text-xl mt-2">{artwork.title}</h2>
                                <h3 className="text-base text-gray-500 mt-2">{artwork.medium}</h3>
                            </div>
                            <p className="">Artist: {artwork.artist}</p>
                            <p className="text-base">{artwork.date}</p>
                            <p className='text-gray-500'>{artwork.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Artworks;