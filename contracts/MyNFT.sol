// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    string public constant TOKEN_URI =
        "ipfs://bafkreia6pu2v77h6qdvgssaw5uljatm5hjdl3ec5d24k3isb2bna3nyfkq";
    uint256 private s_tokenCounter; // if you have a collection of tokens on the same smart contract each of them needs their own unique token ID

    constructor() ERC721("MyNFT", "MNFT") {
        s_tokenCounter = 0;
    }

    function mintNFT() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter); // this
        s_tokenCounter++; // each time we mint an NFT we increase the token counter
        return s_tokenCounter;
    }

    function tokenURI(
        uint256 /*tokenId*/
    ) public view override returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
