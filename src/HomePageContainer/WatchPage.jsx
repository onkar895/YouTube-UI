/* eslint-disable no-unused-vars */
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const WatchPage = () => {

  // const params = useParams()
  // The useParams hook is part of the react-router-dom library, and it allows you to access the parameters from the URL in a React component. Parameters in a URL are often used to pass information between different components in a single-page application.

  // useSearchParams is used for accessing and manipulating URL parameters.
  let [searchParams] = useSearchParams();
  console.log(searchParams.get("v"))

  return (
    <div className='md:mx-7 md:mt-14 max-sm:mt-20 max-sm:mx-3'>
      <iframe className='rounded-2xl max-sm:w-[94vw] max-sm:h-[35vh] md:w-[92.5vw] md:h-[50vh] lg:w-[60vw] lg:h-[80vh]' src={"https://www.youtube.com/embed/" + searchParams.get("v")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div >
  )
}

export default WatchPage
