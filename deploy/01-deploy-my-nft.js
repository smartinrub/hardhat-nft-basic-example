const { network } = require("hardhat")
const {
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat.config")
const { verify } = require("../utils/verify")
const { storeNFT } = require("../utils/upload")

let tokenUri =
    "ipfs://bafkreia6pu2v77h6qdvgssaw5uljatm5hjdl3ec5d24k3isb2bna3nyfkq"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments

    const { deployer } = await getNamedAccounts()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    log(`----------------------------------------------------`)

    if (process.env.UPLOAD_TO_NFT_STORAGE == "true") {
        tokenUri = await uploadTokenImage()
    }

    const arguments = [tokenUri]
    const myNFT = await deploy("MyNFT", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying...")
        await verify(myNFT.address, arguments)
    }
    log(`----------------------------------------------------`)
}

async function uploadTokenImage() {
    const response = await storeNFT(
        "./images/smr-logo.png",
        "My NFT",
        "This is an image for my NFT"
    )
    return response.url
}

module.exports.tags = ["all", "mynft", "main"]
