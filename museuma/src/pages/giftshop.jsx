import React, { useState } from 'react';

function Giftshop() {
    // This will be replaced with actual data later
    const products = [
        {
            item_id: 1,
            title: 'The Whispering Wind',
            description: 'An evocative exploration of movement and sound, captured in the medium of oil on canvas.',
            price: 100, // Example price, you can set actual prices
            item_stock: 10,
            image: '/productplaceholder.png',
        },
        {
            item_id: 2,
            title: 'Dance of the Fireflies',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            price: 120,
            item_stock: 15,
            image: '/productplaceholder.png',
        },
        {
            item_id: 3,
            title: 'Dance of the Fireflies',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            price: 120,
            item_stock: 15,
            image: '/productplaceholder.png',
        },
        {
            item_id: 3,
            title: 'Dance of the Fireflies',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            price: 120,
            item_stock: 15,
            image: '/productplaceholder.png',
        },
        {
            item_id: 3,
            title: 'Dance of the Fireflies',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            price: 120,
            item_stock: 15,
            image: '/productplaceholder.png',
        },
        {
            item_id: 1,
            title: 'The Whispering Wind',
            description: 'An evocative exploration of movement and sound, captured in the medium of oil on canvas.',
            price: 100, // Example price, you can set actual prices
            item_stock: 10,
            image: '/productplaceholder.png',
        },
        {
            item_id: 2,
            title: 'Dance of the Fireflies',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            price: 120,
            item_stock: 15,
            image: '/productplaceholder.png',
        },
        {
            item_id: 3,
            title: 'Dance of the Fireflies',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            price: 120,
            item_stock: 15,
            image: '/productplaceholder.png',
        },
        {
            item_id: 3,
            title: 'Dance of the Fireflies',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            price: 120,
            item_stock: 15,
            image: '/productplaceholder.png',
        },
        {
            item_id: 3,
            title: 'Dance of the Fireflies',
            description: 'A vibrant depiction of nature’s nightly ballet, immortalized in acrylic on canvas.',
            price: 120,
            item_stock: 15,
            image: '/productplaceholder.png',
        },
        // Add more products as needed
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
                <div className="grid grid-cols-5 gap-4">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-2 w-full">
                            <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded" />
                            <h2 className="text-xl mt-2">{product.title}</h2>
                            <p className="text-gray-500">{product.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <p className="font-bold">${product.price}</p>
                                <div className="flex items-center">
                                    <input type="number" min="1" max={product.item_stock} defaultValue="1" className="border border-gray-300 rounded-md px-2 py-1 mr-2 w-16" />
                                    <button className="text-black px-4 py-2 rounded" style={{ backgroundColor: '#EFEDE5' }}>Add to Cart</button>
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
