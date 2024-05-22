import axios from "axios"

const baseURL = "http://localhost:3001/"

export const getArticles = async() => {
    const articles = await axios.get(baseURL)
    return articles.data
}