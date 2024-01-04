import { Dispatch, FC, SetStateAction, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { NftMetadata, OutletContext } from "../types";
import { Link } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

interface MintModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  metadataArray: NftMetadata[];
  setMetadataArray: Dispatch<SetStateAction<NftMetadata[]>>;
}

const MintModal: FC<MintModalProps> = ({
  setIsOpen,
  metadataArray,
  setMetadataArray,
}) => {
  const [metadata, setMetadata] = useState<NftMetadata>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mintNftContract, account } = useOutletContext<OutletContext>();

  const onClickMint = async () => {
    try {
      if (!mintNftContract || !account) return;

      setIsLoading(true);

      await mintNftContract.methods.mintNFT().send({ from: account });

      // @ts-expect-error
      const balance = await mintNftContract.methods.balanceOf(account).call();

      const tokenId = await mintNftContract.methods
        // @ts-expect-error
        .tokenOfOwnerByIndex(account, Number(balance) - 1)
        .call();

      const metadataURI: string = await mintNftContract.methods
        // @ts-expect-error
        .tokenURI(Number(tokenId))
        .call();

      const response = await axios.get(metadataURI);

      setMetadata(response.data);
      setMetadataArray([response.data, ...metadataArray]);

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-20">
      <div className="font-bcs p-8 bg-white border border-black w-1/4 mx-auto">
        <div className="text-right mb-8">
          <button onClick={() => setIsOpen(false)}>
            <IoCloseCircle className="scale-[1.5]" />
          </button>
        </div>
        {metadata ? (
          <div className="w-60 mx-auto">
            <img
              className="w-60 h-60 mb-5 border border-black"
              src={metadata.image}
              alt={metadata.name}
            />
            <div className="text-xl font-semibold mt-1">{metadata.name}</div>
            <div className="mb-5 underline underline-offset-8">
              {metadata.description}
            </div>
            <ul className="mt-1 flex flex-col gap-1 whitespace-pre-line">
              {metadata.attributes.map((v, i) => (
                <li key={i}>
                  <span className="text-purple-800">{v.trait_type}</span>
                  <span className="text-neutral-600">: {v.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div>
              <img
                src="./images/render.png"
                alt="NFT DASHBOARD"
                className="w-10 mx-auto pb-5 animate-bounce"
              />
            </div>
            <div className="text-center font-black">
              {isLoading
                ? "Minting in process..."
                : "Would you like to mint an NFT?"}
            </div>
            <div className="text-center mt-4">
              <button
                className="bg-neutral-700 text-neutral-100 border border-neutral-300 px-3 hover:text-neutral-800 hover:bg-neutral-100 active:bg-violet-200"
                onClick={onClickMint}
              >
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MintModal;
