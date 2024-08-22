import { useSDK } from "@metamask/sdk-react";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin, MdLogout, MdSell } from "react-icons/md";
import { GoFileDirectoryFill, GoHomeFill } from "react-icons/go";
import { HeaderProps } from "../types";

const Header: FC<HeaderProps> = ({ account, setAccount }) => {
  const { sdk } = useSDK();
  const navigate = useNavigate();

  // Connect to metamask sdk when login button is clicked
  const onClickMetaMask = async () => {
    try {
      const accounts: any = await sdk?.connect();
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // Set account to null when logout button is clicked
  const onClickLogout = async () => {
    try {
      setAccount(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Account changed in metamask app is reflected on the web app
  useEffect(() => {
    const accountChange = (newAccount: any) => {
      setAccount(newAccount[0]);
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", accountChange);
      }
    };
  }, [account]);

  // Navigate to main page if account is not available
  useEffect(() => {
    if (!account) {
      navigate("/");
    }
  }, [account, navigate]);

  return (
    <>
      <header className="sticky h-20 top-0 mx-10 md:mx-20 pt-10 flex justify-between items-center z-30">
        <Link to="/">
          <img
            src="/images/bcs-logo.PNG"
            className="fill-slate-100 -translate-x-6 scale-50"
          />
        </Link>
        <div>
          {account ? (
            <div className="flex flex-row items-center">
              <span className="bg-white font-light text-md px-2 border border-neutral-800">
                <span className="font-medium border-neutral-800">Hello, </span>
                {account.substring(0, 7)}...
                {account.substring(account.length - 5)}
              </span>
              <button
                className="pl-2 hover:text-neutral-50"
                onClick={onClickLogout}
              >
                <MdLogout className="scale-[1.3]" />
              </button>
            </div>
          ) : (
            <button onClick={onClickMetaMask}>
              <MdLogin className="scale-[2.3]" />
            </button>
          )}
        </div>
      </header>
      {/* Only displayed when wallet is connected */}
      <div
        className={`sticky top-1/4 w-fit flex flex-col gap-14 ml-10 md:ml-20 pl-4 z-40 ${
          account ? "block" : "hidden"
        }`}
      >
        <Link to="/home">
          <GoHomeFill className="scale-[2.3]" />
        </Link>
        <Link to="/my">
          <GoFileDirectoryFill className="scale-[2.2]" />
        </Link>
        <Link to="/sale">
          <MdSell className="scale-[2.3]" />
        </Link>
      </div>
    </>
  );
};

export default Header;
