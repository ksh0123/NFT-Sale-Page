import { FC, FormEvent, useEffect, useState } from "react";
import NftCard, { NftCardProps } from "./NftCard";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../types";
import { MINT_NFT_CONTRACT } from "../abis/contractAddress";

interface MyNftCardProps extends NftCardProps {
  saleStatus: boolean;
}

const MyNftCard: FC<MyNftCardProps> = ({
  tokenId,
  image,
  name,
  saleStatus,
}) => {
  const [price, setPrice] = useState<string>("");
  const [registedPrice, setRegistedPrice] = useState<number>(0);

  const { saleNftContract, account, web3 } = useOutletContext<OutletContext>();

  const onSubmitForSale = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (isNaN(+price)) return;

      await saleNftContract.methods
        .setForSaleNFT(
          // @ts-expect-error
          MINT_NFT_CONTRACT,
          tokenId,
          web3.utils.toWei(Number(price), "ether")
        )
        .send({ from: account });

      setRegistedPrice(+price);
      setPrice("");
    } catch (error) {
      console.error(error);
    }
  };

  const getRegistedPrice = async () => {
    try {
      // @ts-expect-error
      const response = await saleNftContract.methods.nftPrices(tokenId).call();

      setRegistedPrice(Number(web3.utils.fromWei(Number(response), "ether")));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!saleNftContract) return;

    getRegistedPrice();
  }, [saleNftContract]);

  return (
    <div className="flex flex-col justify-center items-center font-bcs">
      <NftCard tokenId={tokenId} image={image} name={name} />
      {registedPrice ? (
        <div className="text-lg">Sale Price: {registedPrice} ETH</div>
      ) : (
        saleStatus && (
          <form onSubmit={onSubmitForSale}>
            <input
              type="text"
              className="border-2 m-4"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="submit"
              value="Sell"
              className="border border-neutral-900 px-2 hover:bg-neutral-50 hover:text-purple-900 hover:bg-purple-100 active:bg-neutral-50"
            />
          </form>
        )
      )}
    </div>
  );
};

export default MyNftCard;
