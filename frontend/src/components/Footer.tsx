import { FC } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";

const Footer: FC = () => {
  return (
    <div className="sticky bottom-2 flex flex-row justify-between items-center mx-10 md:mx-20 py-2 z-20">
      <div className="font-light text-xs whitespace-pre">{`Copyright © 2024 멋쟁이사자처럼 All rights reserved.\nDesigned by Shinhye Kang`}</div>
      <div className="flex flex-row gap-5">
        <a target="_blank" href="https://github.com/ksh0123/NFT-Sale-Page"><FaGithub className="scale-[1.5]" /></a>
      </div>
    </div>
  );
};

export default Footer;
