// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error MyNFT__AlreadyInitialized();

contract MyNFT is ERC721 {
    uint256 private s_tokenCounter; // if you have a collection of tokens on the same smart contract each of them needs their own unique token ID
    string internal s_tokeUri;
    bool private s_initialized;

    constructor(string memory tokenUri) ERC721("MyNFT", "MNFT") {
        s_tokenCounter = 0;
        _initializeContract(tokenUri);
    }

    function mintNFT() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter); // this
        s_tokenCounter++; // each time we mint an NFT we increase the token counter
        return s_tokenCounter;
    }

    function tokenURI(
        uint256 /*tokenId*/
    ) public view override returns (string memory) {
        return s_tokeUri; // using the same image for all minted tokens
    }

    function _initializeContract(string memory tokenUri) private {
        if (s_initialized) {
            revert MyNFT__AlreadyInitialized();
        }
        s_tokeUri = tokenUri;
        s_initialized = true;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
