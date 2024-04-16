import React from 'react';
import '../App.css';
import '../index.css';

const AdminHome = () => {
    return (
        <main className="min-h-screen bg-[#EFEDE5] w-screen" style={{
            backgroundImage: `url('./adminbg.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <div className="w-full flex flex-row justify-center">
                <div className="flex mt-20 w-2/3 justify-center">
                    <div className="flex flex-col items-center">
                        <h3 className="text-[#313639] text-4xl justify-center mb-2 tracking-wide w-fit items-center text-nowrap">
                            Admin Dashboard
                        </h3>
                        <div className="flex flex-col tracking-wide">
                            <a href="/profile"><button onClick={() => console.log('View/Edit Profile')} className="admin-button">Profile</button></a>
                            <select className="admin-button text-center " onChange={(e) => window.location.href = e.target.value}>    <option value="">View Reports...</option>
                                <option value="/admin/total-report">View Total Sale Reports</option>
                                <option value="/admin/exhibit-report">View Exhibit Reports</option>
                                <option value="/admin/view-complaints">View Complaints</option>
                            </select>
                            <select className="admin-button text-center " onChange={(e) => window.location.href = e.target.value}>
                                <option value="">Management Options</option>
                                <option value="/admin/manage-employees">Manage Employees</option>
                                <option value="/admin/manage-artworks">Manage Artworks</option>
                                <option value="/admin/manage-exhibits">Manage Exhibits</option>
                                <option value="/admin/manage-giftshop">Manage Gift Shop</option>
                                <option value="/admin/manage-restaurant">Manage Restaurant</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdminHome;