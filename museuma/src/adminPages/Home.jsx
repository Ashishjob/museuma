import React from 'react';
import '../App.css';
import '../index.css';

const AdminHome = () => {
    return (
        <main className="h-screen bg-[#EFEDE5] w-screen" style={{
            backgroundImage: `url('./adminbg.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className="w-full flex flex-row justify-center">
                <div className="flex mt-20 w-2/3 justify-center">
                    <div className="flex flex-col items-center">
                        <h3 className="text-[#313639] text-4xl mt-12 justify-center mb-2 tracking-wide w-fit items-center text-nowrap">
                            Admin Dashboard
                        </h3>
                        <div className="flex flex-col tracking-wide">
                            <a href="/admin/manage-employees"><button onClick={() => console.log('Manage Employees')} className="admin-button">Manage Employees</button></a>
                            <a href="/admin/ticket-report"><button onClick={() => console.log('View Ticket Sales Reports')} className="admin-button">View Ticket Sales Reports</button></a>
                            <a href="/admin/giftshop-report"><button onClick={() => console.log('View Gift Shop Sales Reports')} className="admin-button">View Gift Shop Sales Reports</button></a>
                            <a href="/admin/total-report"><button onClick={() => console.log('View Total Sale Reports')} className="admin-button">View Total Sale Reports</button></a>
                            <a href="/admin/manage-exhibits"><button onClick={() => console.log('Manage Exhibits')} className="admin-button">Manage Exhibits</button></a>
                            <a href="/admin/manage-artworks"><button onClick={() => console.log('Manage Artworks')} className="admin-button">Manage Artworks</button></a>
                            <a href="/admin/view-complaints"><button onClick={() => console.log('View Complaints')} className="admin-button">View Complaints</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminHome;