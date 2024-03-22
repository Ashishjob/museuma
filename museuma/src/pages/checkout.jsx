import React from 'react';

const orderSummary = [
    {
        image: "productplaceholder.png",
        title: "Modern Art Exhibit Adult Ticket",
        quantity: 2,
        price: "$13.99"
    },
    {
        image: "/productplaceholder.png",
        title: "Mona Lisa Print",
        quantity: 1,
        price: "$24.99"
    }
];

const total = orderSummary.reduce((total, item) => {
    const price = Number(item.price.replace('$', ''));
    return total + price;
}, 0);

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
                                        <p className="text-2xl text-gray-900">${total.toFixed(2)}</p>
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
                                                <p className="text-gray-600 mb-1">x {item.quantity}</p>
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
