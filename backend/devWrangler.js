#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 파일 경로 설정
const devVarsPath = path.join(__dirname, '.dev.vars');
const wranglerPath = path.join(__dirname, 'wrangler.toml');

// .dev.vars 파일 읽기 및 파싱
function parseDevVars() {
  try {
    const content = fs.readFileSync(devVarsPath, 'utf-8');
    const vars = {};
    
    // 줄 단위로 파싱
    const lines = content.split('\n');
    for (const line of lines) {
      // 주석 제거 및 공백 제거
      const trimmedLine = line.split('#')[0].trim();
      
      // 빈 줄 건너뛰기
      if (!trimmedLine) continue;
      
      // DEV_로 시작하는 변수만 파싱
      if (trimmedLine.startsWith('DEV_')) {
        const match = trimmedLine.match(/^DEV_(\w+)\s*=\s*(.+)$/);
        if (match) {
          const varName = `DEV_${match[1]}`;
          const value = match[2].trim();
          vars[varName] = value;
        }
      }
    }
    
    return vars;
  } catch (error) {
    console.error(`❌ .dev.vars 파일을 읽는 중 오류 발생:`, error.message);
    process.exit(1);
  }
}

// wrangler.toml 파일 읽기 및 변수 치환
function replaceInWrangler(devVars) {
  try {
    let content = fs.readFileSync(wranglerPath, 'utf-8');
    let replaced = false;
    
    // DEV_로 시작하는 변수들을 실제 값으로 치환
    for (const [varName, value] of Object.entries(devVars)) {
      // 플레이스홀더 패턴 찾기 (따옴표가 있거나 없거나)
      const patterns = [
        new RegExp(`"${varName}"`, 'g'),
        new RegExp(`'${varName}'`, 'g'),
        new RegExp(`\\b${varName}\\b`, 'g')
      ];
      
      for (const pattern of patterns) {
        if (pattern.test(content)) {
          // 값에 공백이나 특수문자가 있으면 따옴표로 감싸기
          const replacement = value.includes(' ') || value.includes('-') 
            ? `"${value}"` 
            : value;
          content = content.replace(pattern, replacement);
          replaced = true;
        }
      }
    }
    
    if (!replaced) {
      console.log('⚠️  치환할 변수를 찾지 못했습니다.');
      return false;
    }
    
    // 파일에 쓰기
    fs.writeFileSync(wranglerPath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`❌ wrangler.toml 파일을 처리하는 중 오류 발생:`, error.message);
    process.exit(1);
  }
}

// 메인 실행
function main() {
  console.log('🔄 .dev.vars의 DEV 변수를 wrangler.toml에 치환 중...\n');
  
  // .dev.vars에서 DEV 변수 파싱
  const devVars = parseDevVars();
  
  if (Object.keys(devVars).length === 0) {
    console.log('⚠️  .dev.vars에서 DEV_로 시작하는 변수를 찾지 못했습니다.');
    process.exit(0);
  }
  
  console.log('📋 발견된 DEV 변수:');
  for (const [key, value] of Object.entries(devVars)) {
    console.log(`   ${key} = ${value}`);
  }
  console.log('');
  
  // wrangler.toml에 치환
  const success = replaceInWrangler(devVars);
  
  if (success) {
    console.log('✅ wrangler.toml 파일이 성공적으로 업데이트되었습니다!');
  }
}

main();
