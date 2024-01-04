import { FC } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";

const Footer: FC = () => {
  return (
    <div className="sticky bottom-2 flex flex-row justify-between items-center mx-20 py-2 z-20">
      <div className="font-light text-xs whitespace-pre">{`Copyright © 2024 멋쟁이사자처럼 All rights reserved.\nDesigned by Shinhye Kang`}</div>
      <div className="flex flex-row gap-5">
        <FaGithub className="scale-[1.5]" />
        <RiNotionFill className="scale-[1.8]" />
        <FaDiscord className="scale-[1.6]" />
      </div>
    </div>
  );
};

export default Footer;
