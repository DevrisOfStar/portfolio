import React from 'react'
import HeaderTop from '../components/HeaderTop/HeaderTop'
import Career from '../components/Career/Career'
import Details from '../components/Details/Details'
import Footer from '../components/Footer/Footer'

function HomePage() {
  return (
    <div className="app">
      <HeaderTop />
      <Career />
      <Details />
      <Footer />
    </div>
  )
}

export default HomePage
