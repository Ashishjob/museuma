import React, { useState } from "react";

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [gender, setGender] = useState("Female");
  const [contactNumber, setContactNumber] = useState("+11 998001001");
  const [currentAddress, setCurrentAddress] = useState("Beech Creek, PA, Pennsylvania");
  const [permanentAddress, setPermanentAddress] = useState("Arlington Heights, IL, Illinois");
  const [email, setEmail] = useState("jane@example.com");
  const [birthday, setBirthday] = useState("Feb 06, 1998");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="flex flex-col w-full items-center mt-24">
        <h1 className="text-4xl mb-4 items-start text-left w-9/12">Your Profile:</h1>
        <div className="w-full md:w-9/12 mx-2 h-64 rounded-xl">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
                  <div className="flex flex-col justify-center mt-3">
                    <label className="font-bold text-[#313639]">First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Phone Number:</label>
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Gender:</label>
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Current Address:</label>
                    <input type="text" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Permanent Address:</label>
                    <input type="text" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} className="p-2 border border-[#313639] rounded" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[#313639]">Birthday:</label>
                    <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="p-2 border border-[#313639] rounded" />
                  </div>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{firstName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{lastName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Phone No.</div>
                    <div className="px-4 py-2">{phoneNumber}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Current Address</div>
                    <div className="px-4 py-2">{currentAddress}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Permanent Address</div>
                    <div className="px-4 py-2">{permanentAddress}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800" href={`mailto:${email}`}>{email}</a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">{birthday}</div>
                  </div>
                </div>
              )}
            </div>
            <button
              type={isEditing ? "submit" : "button"}
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#313639] hover:bg-[#C0BAA4] hover:text-[#313639] text-white p-2 rounded mt-4 w-full"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditProfile;