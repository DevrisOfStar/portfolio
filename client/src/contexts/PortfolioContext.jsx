import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPortfolioData } from '../data/constants';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    fetchPortfolioData()
      .then((data) => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to fetch portfolio data:', err);
          setError(err);
          // 에러 발생 시에도 빈 데이터로 설정하여 UI가 멈추지 않도록 함
          setData({
            personalInfo: { name: '', email: '', github: null, youtube: null },
            introStatements: [],
            career: { total: '', education: '', details: [] },
            generalTendencies: [],
            hobbies: [],
            languageSkills: {},
            thingsToAvoid: [],
            basicAbilities: [],
            workSkills: {},
            blog: [],
            currentStatus: []
          });
          setLoading(false);
        }
      });
    
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}
