import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PortfolioProvider } from './contexts/PortfolioContext'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import BlogListPage from './pages/BlogListPage'
import BlogWritePage from './pages/BlogWritePage'

function App() {
  return (
    <ErrorBoundary>
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/write" element={<ProtectedRoute><BlogWritePage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
    </ErrorBoundary>
  )
}

export default App
