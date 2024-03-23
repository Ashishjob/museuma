import React, { useState } from 'react';

function Giftshop() {
    // This will be replaced with actual data later
    const products = [
        {
            item_id: 1,
            title: 'Sunset Serenade',
            description: 'Experience the symphony of colors as the sun bids farewell to the day in this captivating watercolor masterpiece.',
            price: 150,
            item_stock: 10,
            image: '/giftSunset.png',
        },
        {
            item_id: 2,
            title: 'Moonlit Melodies',
            description: 'Surrender to the enchanting tunes of the night with this stunning depiction of moonlit landscapes in oil on canvas.',
            price: 180,
            item_stock: 15,
            image: '/giftMoon.png',
        },
        {
            item_id: 3,
            title: 'Whispers of Nature',
            description: 'Hear the secrets of the forest in this ethereal portrayal of nature\'s harmony, captured in delicate pastels.',
            price: 120,
            item_stock: 15,
            image: '/giftWhisper.png',
        },
        {
            item_id: 4,
            title: 'Ocean\'s Embrace',
            description: 'Dive into the depths of tranquility with this mesmerizing portrayal of the ocean\'s embrace, rendered in mixed media.',
            price: 200,
            item_stock: 15,
            image: '/giftOcean.png',
        },
        {
            item_id: 5,
            title: 'Starry Reverie',
            description: 'Lose yourself in the celestial dance of stars with this captivating rendition of the night sky, painted with precision in acrylic.',
            price: 160,
            item_stock: 15,
            image: '/giftStarry.png',
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('asc');
    const [sort, setSort] = useState('title');

    const filteredProducts = products
        .filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sort === 'title') {
                return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            } else if (sort === 'price') {
                return order === 'asc' ? a.price - b.price : b.price - a.price;
            }
        });

    return (
        <main className=''>
            <div className="p-4">
                <h1 className="text-4xl mb-4 bg-[#EFEDE5] rounded-xl pl-2">Gift Shop</h1>
                <div className="mb-4 flex w-full">
                    <input
                        type="text"
                        placeholder="Search products"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="border border-gray-200 rounded p-2 mr-2 flex-grow"
                    />
                    <select value={sort} onChange={e => setSort(e.target.value)} className="border border-gray-200 rounded p-2 w-1/6">
                        <option value="title">Sort by Title</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>
                <div className="grid grid-cols-4 gap-7">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-2 w-full">
                            <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded" />
                            <h2 className="text-xl mt-2">{product.title}</h2>
                            <p className="text-gray-500">{product.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <p className="font-bold">${product.price}</p>
                                <div className="flex items-center">
                                    <input type="number" min="1" max={product.item_stock} defaultValue="1" className="border border-gray-300 rounded-md px-2 py-1 mr-2 w-16" />
                                    <button className="px-4 py-2 rounded text-black" style={{backgroundColor: '#BBB5A4', transition: 'background-color 0.3s, color 0.3s',}}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#7D7869'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#BBB5A4'}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Giftshop;
