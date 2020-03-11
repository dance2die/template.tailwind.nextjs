import React from 'react'
import '../src/styles/index.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* 
      Tailwind's normalize isn't applied
      thus 8px margin is added around "body". 
      Fix it with a global style.
      https://github.com/zeit/next.js/issues/151#issuecomment-257090939 */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}
