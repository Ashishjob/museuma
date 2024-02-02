import ThreeJSPage from "./components/threejs";
import Languages from "./components/languages";
import "./App.css";
import "./index.css";

export default function Home() {
  return (
    <main className="h-screen bg-[#EFEDE5] w-screen">
      <div className="w-full flex flex-row justify-between">
        <div className="flex items-center ml-40 -mt-40 w-2/3">
          <div className="flex flex-col mr-8">
            <Languages />
            <div className="flex">
              <h3 className="text-[#313639] text-4xl mt-12 ml-1 mb-2 tracking-widest w-fit items-center text-nowrap">
                To the &quot;Official&quot; Baker Museum
              </h3>
            </div>
            <div className="flex flex-col">
              <img
                src="/museuma1.png"
                alt="Museuma Logo"
                width={200}
                height={200}
                className="w-full"
              />
              <span className="mt-4 text-2xl">
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
  );
}
