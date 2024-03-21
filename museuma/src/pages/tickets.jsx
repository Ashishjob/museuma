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
            name: 'Exhibition A',
            description: 'Discover the wonders of ancient civilizations.',
        },
        {
            name: 'Exhibition B',
            description: 'Explore the mysteries of the deep sea.',
        },
        {
            name: 'Exhibition C',
            description: 'Experience the beauty of modern art.',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Tickets</h1>
            <div className="mt-4 w-full max-w-xs">
                <h2 className="text-xl mb-2">Select Exhibition</h2>
                <select
                    value={selectedExhibition}
                    onChange={handleExhibitionChange}
                    className="border border-gray-300 rounded p-2 w-full"
                >
                    <option value="">Select Exhibition</option>
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
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Buy Tickets
                    </button>
                </div>
            )}
        </div>
    );
}

export default Tickets;