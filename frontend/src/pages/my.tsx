import { FC, useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import MintModal from "../components/MintModal";
import { NftMetadata, OutletContext } from "../types";
import axios from "axios";
import MyNftCard from "../components/MyNftCard";
import { SALE_NFT_CONTRACT } from "../abis/contractAddress";

const My: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [metadataArray, setMetadataArray] = useState<NftMetadata[]>([]);
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const { mintNftContract, account } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const onClickMintModal = () => {
    if (!account) return;

    setIsOpen(true);
  };

  const getMyNFTs = async () => {
    try {
      if (!mintNftContract || !account) return;

      // @ts-expect-error
      const balance = await mintNftContract.methods.balanceOf(account).call();

      let temp: NftMetadata[] = [];

      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await mintNftContract.methods
          // @ts-expect-error
          .tokenOfOwnerByIndex(account, i)
          .call();

        const metadataURI: string = await mintNftContract.methods
          // @ts-expect-error
          .tokenURI(Number(tokenId))
          .call();

        const response = await axios.get(metadataURI);

        temp.push({ ...response.data, tokenId: Number(tokenId) });
      }

      setMetadataArray(temp);
    } catch (error) {
      console.error(error);
    }
  };

  const getSaleStatus = async () => {
    try {
      const isApproved: boolean = await mintNftContract.methods
        // @ts-expect-error
        .isApprovedForAll(account, SALE_NFT_CONTRACT)
        .call();

      setSaleStatus(isApproved);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSaleStatus = async () => {
    try {
      await mintNftContract.methods
        // @ts-expect-error
        .setApprovalForAll(SALE_NFT_CONTRACT, !saleStatus)
        .send({
          from: account,
        });

      setSaleStatus(!saleStatus);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyNFTs();
  }, [mintNftContract, account]);

  useEffect(() => {
    if (account) return;

    navigate("/home");
  }, [account]);

  useEffect(() => {
    if (!account) return;

    getSaleStatus();
  }, [account]);

  return (
    <>
      <div className="w-screen min-h-screen -translate-y-28 font-bcs">
        <div className="text-center">
          <h1 className="font-bold text-3xl font-bcs">My NFT Collection</h1>
        </div>
        <div className="fixed top-1/10 right-20 z-20 flex flex-col items-center px-20">
          <button
            className="hover:text-gray-500 font-light text-lg font-bcs"
            onClick={onClickSaleStatus}
          >
            {saleStatus ? `ON SALE` : `READY TO SELL`}
          </button>
          <button
            className="text-lg font-bcs py-2 px-5 bg-slate-100 border border-slate-800"
            onClick={onClickMintModal}
          >
            MINT NFT
          </button>
        </div>

        <ul className="mt-10 flex flex-col-reverse gap-12 place-items-center justify-center items-center">
          {metadataArray?.map((v, i) => (
            <MyNftCard
              key={i}
              image={v.image}
              name={v.name}
              tokenId={v.tokenId!}
              saleStatus={saleStatus}
            />
          ))}
        </ul>
      </div>
      {isOpen && (
        <MintModal
          setIsOpen={setIsOpen}
          metadataArray={metadataArray}
          setMetadataArray={setMetadataArray}
        />
      )}
    </>
  );
};

export default My;
