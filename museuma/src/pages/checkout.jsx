import React from 'react';

const orderSummary = [
    {
        image: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        title: "Nike Air Max Pro 8888 - Super Light",
        size: "42EU - 8.5US",
        price: "$138.99"
    },
    {
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        title: "Nike Air Max Pro 8888 - Super Light",
        size: "42EU - 8.5US",
        price: "$238.99"
    }
];

function Checkout() {
    return (
        <main className="min-h-screen p-4 bg-[#EFEDE5]">
            <h1 className="text-4xl mb-4 text-center mt-24 rounded-xl pl-2">Checkout</h1>

            <div className='flex flex-row justify-center'>
                <div className='flex-row bg-white w-fit justify-center items-center rounded-xl p-8'>
                    <div className="flex justify-center">
                        <div className="flex justify-center gap-4">

                            <div className="border border-gray-200 rounded-lg p-4">
                                <h2 className="text-xl font-medium mb-2">Payment Details</h2>
                                <p className="text-gray-400 mb-4">Complete your order by providing your payment details.</p>
                                <form className="space-y-4">
                                    <input type="text" placeholder="Email" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />
                                    <input type="text" placeholder="Card Holder" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />
                                    <input type="text" placeholder="Card Details" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />
                                    <input type="text" placeholder="Billing Address" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Total</p>
                                        <p className="text-2xl text-gray-900">$408.00</p>
                                    </div>
                                    <button className="w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                                </form>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 w-fit">
                                <h2 className="text-xl font-medium mb-2">Order Summary</h2>
                                <p className="text-gray-400 mb-4">Check your items and select a shipping method.</p>
                                <div className="space-y-4">
                                    {orderSummary.map((item, index) => (
                                        <div className="flex" key={index}>
                                            <img className="w-24 h-24 object-cover rounded-md mr-4" src={item.image} alt="Artwork" />
                                            <div className="flex flex-col">
                                                <h3 className="text-lg">{item.title}</h3>
                                                <p className="text-gray-600 mb-1">{item.size}</p>
                                                <p className="text-lg">{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Checkout;
