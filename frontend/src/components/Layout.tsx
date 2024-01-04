import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Web3, { Contract, ContractAbi } from "web3";
import { useSDK } from "@metamask/sdk-react";

import Header from "./Header";
import mintNftAbi from "../abis/mintNftAbi.json";
import saleNftAbi from "../abis/saleNftAbi.json";
import { MINT_NFT_CONTRACT, SALE_NFT_CONTRACT } from "../abis/contractAddress";
import Footer from "./Footer";

const Layout: FC = () => {
  const [account, setAccount] = useState<string>("");
  const [web3, setWeb3] = useState<Web3>();
  const [mintNftContract, setMintNftContract] =
    useState<Contract<ContractAbi>>();
  const [saleNftContract, setSaleNftContract] =
    useState<Contract<ContractAbi>>();

  const { provider } = useSDK();

  useEffect(() => {
    if (!provider) return;

    setWeb3(new Web3(provider));
  }, [provider]);

  useEffect(() => {
    if (!web3) return;

    setMintNftContract(new web3.eth.Contract(mintNftAbi, MINT_NFT_CONTRACT));
    setSaleNftContract(new web3.eth.Contract(saleNftAbi, SALE_NFT_CONTRACT));
  }, [web3]);

  return (
    <div className="bg-neutral-100">
      <Header account={account} setAccount={setAccount} />
      <div className="mx-auto">
        <Outlet context={{ account, web3, mintNftContract, saleNftContract }} />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
