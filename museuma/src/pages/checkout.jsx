import React from 'react';
import { useState, useEffect } from 'react';

function Checkout() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setItems(cartItems);
    }, []);

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleIncrease = (id) => {
        const updatedItems = items.map(item =>
            item.item_id === id ? { ...item, quantity: item.quantity + 1 } : item
        );

        setItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleDecrease = (id) => {
        const updatedItems = items.map(item =>
            item.item_id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
        );

        setItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleRemove = (id) => {
        const updatedItems = items.filter(item => item.item_id !== id);

        setItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handlePlaceOrder = () => {
        // Get the current date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString().slice(2);
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed


        const cardHolder = document.querySelector('input[placeholder="Card Holder"]').value;
        const cardNumber = document.querySelector('input[placeholder="Card Number"]').value;
        const expirationDate = document.querySelector('input[placeholder="Expiration Date (MM/YY)"]').value;
        const securityCode = document.querySelector('input[placeholder="Security Code"]').value;
        const cardType = document.querySelector('select').value;

        const [inputMonth, inputYear] = expirationDate.split('/');

        if (inputYear < currentYear || (inputYear === currentYear && inputMonth <= currentMonth)) {
            alert('The expiration date must be greater than the current date.');
            return;
        }

        const orderDetails = {
            cardHolder,
            cardNumber,
            expirationDate,
            securityCode,
            cardType,
        };

        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

        localStorage.clear();

        setItems([]);
    }

    const [email, setEmail] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [cardType, setCardType] = useState('');

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\s/g, '');
        value = value.match(/.{1,4}/g)?.join(' ') || '';
        setCardNumber(value.slice(0, 19));
    };

    const handleExpirationDateChange = (e) => {
        let value = e.target.value.replace(/\//g, '');
        value = value.match(/.{1,2}/g)?.join('/') || '';
        value = value.slice(0, 5);
        setExpirationDate(value);
    };

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
                                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />
                                    <input type="text" value={cardHolder} onChange={e => setCardHolder(e.target.value)} placeholder="Card Holder" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />
                                    <input type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="Card Number" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />
                                    <div className="flex space-x-4">
                                        <input type="text" value={expirationDate} onChange={handleExpirationDateChange} placeholder="Expiration Date (MM/YY)" pattern="(0[1-9]|1[0-2])\/\d{2}" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />
                                        <input type="text" value={securityCode} onChange={e => setSecurityCode(e.target.value)} placeholder="Security Code" maxLength="3" minLength={3} className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500" />                                    </div>
                                    <select value={cardType} onChange={e => setCardType(e.target.value)} className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500">
                                        <option value="">Select Card Type</option>
                                        <option value="debit">Debit</option>
                                        <option value="credit">Credit</option>
                                    </select>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Total</p>
                                        <p className="text-2xl text-gray-900">${total.toFixed(2)}</p>
                                    </div>
                                    <a href='/thanks-for-order'>
                                        <button onClick={handlePlaceOrder} disabled={!email || !cardHolder || !cardNumber || !expirationDate || !securityCode || !cardType || items.length === 0} className={`w-full rounded-md px-6 py-3 font-medium text-white ${(!email || !cardHolder || !cardNumber || !expirationDate || !securityCode || !cardType) ? 'bg-gray-900' : 'bg-gray-700'}`}>Place Order</button> </a>
                                </form>

                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 w-fit">
                                <h2 className="text-xl font-medium mb-2">Order Summary</h2>
                                <p className="text-gray-400 mb-4">Check your items and select a shipping method.</p>
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <div className="flex" key={index}>
                                            <img className="w-24 h-24 object-cover rounded-md mr-4" src={item.image} alt="Artwork" />
                                            <div className="flex flex-col">
                                                <h3 className="text-lg">{item.title}</h3>
                                                <p className="text-gray-600 mb-1">x {item.quantity}</p>
                                                <p className="text-lg">${item.price.toFixed(2)}</p>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => handleIncrease(item.item_id)} type="button" className="flex rounded p-2 text-center text-black transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 text-3xl">+</button>
                                                    <button onClick={() => handleDecrease(item.item_id)} type="button" className="flex rounded p-2 text-center text-black transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 text-3xl">-</button>
                                                    <button onClick={() => handleRemove(item.item_id)} type="button" className="flex rounded p-2 text-center text-black transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 text-sm items-center">Remove</button>
                                                </div>
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
