import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Tickets() {
    const [selectedExhibition, setSelectedExhibition] = useState('');
    const [selectedExhibitionDescription, setSelectedExhibitionDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [adultTickets, setAdultTickets] = useState(0);
    const [studentTickets, setStudentTickets] = useState(0);
    const [militaryTickets, setMilitaryTickets] = useState(0);

    const handleExhibitionChange = (e) => {
        const selectedExhibitionName = e.target.value;
        setSelectedExhibition(selectedExhibitionName);
        const selectedExhibitionData = exhibitions.find(exhibition => exhibition.name === selectedExhibitionName);
        setSelectedExhibitionDescription(selectedExhibitionData.description);
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
            case 'military':
                if (militaryTickets > 0) {
                    setMilitaryTickets(militaryTickets - 1);
                }
                break;
            default:
                break;
        }
    };

    const totalPrice = (adultTickets * 20) + (studentTickets * 15) + (militaryTickets * 10);

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

    return (
        <div className="min-h-screen flex flex-col items-center" style={{ marginTop: '20px' }}>
            <h1 className="text-4xl font-bold">Tickets</h1>
            <p className="mb-6 text-2xl text-gray-600" style={{ marginTop: '32px', marginBottom: '24px', textAlign: 'center' }}>Explore the exquisite collection of artworks at the Baker Museum. <br/> Purchase your tickets now for an unforgettable experience.</p>
            <div className="mt-4 w-full max-w-xs">
                <h2 className="text-xl mb-2">Select Exhibition</h2>
                <select
                    value={selectedExhibition}
                    onChange={handleExhibitionChange}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                    <option value="" disabled hidden>Please select an exhibition</option>
                    {exhibitions.map((exhibition, index) => (
                        <option key={index} value={exhibition.name}>
                            {exhibition.name}
                        </option>
                    ))}
                </select>
                {selectedExhibitionDescription && (
                    <p className="mt-2 text-sm">{selectedExhibitionDescription}</p>
                )}
            </div>
            {selectedExhibition && (
                <div className="mt-4 w-full max-w-xs">
                    <h2 className="text-xl mb-2">Select Date</h2>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        placeholderText="Select a date"
                        dateFormat="MMMM d, yyyy"
                    />
                </div>
            )}
            {selectedDate && (
                <div className="mt-4 w-full max-w-xs">
                    <h2 className="text-xl mb-2">Select Quantity</h2>
                    <div className="flex justify-between">
                        <div>
                            <p>Adult ($20 each)</p>
                            <div className="flex items-center">
                                <button onClick={() => decrementTicketCount('adult')} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                                <input type="text" value={adultTickets} readOnly className="border border-gray-300 rounded-r p-2 w-12 text-center" />
                                <button onClick={() => incrementTicketCount('adult')} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                            </div>
                        </div>
                        <div>
                            <p>Student ($15 each)</p>
                            <div className="flex items-center">
                                <button onClick={() => decrementTicketCount('student')} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                                <input type="text" value={studentTickets} readOnly className="border border-gray-300 rounded-r p-2 w-12 text-center" />
                                <button onClick={() => incrementTicketCount('student')} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
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
                    <button className="mt-4 text-black font-bold py-2 px-4 rounded"style={{backgroundColor: '#BBB5A4', transition: 'background-color 0.3s, color 0.3s',}}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#7D7869'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#BBB5A4'}>
                        Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
}

export default Tickets;