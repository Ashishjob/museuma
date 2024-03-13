function Complaints() {
  return (
    <main className="h-screen bg-[#EFEDE5] w-screen">
      <h3 className="text-[#313639] text-7xl mb-2 ml-12 tracking-widest">
        Complaints page
      </h3>
      <p className="text-[#313639] text-3xl ml-12 tracking-widest">
        Had a problem in the Baker Museum? <br></br>Let us know!
      </p>

      <div className="flex justify-end w-full">
        <div className="bg-[#bfbaa3] w-1/3 h-80 mr-36 rounded-md">
          <div className=" text-2xl ml-12 mt-5">
            <label for="name">Name: </label>
            <input
              type="text"
              id="name"
              name="Name"
              maxLength="25"
              required
            ></input>
          </div>
          <label className="block text-2xl ml-12 mt-5" for="description">
            Description:{" "}
          </label>
          <textarea
            type="text"
            id="description"
            name="Description"
            maxLength="200"
            rows={5}
            cols={50}
            className="flex mt-1 ml-24"
            required
          />
          <button
            className="p-2 ml-80 mt-5 text-xl rounded-3xl border border-[#313639] border-4 hover:bg-gray-700 hover:text-white"
            type="submit"
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </main>
  );
}

export default Complaints;
