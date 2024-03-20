import React, { useState } from 'react';
import "../App.css";
import "../index.css";

function ShoppingCart() {
    const [items, setItems] = useState([
        { id: 1, name: "Item 1", price: 10, quantity: 2 },
        { id: 2, name: "Item 2", price: 20, quantity: 1 },
        { id: 3, name: "Item 3", price: 30, quantity: 3 },
    ]);

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleIncrease = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const handleDecrease = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item));
    };

    const handleRemove = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <main className="min-h-screen bg-[#EFEDE5] w-screen">
            <div class="mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-center">
                <h1 className="text-4xl mb-4 text-center mt-24 rounded-xl pl-2">Your Cart</h1>
                </div>

                <div class="mx-auto max-w-2xl">
                <div className='flex-row bg-white w-fit justify-center items-center rounded-xl p-4'>
                        <div class="px-4 py-6 sm:px-8 sm:py-10">
                            <div class="flow-root">
                                <ul class="-my-8">
                                    {items.map((item) => (
                                        <li class="flex flex-col space-y-3 py-2 my-2 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                            <div class="shrink-0">
                                                <img className="h-24 w-24 max-w-full rounded-lg object-cover" src="/museuma1.png" alt="Product" />
                                            </div>

                                            <div class="relative flex flex-1 flex-col justify-between">
                                                <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                    <div class="pr-8 sm:pr-5">
                                                        <p class="text-base text-gray-900">{item.name}</p>
                                                        <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">{item.quantity}</p>
                                                    </div>

                                                    <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                    <p class="shrink-0 w-20 text-base text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${item.price * item.quantity}</p>
                                                        <div class="sm:order-1">
                                                            <div class="mx-auto flex h-8 items-stretch text-gray-600">
                                                            <button onClick={() => handleDecrease(item.id)} class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                                                                <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                                                                <button onClick={() => handleIncrease(item.id)} class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                <button onClick={() => handleRemove(item.id)} type="button" class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">                                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div class="mt-10 border-t border-b py-2">
                                <div class="flex items-center justify-between">
                                    <p class="text-sm text-gray-400">Subtotal</p>
                                    <p class="text-lg text-gray-900">${total}</p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <p class="text-sm text-gray-400">Shipping</p>
                                    <p class="text-lg text-gray-900">$8.00</p>
                                </div>
                            </div>
                            <div class="mt-6 flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-900">Total</p>
                                <p class="text-2xl text-gray-900"><span class="text-2xl font-normal text-gray-400">$</span> {total + 8.00}</p>
                            </div>
                            <div class="mt-6 text-center">
                                <a href='/checkout'>
                                <button type="button" class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                    Checkout
                                    <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ShoppingCart;