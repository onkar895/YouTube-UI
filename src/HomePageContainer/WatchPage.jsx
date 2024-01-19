/* eslint-disable no-unused-vars */
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const WatchPage = () => {

  // const params = useParams()
  // The useParams hook is part of the react-router-dom library, and it allows you to access the parameters from the URL in a React component. Parameters in a URL are often used to pass information between different components in a single-page application.

  // useSearchParams is used for accessing and manipulating URL parameters.
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("v"))

  return (
    <div className='mx-0 mt-12'>
      <iframe
        width="1280"
        height="490"
        src="https://www.youtube.com/embed/oIrYUc7GK-Y?si=L2ozgl1guWrRXi9e"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
      </iframe>
    </div>
  )
}

export default WatchPage
