// 포트폴리오 정보를 하나의 JSON 객체로 통합
export const portfolio_info = {
  personalInfo: {
    name: '녹다',
    email: 'nokda@kakao.com',
    github: 'DevrisOfStar',
    youtube: null
  },
  introStatements: [
    '+ 기본에 충실하며 맡은 일을 끝까지 완수합니다.',
    '+ 재미보다 가치를, 혼자보다 함께 성장하는 길을 추구합니다.',
    '+ 약속을 소중히 여기고 책임 있게 행동합니다.',
    '+ 일관된 태도와 진정성으로 신뢰를 쌓아갑니다.'
  ],
  career: {
    total: '소프트웨어 엔지니어 6+년',
    details: [
      { id: 'career-1', period: '스타트업 1년', company: '고요한택시', content: '고요한택시 개발자' },
      { id: 'career-2', period: '스타트업 2년', company: 'SCIOS', content: 'SCIOS 개발자' },
      { id: 'career-3', period: '스타트업 3년(진행중)', company: 'Novus Bio', content: 'Novus Bio 개발자' },
    ],
    education: '동국대 컴퓨터공학과',
  },
  generalTendencies: [
    { id: 'tendency-1', name: '새 도구 탐색', level: 5 },
    { id: 'tendency-2', name: '내향적', level: 4 },
    { id: 'tendency-3', name: '수평적 소통', level: 5 },
    { id: 'tendency-4', name: '자동화 욕심', level: 5 },
    { id: 'tendency-5', name: '피드백 빠른편', level: 4 },
    { id: 'tendency-6', name: '여유로움 찾기', level: 3 },
    { id: 'tendency-7', name: '감각적인 디테일', level: 4 },
    { id: 'tendency-8', name: '조용한 자신감', level: 4 }
  ],
  hobbies: [
    { id: 'hobby-1', name: '러닝', image: '/images/hobby/hobby-1.png' },
    { id: 'hobby-2', name: '책 읽기', image: '/images/hobby/hobby-2.png' },
    { id: 'hobby-3', name: '영화 감상', image: '/images/hobby/hobby-3.png' },
    { id: 'hobby-4', name: '집돌이', image: '/images/hobby/hobby-4.png' }
  ],
  languageSkills: {
    korean: {
      title: '한국어',
      image: '',
      content: [
        { id: 'lang-ko-1', skill: '말하기', level: 5 },
        { id: 'lang-ko-2', skill: '글쓰기', level: 5 },
        { id: 'lang-ko-3', skill: '독해', level: 5 }
      ]
    },
    english: {
      title: '영어',
      image: '',
      content: [
        { id: 'lang-en-1', skill: '말하기', level: 3 },
        { id: 'lang-en-2', skill: '글쓰기', level: 3 },
        { id: 'lang-en-3', skill: '독해', level: 4 }
      ]
    },
    japanese: {
      title: '일본어',
      image: '',
      content: [
        { id: 'lang-ja-1', skill: '말하기', level: 1 },
        { id: 'lang-ja-2', skill: '글쓰기', level: 0 },
        { id: 'lang-ja-3', skill: '독해', level: 0 }
      ]
    },
    other: {
      title: '기타',
      image: '',
      content: [
        { id: 'lang-other-1', skill: '구글링', level: 6 },
        { id: 'lang-other-2', skill: '커뮤니케이션', level: 5 }
      ]
    }
  },
  thingsToAvoid: ['정치', '험담', '매너리즘', '무책임'],
  basicAbilities: [
    { id: 'ability-1', name: '협업/주변인 지원', level: 5, content: '팀원들과의 협업을 중시하며, 주변 사람들을 적극적으로 지원합니다. 함께 성장하는 문화를 만들어갑니다.' },
    { id: 'ability-2', name: '논리적 사고, 분석력', level: 5, content: '복잡한 문제를 논리적으로 분석하고 해결책을 도출합니다. 데이터와 사실에 기반한 의사결정을 합니다.' },
    { id: 'ability-3', name: '임기응변', level: 4, content: '예상치 못한 상황에서도 빠르게 대응하고 적응합니다. 유연한 사고와 빠른 판단력으로 문제를 해결합니다.' },
    { id: 'ability-4', name: '잡무 최적화/자동화', level: 4, content: '반복적인 작업을 자동화하고 프로세스를 최적화합니다. 효율성을 높여 더 중요한 일에 집중할 수 있도록 합니다.' },
    { id: 'ability-5', name: '유머', level: 4, content: '적절한 유머로 팀 분위기를 좋게 만들고, 스트레스를 완화합니다. 긍정적인 워크 환경 조성에 기여합니다.' },
    { id: 'ability-6', name: '척 안 지는 커뮤니케이션', level: 5, content: '명확하고 직접적인 커뮤니케이션을 통해 오해를 방지하고 효율적으로 소통합니다. 솔직하고 건설적인 피드백을 제공합니다.' },
    { id: 'ability-7', name: '정치', level: 2, content: '조직 내 정치적 상황을 이해하고 대응하는 능력은 아직 부족합니다. 더 배워나가야 할 영역입니다.' },
    { id: 'ability-8', name: '알아서 일 찾기', level: 5, content: '주어진 업무에 그치지 않고 스스로 개선할 점을 찾아 일을 만들어냅니다. 주도적으로 문제를 발견하고 해결합니다.' }
  ],
  workSkills: {
    planning: {
      title: '기획',
      image: '',
      content: [
        { id: 'work-plan-1', name: '시장 분석', level: 3, content: '시장 동향과 경쟁사 분석을 통해 제품 기획에 필요한 인사이트를 도출합니다. 데이터 기반의 의사결정을 지원합니다.' },
        { id: 'work-plan-2', name: '틀 짜기', level: 4, content: '프로젝트의 전체적인 구조와 방향성을 설계합니다. 체계적이고 확장 가능한 시스템 아키텍처를 구축합니다.' },
        { id: 'work-plan-3', name: '마케팅', level: 2, content: '기본적인 마케팅 지식을 바탕으로 제품 홍보와 사용자 확보를 위한 전략을 수립합니다.' }
      ]
    },
    editing: {
      title: '편집',
      image: '',
      content: [
        { id: 'work-edit-1', name: '교정교열', level: 4, content: '문서와 콘텐츠의 오탈자와 문법 오류를 찾아 수정합니다. 일관성 있는 스타일과 톤을 유지하도록 도와줍니다.' },
        { id: 'work-edit-2', name: '디자인 감각', level: 3, content: '기본적인 디자인 원리를 이해하고 UI/UX 개선에 기여합니다. 사용자 경험을 고려한 디자인 제안을 할 수 있습니다.' },
        { id: 'work-edit-3', name: '글쓰기 가이드', level: 4, content: '명확하고 읽기 쉬운 문서 작성을 위한 가이드를 제공합니다. 기술 문서, 가이드라인, 스펙 문서 작성에 참여합니다.' }
      ]
    },
    teamLeading: {
      title: '팀 리딩',
      image: '',
      content: [
        { id: 'work-team-1', name: '팀원 성장 챙기기', level: 4, content: '팀원들의 성장을 적극적으로 지원하고 챙깁니다. 멘토링, 코드 리뷰, 기술 공유 등을 통해 팀원들이 지속적으로 발전할 수 있도록 돕습니다.' },
        { id: 'work-team-2', name: '팀원 장점 살리기', level: 4, content: '각 팀원의 강점과 특기를 파악하여 적절한 역할과 책임을 부여합니다. 개인의 장점을 팀 전체의 성과로 연결시킵니다.' },
        { id: 'work-team-3', name: '책임 up 부담 down', level: 4, content: '팀원들에게 의미있는 책임을 부여하면서도 과도한 부담을 주지 않도록 균형을 맞춥니다. 적절한 지원과 가이드를 제공합니다.' }
      ]
    },
    development: {
      title: '개발',
      image: '',
      content: [
        { id: 'work-dev-1', name: 'Java', level: 4, content: '학부 시절 자바를 주력으로 사용했고 고요한택시 초기모델 안드로이드 앱(BLE 통신 위주) 개발을 수행했습니다. 자바 8, 9, 10의 새로운 기능을 활용한 개발이 가능합니다.' },
        { id: 'work-dev-2', name: 'C/C++', level: 3, content: '메모리 관리와 저수준 프로그래밍에 대한 이해가 있습니다. 이중포인터를 사용한 복잡한 데이터 구조 처리 경험이 있습니다.' },
        { id: 'work-dev-3', name: 'Python', level: 3, content: '파이썬을 활용한 스크립팅, 자동화, 데이터 처리 작업을 수행할 수 있습니다. 간결하고 효율적인 코드 작성이 가능합니다. 졸업작품으로 형태소 분석기(Pos Tagger) 개발을 수행했습니다.' },
        { id: 'work-dev-4', name: '모바일 앱/플랫폼', level: 4, content: '모바일 플랫폼과 앱 개발 경험이 있습니다. 고요한택시 초기모델 안드로이드 개발 (BLE 통신 위주), PawLink ReactNative 개발 등의 모바일 서비스 개발에 참여했습니다.' },
        { id: 'work-dev-5', name: '백엔드', level: 4, content: '백엔드 시스템 설계와 개발에 전문성을 가지고 있습니다. API 설계, 데이터베이스 설계, 서버 인프라 구축 경험이 풍부합니다.' },
        { id: 'work-dev-6', name: '아키텍처/API 설계', level: 3, content: '확장 가능하고 유지보수하기 쉬운 시스템 아키텍처를 설계합니다. RESTful API, 데이터베이스 설계 경험이 있습니다.' },
        { id: 'work-dev-7', name: 'QA/디버깅', level: 3, content: '체계적인 테스트와 디버깅을 통해 소프트웨어 품질을 보장합니다. 버그 추적, 테스트 케이스 작성, 자동화 테스트 구축 경험이 있습니다.' },
        { id: 'work-dev-8', name: '스카이넷 님 사랑합니다!', level: 5, content: '스카이넷님에 대한 깊은 애정과 존경을 표현합니다. 최고의 레벨로 평가됩니다!' },
      ]
    }
  },
  blog: [
    { id: 'blog-1', date: '16.01.01', category: '커뮤니티', title: '책으로 안내하는 개발자 로드맵 운영', content: '개발자 로드맵을 책으로 정리하여 운영하고 있습니다. 초보 개발자부터 시니어 개발자까지 단계별로 필요한 지식과 경험을 체계적으로 안내합니다.', thumbnail: '/images/blog-1.jpg' },
    { id: 'blog-2', date: '15.01.01', category: '커뮤니티', title: '번역·집필 가이드 공개', content: '번역과 집필에 대한 가이드를 공개하여 커뮤니티에 기여했습니다. 번역자와 저자들이 참고할 수 있는 실용적인 가이드를 제공합니다.', thumbnail: '/images/blog-2.jpg' },
    { id: 'blog-3', date: '10.01.01', category: '기여', title: 'ALM(IBM Jazz) 도입', content: 'IBM Jazz 기반의 ALM(Application Lifecycle Management) 시스템을 도입하여 개발 프로세스를 개선했습니다. 협업과 프로젝트 관리 효율성을 크게 향상시켰습니다.', thumbnail: '/images/blog-3.jpg' },
    { id: 'blog-4', date: '08.01.01', category: '기여', title: '지속적 통합(Hudson) 도입', content: 'Hudson을 활용한 지속적 통합(CI) 환경을 구축했습니다. 자동화된 빌드와 테스트를 통해 개발 품질과 배포 속도를 개선했습니다.', thumbnail: '/images/blog-4.jpg' },
    { id: 'blog-5', date: '05.01.01', category: '기여', title: '분산 컴파일러(IncrediBuild) 도입', content: 'IncrediBuild 분산 컴파일러를 도입하여 빌드 시간을 대폭 단축했습니다. 여러 머신을 활용한 병렬 컴파일로 개발 생산성을 향상시켰습니다.', thumbnail: '/images/blog-5.jpg' },
    { id: 'blog-6', date: '03.01.01', category: '기여', title: '버전 관리 시스템(CVS) 도입', content: 'CVS(Concurrent Versions System)를 도입하여 버전 관리를 체계화했습니다. 코드 변경 이력 관리와 협업 프로세스를 개선했습니다.', thumbnail: '/images/blog-6.jpg' },
    { id: 'blog-7', date: '18.01.01', category: '기획', title: '핸즈온 머신러닝', content: '머신러닝을 실전에서 활용할 수 있도록 실습 중심으로 구성된 책을 기획했습니다. 이론과 실습을 균형있게 다루어 독자들이 실제 프로젝트에 적용할 수 있도록 도와줍니다.', thumbnail: '/images/blog-7.jpg' },
    { id: 'blog-8', date: '17.01.01', category: '기획', title: '골빈해커의 3분 딥러닝', content: '딥러닝을 빠르게 이해할 수 있도록 3분 단위로 구성된 책을 기획했습니다. 바쁜 개발자들도 짧은 시간에 딥러닝의 핵심을 파악할 수 있도록 구성했습니다.', thumbnail: '/images/blog-8.jpg' },
    { id: 'blog-9', date: '17.06.01', category: '기획', title: '밑바닥부터 시작하는 딥러닝', content: '딥러닝의 기본 원리를 밑바닥부터 이해할 수 있도록 구성된 책을 기획했습니다. 수학과 프로그래밍을 함께 다루어 독자들이 딥러닝의 본질을 이해할 수 있도록 했습니다.', thumbnail: '/images/blog-9.jpg' },
    { id: 'blog-10', date: '20.01.01', category: '번역', title: '리팩토링 2판(진행 중)', content: '리팩토링 2판을 번역 중입니다. 코드 품질을 개선하는 다양한 기법과 실전 사례를 제공하여 개발자들이 더 나은 코드를 작성할 수 있도록 돕습니다.', thumbnail: '/images/blog-10.jpg' },
    { id: 'blog-11', date: '19.01.01', category: '번역', title: '밑바닥부터 시작하는 딥러닝 2', content: '밑바닥부터 시작하는 딥러닝의 두 번째 권을 번역했습니다. 자연어 처리와 시계열 데이터 처리 등 고급 주제를 다루어 딥러닝의 폭넓은 활용을 소개합니다.', thumbnail: '/images/blog-11.jpg' },
    { id: 'blog-12', date: '18.01.01', category: '번역', title: '이펙티브 자바 3판', content: '이펙티브 자바 3판을 번역했습니다. 자바 8, 9, 10의 새로운 기능을 반영하여 현대적인 자바 개발 방법론을 소개합니다.', thumbnail: '/images/blog-12.jpg' },
    { id: 'blog-13', date: '17.01.01', category: '번역', title: '밑바닥부터 시작하는 딥러닝', content: '밑바닥부터 시작하는 딥러닝을 번역했습니다. 딥러닝의 기본 원리를 수학과 프로그래밍을 통해 이해할 수 있도록 돕는 실용적인 가이드입니다.', thumbnail: '/images/blog-13.jpg' },
    { id: 'blog-14', date: '14.01.01', category: '개발', title: '삼성 챗온 메신저 백엔드', content: '삼성 챗온 메신저의 백엔드 시스템을 개발했습니다. 대규모 사용자를 지원하는 안정적이고 확장 가능한 메시징 플랫폼을 구축했습니다.', thumbnail: '/images/blog-14.jpg' },
    { id: 'blog-15', date: '12.01.01', category: '개발', title: '삼성 바다 플랫폼', content: '삼성 바다 플랫폼의 백엔드 인프라를 개발했습니다. 모바일 플랫폼의 핵심 서비스를 지원하는 안정적이고 효율적인 시스템을 구현했습니다.', thumbnail: '/images/blog-15.jpg' }
  ],
  currentStatus: [
    { id: 'status-1', text: '나는 누구인가 고민 중', content: '자신의 정체성과 역할에 대해 깊이 고민하고 있습니다. 개발자로서의 정체성과 개인으로서의 가치를 찾아가는 중입니다.' },
    { id: 'status-2', text: '내게 맞는, 내가 해야 할 일 찾는 중', content: '자신에게 맞는 일과 해야 할 일을 찾기 위해 노력하고 있습니다. 의미있는 일을 찾아 지속적으로 탐색 중입니다.' },
    { id: 'status-3', text: '팀 잘 이끄는 법 고심 중', content: '팀을 효과적으로 이끌어가는 방법에 대해 깊이 고민하고 있습니다. 리더십과 팀워크에 대한 지식을 쌓아가고 있습니다.' },
    { id: 'status-4', text: '블로그 개설 준비 중', content: '개발 경험과 지식을 공유하기 위한 블로그를 준비하고 있습니다. 유용한 콘텐츠를 제공하여 커뮤니티에 기여하고자 합니다.' },
    { id: 'status-5', text: '운동 쉬는 중', content: '일시적으로 운동을 쉬고 있습니다. 건강 관리를 위해 곧 다시 시작할 예정입니다.' },
    { id: 'status-6', text: '고양이 키우는 중(털 난 동물 다 좋아!)', content: '고양이를 키우며 일상의 즐거움을 찾고 있습니다. 털이 난 모든 동물을 사랑하며, 그들과 함께하는 시간을 소중히 여깁니다.' }
  ]
}

// 하위 호환성을 위한 개별 export (기존 코드가 작동하도록)
export const PERSONAL_INFO = portfolio_info.personalInfo
export const INTRO_STATEMENTS = portfolio_info.introStatements
export const CAREER = portfolio_info.career
export const GENERAL_TENDENCIES = portfolio_info.generalTendencies
export const HOBBIES = portfolio_info.hobbies
export const LANGUAGE_SKILLS = portfolio_info.languageSkills
export const THINGS_TO_AVOID = portfolio_info.thingsToAvoid
export const BASIC_ABILITIES = portfolio_info.basicAbilities
export const WORK_SKILLS = portfolio_info.workSkills
export const BLOG = portfolio_info.blog
export const CURRENT_STATUS = portfolio_info.currentStatus
