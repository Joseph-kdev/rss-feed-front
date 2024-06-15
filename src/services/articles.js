import axios from "axios"

// const baseURL = "https://blogs-rs-sfeed-back.vercel.app/"

const baseURL = "https://blogs-rs-sfeed-back.vercel.app/"

export const getArticles = async() => {
    const articles = await axios.get(baseURL)
    return articles.data
}
