const { expect } = require("chai")
const { network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat.config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("My NFT Unit Tests", () => {
          const nftImageUri = "test"
          let myNFTFactory
          let myNFT
          let deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              myNFTFactory = await ethers.getContractFactory("MyNFT")
              myNFT = await myNFTFactory.deploy(nftImageUri)
              await myNFT.deployed()
          })

          describe("Constructor", () => {
              it("has correct name", async () => {
                  // WHEN
                  const name = await myNFT.name()

                  // THEN
                  expect(name).to.equal("MyNFT")
              })

              it("has correct symbol", async () => {
                  // WHEN
                  const symbol = await myNFT.symbol()

                  // THEN
                  expect(await myNFT.symbol()).to.equal("MNFT")
              })
              it("has counter value zero", async () => {
                  // WHEN
                  const tokenCounter = await myNFT.getTokenCounter()

                  // THEN
                  expect(tokenCounter.toString()).to.equal("0")
              })
          })

          describe("Mint NFT", async () => {
              beforeEach(async () => {
                  const tokenCounter = await myNFT.getTokenCounter()
                  expect(tokenCounter.toString()).to.equal("0")
                  const deployerBalance = await myNFT.balanceOf(
                      deployer.address
                  )
                  expect(deployerBalance.toString()).to.equal("0")
                  const response = await myNFT.mintNFT()
                  await response.wait(1)
              })

              it("bumps token counter", async () => {
                  // WHEN
                  const tokenCounter = await myNFT.getTokenCounter()

                  // THEN
                  expect(tokenCounter.toString()).to.equal("1")
              })

              it("increases owner balance", async () => {
                  // WHEN
                  const deployerBalance = await myNFT.balanceOf(
                      deployer.address
                  )

                  // THEN
                  expect(deployerBalance.toString()).to.equal("1")
              })
          })

          describe("Token URI", () => {
              it("return IPFS URI", async () => {
                  // WHEN
                  const tokeURI = await myNFT.tokenURI(0)

                  // THEN
                  expect(tokeURI.toString()).contains(nftImageUri)
              })
          })
      })
