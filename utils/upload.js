const { NFTStorage, File } = require("nft.storage")
const mime = require("mime")
const fs = require("fs")
const path = require("path")

require("dotenv").config()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY || "key"

async function storeNFT(imagePath, name, description) {
    const image = await fileFromPath(imagePath)

    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    const response = await nftstorage.store({
        image: image,
        name: name,
        description: description,
    })
    console.log(`NFT image ${response.data.name} uploaded: ${response.url}`)
    return response
}

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

module.exports = { storeNFT }
