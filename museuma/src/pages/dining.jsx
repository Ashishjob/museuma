import cus from "../components/cuisine.jpg";

function dining() {
  return (
    <main className="h-screen bg-[#EFEDE5] w-screen overflow-y-auto relative">
      <h3 className="text-[#313639] text-7xl mb-2 tracking-widest text-center">
        Dining
      </h3>
      <p className="text-[#313639] text-3xl tracking-wider text-center">
        With a focus on sustainability, we have fresh, healthy <br></br>culinary
        options and a range of cuisine made from local ingredients.
      </p>
      <p className="text-[#313639] text-5xl ml-44 mt-48">
        FINE DINING IN HOUSTON
      </p>
      <p className="text-[#313639] text-2xl ml-44 mt-5 mb-60 tracking-wider">
        A twist on traditional in all of our favorite ambiences, the <br></br>
        baker museum caters to all tastes. Chic dining, terrace views <br></br>
        and one of a kind paintings are all offered up with truly unique
        <br></br> dining experiences.
      </p>
      <div className="absolute flex justify-end h-3/4 top-72 right-60 z-10">
        <img src={cus} />
      </div>
      <h1 className="text-[#313639] text-center text-3xl">
        Our top 3 chef's recommendation:
      </h1>
      <div className="bg-[#bfbaa3] w-screen h-60 flex text-center absolute mt-1 mb-48">
        <div className="flex flex-row justify-between py-4 text-3xl">
          <div>
            <p className="text-white ">Artisanal Truffle Risotto</p>
            <p className="text-[#313639] text-lg">
              Creamy Arborio rice cooked to perfection with luxurious black
              truffle, infused with delicate flavors of shallots, garlic, and
              Parmesan cheese.
            </p>
          </div>
          <div>
            <p className="text-white ">Elegance Éclair Tower</p>
            <p className="text-[#313639] text-lg">
              Delicate choux pastry filled with smooth vanilla bean pastry
              cream, stacked in a towering display, adorned with shimmering
              edible gold leaf and seasonal berries, served with a decadent
              chocolate ganache.
            </p>
          </div>
          <div>
            <p className="text-white ">Renaissance Ravioli with Sage Butter</p>
            <p className="text-[#313639] text-lg">
              Handcrafted pasta parcels filled with a decadent blend of ricotta
              cheese and spinach, delicately bathed in a velvety sage-infused
              butter sauce, garnished with toasted pine nuts.{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default dining;
