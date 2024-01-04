import { FC, useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { NftMetadata, OutletContext } from "../types";
import axios from "axios";
import { IoCloseCircle } from "react-icons/io5";

const Detail: FC = () => {
  const [metadata, setMetadata] = useState<NftMetadata>();

  const { tokenId } = useParams();

  const { mintNftContract } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const getMyNFT = async () => {
    try {
      if (!mintNftContract) return;

      const metadataURI: string = await mintNftContract.methods
        // @ts-expect-error
        .tokenURI(tokenId)
        .call();

      const response = await axios.get(metadataURI);

      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyNFT();
  }, [mintNftContract]);

  return (
    <div className="min-h-screen mx-auto">
      {metadata && (
        <div className="flex flex-col items-centerxw">
          <div className="flex flex-row justify-center gap-10 mb-16">
            <img
              className="w-[512px] h-[512px]"
              src={metadata.image}
              alt={metadata.name}
            />
            <div className="flex flex-col font-bcs">
              <div className="bg-neutral-50 border border-neutral-800 p-2 text-center">
                <div className="text-2xl font-extrabold">{metadata.name}</div>
                <div className="whitespace-pre text-xl">
                  {metadata.description}
                </div>
              </div>
              <ul className="mt-4 flex flex-col gap-1 pl-4">
                {metadata.attributes.map((v, i) => (
                  <ul key={i}>
                    <li className="font-light">
                      <span className="font-extrabold">✧ {v.trait_type}: </span>
                      {v.value}
                    </li>
                  </ul>
                ))}
              </ul>
            </div>
          </div>
          <button
            className="hover:text-gray-500 mx-auto scale-[3]"
            onClick={() => navigate(-1)}
          >
            <IoCloseCircle />
          </button>
        </div>
      )}
    </div>
  );
};

export default Detail;
