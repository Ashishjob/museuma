function Complaints() {
  return (
    <main className="h-screen bg-[#EFEDE5] w-screen">
      <h3 className="text-[#313639] text-7xl mb-2 ml-12 tracking-widest flex flex-col items-center">
        Complaints?
      </h3>
      <p className="text-[#313639] text-3xl ml-12 tracking-wider">
        Had a problem in the Baker Museum? <br></br>Let us know!
      </p>

      <p className="text-[#313639] text-xl ml-12 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum illum nam
        quibusdam <br></br> sit amet consectetur adipisicing elit. Obcaecati
        magnam sint necessitatibus commodi corrupti<br></br>voluptatum in,
        exercitationem fugit adipisci id? dolor sit amet consectetur, <br></br>
        adipisicing elit. Cumque aperiam nesciunt praesentium at veritatis
        repellat nobis accusamus <br></br>blanditiis ipsam! Excepturi libero
        laudantium, enim provident dolore laboriosam amet repudiandae<br></br>{" "}
        esse. Mollitia velit culpa temporibus? Enim, esse maxime quisquam optio
        eius illo ab magni deleniti<br></br>eveniet sit iusto, sunt molestiae
        tenetur consectetur.
      </p>

      <div className="flex absolute justify-end w-full top-60">
        <div className="bg-[#bfbaa3] w-1/3 h-80 mr-36 rounded-md shadow-2xl fixed">
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
