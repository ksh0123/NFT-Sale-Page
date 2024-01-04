import { FC } from "react";
import Loading from "../components/Loading";

const Main: FC = () => {
  return (
    <header className="h-screen overflow-hidden top-0 flex flex-col justify-center items-center">
      <img
        className="fixed top-0 z-0 transition scale-[0.6]"
        src="./images/render.png"
        alt="NFT DASHBOARD"
      />
      <div className="fixed text-center z-20 font-bcs top-80">
        <h1 className="font-extrabold text-4xl md:text-6xl lg:text-8xl mx-auto justify-center">
          blockchain school
        </h1>
        <div className="mt-4 text-lg md:text-xl lg:text-2xl z-20">
          PERSONAL NFT DASHBOARD
        </div>
      </div>
    </header>
  );
};

export default Main;
