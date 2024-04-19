import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Tickets() {
    const [selectedExhibition, setSelectedExhibition] = useState('');
    const [selectedExhibitionDescription, setSelectedExhibitionDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [adultTickets, setAdultTickets] = useState(0);
    const [studentTickets, setStudentTickets] = useState(0);
    const [childTickets, setChildTickets] = useState(0);
    const [militaryTickets, setMilitaryTickets] = useState(0);

    const handleExhibitionChange = (event) => {
        const selectedExhibition = event.target.value;
        const selectedExhibit = exhibits.find(exhibit => exhibit.Description === selectedExhibition);
        setSelectedExhibition(selectedExhibition);
        setSelectedExhibitionDescription(selectedExhibit ? selectedExhibit.Description : '');
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const incrementTicketCount = (type) => {
        switch (type) {
            case 'adult':
                setAdultTickets(adultTickets + 1);
                break;
            case 'student':
                setStudentTickets(studentTickets + 1);
                break;
            case 'child':
                setChildTickets(childTickets + 1);
                break;
            case 'military':
                setMilitaryTickets(militaryTickets + 1);
                break;
            default:
                break;
        }
    };

    const decrementTicketCount = (type) => {
        switch (type) {
            case 'adult':
                if (adultTickets > 0) {
                    setAdultTickets(adultTickets - 1);
                }
                break;
            case 'student':
                if (studentTickets > 0) {
                    setStudentTickets(studentTickets - 1);
                }
                break;
            case 'child':
                if (childTickets > 0) {
                    setChildTickets(childTickets - 1);
                }
                break;
            case 'military':
                if (militaryTickets > 0) {
                    setMilitaryTickets(militaryTickets - 1);
                }
                break;
            default:
                break;
        }
    };

    const totalPrice = (adultTickets * 20) + (studentTickets * 15) + (childTickets * 10) + (militaryTickets * 10);

    const exhibitions = [
        {
            name: 'Modern Art: A Retrospective',
            description: 'Explore the evolution of modern art through this comprehensive retrospective featuring works by renowned artists of the 20th century.',
        },
        {
            name: 'Ancient Civilizations Unveiled',
            description: 'Marvel at artifacts, sculptures, and relics that offer glimpses into the rich cultural heritage of bygone eras.',
        },
        {
            name: 'Exploring Nature\'s Canvas',
            description: 'From majestic mountains to serene seascapes, immerse yourself in the beauty and diversity of our natural world captured by talented artists.',
        },
    ];

    const exhibitionIds = {
        'Modern Art: A Retrospective': 'exhibition1',
        'Ancient Civilizations Unveiled': 'exhibition2',
        'Exploring Nature\'s Canvas': 'exhibition3',
        // Add more exhibitions and their corresponding identifiers here
    };

    const [showPopup, setShowPopup] = useState(false);

    const addToCart = (product, quantity) => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const exhibitionTitle = selectedExhibition;
        const exhibitionId = exhibitionIds[selectedExhibition]; // Get the ID for the selected exhibition

        // Add adult tickets to cart if quantity is greater than 0
        if (adultTickets > 0) {
            const existingAdultItemIndex = cartItems.findIndex(item => item.title === `${exhibitionTitle} - Adult Ticket`);
            if (existingAdultItemIndex !== -1) {
                cartItems[existingAdultItemIndex].quantity += adultTickets;
            } else {
                cartItems.push({
                    item_id: `adult_${exhibitionId}`,
                    title: `${exhibitionTitle} - Adult Ticket`,
                    price: 20,
                    quantity: adultTickets,
                    image: '/ticket.jpeg'
                });
            }
        }

        // Add student tickets to cart if quantity is greater than 0
        if (studentTickets > 0) {
            const existingStudentItemIndex = cartItems.findIndex(item => item.title === `${exhibitionTitle} - Student Ticket`);
            product.image = '/ticket.jpeg';
            if (existingStudentItemIndex !== -1) {
                cartItems[existingStudentItemIndex].quantity += studentTickets;
            } else {
                product.image = '/ticket.jpeg';
                cartItems.push({
                    item_id: `student_${exhibitionId}`,
                    title: `${exhibitionTitle} - Student Ticket`,
                    price: 15,
                    quantity: studentTickets,
                    image: '/ticket.jpeg'
                });
            }
        }

        // Add child tickets to cart if quantity is greater than 0
        if (childTickets > 0) {
            const existingChildItemIndex = cartItems.findIndex(item => item.title === `${exhibitionTitle} - Child Ticket`);
            product.image = '/ticket.jpeg';
            if (existingChildItemIndex !== -1) {
                cartItems[existingChildItemIndex].quantity += childTickets;
            } else {
                product.image = '/ticket.jpeg';
                cartItems.push({
                    item_id: `child_${exhibitionId}`,
                    title: `${exhibitionTitle} - Child Ticket`,
                    price: 10,
                    quantity: childTickets,
                    image: '/ticket.jpeg'
                });
            }
        }

        // Add military tickets to cart if quantity is greater than 0
        if (militaryTickets > 0) {
            const existingMilitaryItemIndex = cartItems.findIndex(item => item.title === `${exhibitionTitle} - Military Ticket`);
            product.image = '/ticket.jpeg';
            if (existingMilitaryItemIndex !== -1) {
                cartItems[existingMilitaryItemIndex].quantity += militaryTickets;
            } else {
                product.image = '/ticket.jpeg';
                cartItems.push({
                    item_id: `military_${exhibitionId}`,
                    title: `${exhibitionTitle} - Military Ticket`,
                    price: 10,
                    quantity: militaryTickets,
                    image: '/ticket.jpeg'
                });
            }
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    const [exhibits, setExhibits] = useState([]);

    useEffect(() => {
        const fetchExhibits = async () => {
            try {
                const response = await fetch("https://museuma.onrender.com/manage-exhibits");
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
        <div className="min-h-screen flex flex-col items-center" style={{ marginTop: '20px' }}>
            <h1 className="text-4xl font-bold">Tickets</h1>
            <p className="mb-6 text-2xl text-gray-600" style={{ marginTop: '32px', marginBottom: '24px', textAlign: 'center' }}>Explore the exquisite collection of artworks at the Baker Museum. <br /> Purchase your tickets now for an unforgettable experience.</p>
            <div className="mt-4 w-full max-w-xs">
                <h2 className="text-xl mb-2 flex justify-center">Select Exhibition</h2>
                <select
                    value={selectedExhibition}
                    onChange={handleExhibitionChange}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                    <option value="" disabled hidden>Please select an exhibition</option>
                    {exhibits && exhibits.map((exhibit) => (
                        <option key={exhibit.Exhibit_id} value={exhibit.Description}>
                            {exhibit.Description}
                        </option>
                    ))}
                </select>
                {selectedExhibitionDescription && (
                    <p className="mt-2 text-sm">{selectedExhibitionDescription}</p>
                )}
            </div>
            {selectedExhibition && (
                <div className="mt-4 w-full max-w-xs">
                    <h2 className="text-xl mb-2 flex justify-center">Select Date</h2>
                    <div className="mt-4 w-full max-w-xs flex justify-center">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="border border-gray-300 rounded p-2 w-full"
                            placeholderText="Select a date"
                            dateFormat="MMMM d, yyyy"
                            minDate={new Date()} // Minimum date is today
                        />
                    </div>
                </div>
            )}
            {selectedDate && (
                <div className="mt-4 w-full max-w-xs">
                    <h2 className="text-xl mb-2 flex justify-center">Select Quantity</h2>
                    <div className="flex flex-col items-center"> {/* Added flexbox container */}
                        <div className="mb-4">
                            <p>Adult ($20 each)</p>
                            <div className="flex items-center">
                                <button onClick={() => decrementTicketCount('adult')} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                                <input type="text" value={adultTickets} readOnly className="border border-gray-300 rounded-r p-2 w-12 text-center" />
                                <button onClick={() => incrementTicketCount('adult')} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p>Student ($15 each)</p>
                            <div className="flex items-center">
                                <button onClick={() => decrementTicketCount('student')} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                                <input type="text" value={studentTickets} readOnly className="border border-gray-300 rounded-r p-2 w-12 text-center" />
                                <button onClick={() => incrementTicketCount('student')} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p>Child ($10 each)</p>
                            <div className="flex items-center">
                                <button onClick={() => decrementTicketCount('child')} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                                <input type="text" value={childTickets} readOnly className="border border-gray-300 rounded-r p-2 w-12 text-center" />
                                <button onClick={() => incrementTicketCount('child')} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                            </div>
                        </div>
                        <div>
                            <p>Military ($10 each)</p>
                            <div className="flex items-center">
                                <button onClick={() => decrementTicketCount('military')} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                                <input type="text" value={militaryTickets} readOnly className="border border-gray-300 rounded-r p-2 w-12 text-center" />
                                <button onClick={() => incrementTicketCount('military')} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {selectedDate && (
                <div className="mt-6">
                    <h2 className="text-xl">Total Price: ${totalPrice}</h2>
                    <button
                        className="mt-4 mb-10 text-black font-bold py-2 px-4 rounded" // Added mb-4 for margin-bottom
                        style={{ backgroundColor: '#BBB5A4', transition: 'background-color 0.3s, color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#7D7869'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#BBB5A4'}
                        onClick={addToCart}
                    >
                        Add to Cart
                    </button>
                    {showPopup && (
                        <div style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            padding: '20px',
                            backgroundColor: '#BBB5A4',
                            borderRadius: '10px',
                            opacity: showPopup ? 1 : 0,
                            transition: 'opacity 0.5s',
                            display: 'flex',
                        }}>
                            <span role="img" aria-label="checkmark">✔️</span>
                            <p className="ml-4">Added to cart!</p>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default Tickets;