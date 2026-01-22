import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { PortfolioProvider } from './contexts/PortfolioContext'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import BlogListPage from './pages/BlogListPage'
import BlogWritePage from './pages/BlogWritePage'

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/write" element={<BlogWritePage />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  )
}

export default App
