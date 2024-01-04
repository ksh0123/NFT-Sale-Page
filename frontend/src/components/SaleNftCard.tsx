import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import NftCard, { NftCardProps } from "./NftCard";
import { NftMetadata, OutletContext } from "../types";
import { useOutletContext } from "react-router-dom";
import { MINT_NFT_CONTRACT } from "../abis/contractAddress";

interface SaleNftCardProps extends NftCardProps {
  metadataArray: NftMetadata[];
  setMetadataArray: Dispatch<SetStateAction<NftMetadata[]>>;
}

const SaleNftCard: FC<SaleNftCardProps> = ({
  tokenId,
  image,
  name,
  metadataArray,
  setMetadataArray,
}) => {
  const [registeredPrice, setRegisteredPrice] = useState<number>(0);
  const { saleNftContract, account, web3, mintNftContract } =
    useOutletContext<OutletContext>();

  const onClickPurchase = async () => {
    try {
      const nftOwner: string = await mintNftContract.methods
        // @ts-expect-error
        .ownerOf(tokenId)
        .call();

      if (!account || nftOwner.toLowerCase() === account.toLowerCase()) return;

      await saleNftContract.methods
        // @ts-expect-error
        .purchaseNFT(MINT_NFT_CONTRACT, tokenId)
        .send({
          from: account,
          value: web3.utils.toWei(registeredPrice, "ether"),
        });

      const temp = metadataArray.filter((v) => {
        if (v.tokenId !== tokenId) {
          return v;
        }
      });

      setMetadataArray(temp);
    } catch (error) {
      console.error(error);
    }
  };

  const getRegisteredPrice = async () => {
    try {
      // @ts-expect-error
      const response = await saleNftContract.methods.nftPrices(tokenId).call();

      setRegisteredPrice(Number(web3.utils.fromWei(Number(response), "ether")));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!saleNftContract) return;

    getRegisteredPrice();
  }, [saleNftContract]);

  return (
    <div className="flex flex-col justify-center items-center">
      <NftCard tokenId={tokenId} image={image} name={name} />
      <div className="font-bcs flex flex-row justify-between items-center gap-2 p-2">
        <div className="text-xl">{registeredPrice} ETH</div>{" "}
        <button
          onClick={onClickPurchase}
          className="border border-neutral-900 px-2 hover:bg-neutral-50 hover:text-purple-900 hover:bg-purple-100 active:bg-neutral-50"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default SaleNftCard;
