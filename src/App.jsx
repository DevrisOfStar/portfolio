import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import BlogListPage from './pages/BlogListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/blog" element={<BlogListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
