const Loading = () => {
  return (
    <div className="bg-neutral-100 min-h-screen min-x-screen flex flex-col justify-center items-center mx-auto font-bcs">
      <img
        src="./images/render.png"
        alt="NFT DASHBOARD"
        className="w-10 mx-auto pb-5 animate-bounce"
      />
      <div className="text-2xl">LOADING...</div>
    </div>
  );
};

export default Loading;
