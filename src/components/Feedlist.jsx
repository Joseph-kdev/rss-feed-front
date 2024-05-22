import React, { useReducer } from 'react'
import { Feed } from './Feed'
import axios from 'axios'
import Modal from "react-modal"

const reducer = (state, action) => {
  switch (action.type) {
    case "show-all":
      return {...state, showAll: !state.showAll}
    case "open-modal":
      return {...state, open: !state.open}
    case "summary":
      return {...state, blogSummary: action.payload }
  
    default:
      throw new Error()
  }
}

export const Feedlist = ({ articles, blogTitle }) => {
  const [state, dispatch] = useReducer(reducer, { showAll: false, open: false, blogSummary: "" })

  const initialArticles = articles.slice(0, 5)
  const toggleShowAll = () => {
    dispatch({
      type: "show-all"
    })
  }

  const closeModal = () => {
    dispatch({
      type: "open-modal"
    })
  }

  const summarize = async(url) => {
    dispatch({
      type: "open-modal"
    })
    const selectedUrl = {
      actualUrl : url
    }
    try {
      const response = await axios.post("http://localhost:3001/summaries", selectedUrl)
      const summary = await response.data
      dispatch({
        type: "summary",
        payload: summary
      })
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <div className='flex flex-col mx-1 overflow-hidden'>
      <Modal 
        isOpen={state.open}
        onRequestClose={closeModal}
        contentLabel='Summary'
        ariaHideApp= {false}
        shouldCloseOnOverlayClick={true}
        style={{

        }}
        >
          <p>{state.blogSummary}</p>
        </Modal>
      <h2 className='text-xl my-2 mx-1 w-screen'>
            {blogTitle}
      </h2>
      <hr className='my-1' />
      <div className='md:grid md:grid-cols-2 lg:grid-cols-3'>
    {articles.slice(0, 3).map((article, index) => (
      <div key={index}>
        <Feed
          title={article.title}
          content={article.content}
          pubDate={article.pubDate}
          link={article.link}
          summarize= {summarize}
        />
      </div>
    ))}
    {state.showAll &&
      articles.slice(4).map((article, index) => (
        <div key={`remaining-${index}`}>
          <Feed
            title={article.title}
            content={article.content}
            pubDate={article.pubDate}
            link={article.link}
            summarize = {summarize}
          />
        </div>
      ))}
      </div>
          <button onClick={toggleShowAll} className='text-sky-700 '>
            {state.showAll? "Show Less" : "Show More"}
          </button>
    </div>
  )
}
