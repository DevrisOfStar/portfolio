// 포트폴리오 정보를 API에서 가져오는 함수
import api from '../services/api';

// API에서 데이터를 가져와서 기존 구조로 변환
let portfolioCache = null;
let portfolioPromise = null;

async function fetchPortfolioData() {
  if (portfolioCache) {
    return portfolioCache;
  }
  
  if (portfolioPromise) {
    return portfolioPromise;
  }
  
  portfolioPromise = (async () => {
    try {
      const data = await api.getPortfolio();
      
      // API 응답을 기존 구조로 변환
      portfolioCache = {
        personalInfo: data.personalInfo,
        introStatements: data.introStatements,
        career: data.career,
        generalTendencies: data.generalTendencies,
        hobbies: data.hobbies,
        languageSkills: data.languageSkills,
        thingsToAvoid: data.thingsToAvoid,
        basicAbilities: data.basicAbilities,
        workSkills: data.workSkills,
        blog: data.blog,
        currentStatus: data.currentStatus
      };
      
      return portfolioCache;
    } catch (error) {
      console.error('Failed to fetch portfolio data:', error);
      // 에러를 다시 throw하여 PortfolioContext에서 처리하도록 함
      throw error;
    } finally {
      portfolioPromise = null;
    }
  })();
  
  return portfolioPromise;
}

// 데이터 로드 함수 export
export { fetchPortfolioData };
