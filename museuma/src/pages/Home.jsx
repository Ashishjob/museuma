import { Link } from "react-router-dom";
import ThreeJSPage from "../components/threejs";
import Languages from "../components/languages";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../App.css";
import "../index.css";
import { motion } from 'framer-motion';

const LeftSide = () => {
  return (
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: '0%' }}
      transition={{ duration: 3 }}
      className="left-side"
    >
    </motion.div>
  );
};

const RightSide = () => {
  return (
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: '0%' }}
      transition={{ duration: 3 }}
      className="right-side"
    >
    </motion.div>
  );
};

function Home() {
  const images = [
    "/museuma1.png",
    "/museuma2.png",
    "/museuma3.png",
    "/museuma4.png",
    "/museuma5.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);
  return (
    <>
    <LeftSide />
    <RightSide />
    <main className="h-screen bg-[#EFEDE5] w-screen">
      <div className="w-full flex flex-row justify-between">
        <div className="flex ml-40 mt-20 w-2/3">
          <div className="flex flex-col mr-8">
            <Languages />
            <div className="flex">
              <h3 className="text-[#313639] text-4xl mt-12 ml-1 mb-2 tracking-widest w-fit items-center text-nowrap">
                To the &quot;Official&quot; Baker Museum
              </h3>
            </div>
            <div className="flex flex-col">
              <div className="carousel">
                {images.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt="Museuma Logo"
                    className={`carousel-image ${
                      index === currentImageIndex ? "visible" : ""
                    }`}
                  />
                ))}
              </div>
              <span className="mt-32 text-2xl text-[#313639]">
                <a href="/exhibitions">View Exhibitions</a>
              </span>
            </div>
          </div>
        </div>
        <div>
          <ThreeJSPage />
        </div>
      </div>
    </main>
    </>
  );
}

export default Home;
