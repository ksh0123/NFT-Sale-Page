import { FC, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../index.css";
import { NftMetadata, OutletContext } from "../types";
import NftCard from "../components/NftCard";

const GET_AMOUNT = 50;

const Home: FC = () => {
  // 현재 setSearchTokenId 가 역순으로 되어 있어서 1부터 시작하게끔 변경해주기
  const [searchTokenId, setSearchTokenId] = useState<number>(0);
  const [totalNFT, setTotalNFT] = useState<number>(0);
  const [metadataArray, setMetadataArray] = useState<NftMetadata[]>([]);

  const { mintNftContract } = useOutletContext<OutletContext>();

  const detectRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const observe = () => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && metadataArray.length !== 0) {
        getNFTs();
      }
    });

    if (!detectRef.current) return;

    observer.current.observe(detectRef.current);
  };

  const getTotalSupply = async () => {
    try {
      if (!mintNftContract) return;

      console.log(mintNftContract);

      const totalSupply = await mintNftContract.methods.totalSupply().call();

      setSearchTokenId(Number(totalSupply));
      setTotalNFT(Number(totalSupply));
    } catch (error) {
      console.error(error);
    }
  };

  const getNFTs = async () => {
    try {
      if (!mintNftContract || searchTokenId <= 0) return;

      let temp: NftMetadata[] = [];

      for (let i = 0; i < GET_AMOUNT; i++) {
        if (searchTokenId - i > 0) {
          const metadataURI: string = await mintNftContract.methods
            // @ts-expect-error
            .tokenURI(searchTokenId - i)
            .call();

          const response = await axios.get(metadataURI);

          temp.push({ ...response.data, tokenId: searchTokenId - i });
        }
      }

      setSearchTokenId(searchTokenId - GET_AMOUNT);
      setMetadataArray([...metadataArray, ...temp]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalSupply();
  }, [mintNftContract]);

  useEffect(() => {
    if (totalNFT === 0) return;

    getNFTs();
  }, [totalNFT]);

  useEffect(() => {
    observe();

    return () => observer.current?.disconnect();
  }, [metadataArray]);

  return (
    <>
      <div className="grow min-h-screen -translate-y-28">
        {/* <ul className="flex flex-col gap-10 place-items-center"> */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {metadataArray?.map((v, i) => (
            <SwiperSlide>
              <NftCard
                key={i}
                image={v.image}
                name={v.name}
                tokenId={v.tokenId!}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </ul> */}
      </div>
      <div ref={detectRef} className="text-white py-4 hidden">
        Detecting Area
      </div>
    </>
  );
};

export default Home;
