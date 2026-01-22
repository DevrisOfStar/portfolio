import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { PortfolioProvider } from './contexts/PortfolioContext'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import BlogListPage from './pages/BlogListPage'
import BlogWritePage from './pages/BlogWritePage'

function App() {
  useEffect(() => {
    // API_BASE_URL 환경변수 확인
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
    console.log('🔍 API_BASE_URL 환경변수 확인:');
    console.log('  - import.meta.env.VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('  - 최종 사용되는 API_BASE_URL:', apiBaseUrl);
    console.log('  - import.meta.env 전체:', import.meta.env);
  }, []);

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
