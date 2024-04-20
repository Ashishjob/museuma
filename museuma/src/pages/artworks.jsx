import React, { useState, useEffect } from 'react';

function Artworks() {
  const [artworks, setArtWork] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("https://museuma.onrender.com/manage-artworks"); // Endpoint URL should match your backend route
        if (!response.ok) {
          throw new Error("Failed to fetch artworks");
        }
        const data = await response.json();
        const activeArtWork = data.filter((artwork) => artwork.active === 1);
        setArtWork(activeArtWork);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        // Handle error as needed
      }
    };

    fetchArtworks();
  }, []);

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
            <option value="title_asc">Sort by Title ▲</option>
            <option value="title_desc">Sort by Title ▼</option>
            <option value="date_asc">Sort by Date ▲</option>
            <option value="date_desc">Sort by Date ▼</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredArtworks.map((artwork, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-2">
              <img src={artwork.image} alt={artwork.title} className="mx-auto w-fit h-64 rounded" />
              <div className='flex flex-row justify-between'>
                <h2 className="text-xl mt-2">{artwork.title}</h2>
                <h3 className="text-base text-gray-500 mt-2">{artwork.medium}</h3>
              </div>
              <p className="">Artist: {artwork.artist}</p>
              <p className="text-base">{new Date(artwork.creationDate).toLocaleDateString()}</p>
              <p className='text-gray-500'>{artwork.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Artworks;