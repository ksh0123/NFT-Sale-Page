# PERSONAL NFT DASHBOARD
<img width="1511" alt="image" src="https://github.com/ksh0123/NFT-Sale-Page/assets/122417190/bcfdbfe2-b176-481a-a3cb-32531ac79cda">

### 사이트 소개
- 내가 만든 NFT를 전시한 랜딩페이지입니다. 유저가 메타마스크 지갑을 연결하면 NFT를 민팅할 수 있으며, 판매 및 구매 기능을 사용하여 거래할 수 있습니다.

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
