# PERSONAL NFT DASHBOARD
<img width="1512" alt="image" src="https://github.com/BCS-4/react_project_kangshinhye/assets/122417190/d3db3eb9-6cb7-46cb-a5ff-55719cab7654">

### 사이트 소개
- 내가 만든 NFT를 전시와 판매 및 구매 기능을 제공하는 퍼스널 대시보드입니다.

### 특징 및 기능
- 특징 : 블록체인 스쿨 색상인 보라색과 깔끔한 UI를 구현함
- 기능 : 첫 화면에 로딩페이지 추가, 대시보드에 들어가기 전에 보여지는 랜딩페이지 추가

### 활용 기술
[![My Skills](https://skillicons.dev/icons?i=react,tailwind,ts,solidity&theme=light)](https://skillicons.dev)

### 폴더 컨벤션
```
⚡️ PERSONAL NFT DASHBOARD
├── contracts                               # Solidity folder
│   ├── MintNFT.sol                         # Smartcontract for minting NFTs
│   └── SaleNFT.sol                         # Smartcontract for selling NFTs
└── frontend                                # React frontend folder
    ├── public                              # Logo image
    └── src                                 # Source files
        ├── abis                            # Abi folder
        │   └── contractAddress.tsx         # Smartcontract address file
        ├── components                      # Components
        │   ├── Footer.tsx                
        │   ├── Header.tsx
        │   ├── Layout.tsx
        │   ├── Loading.tsx
        │   ├── MintModal.tsx
        │   ├── MyNftCard.tsx
        │   ├── NftCard.tsx
        │   └── SaleNftCard.tsx
        ├── pages                           # Pages
        │   ├── detail.tsx
        │   ├── home.tsx
        │   ├── main.tsx
        │   ├── my.tsx
        │   └── sale.tsx     
        ├── types                           # Typescript interface file
        └── App.tsx         

```
