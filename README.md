# 리액트 파일은 html으로 빌드(npm run build) 후에 노드 실행(npm run dev)이 가능합니다.

# 스크립트 모듈은 public 디렉토리의 index.html에 선언합니다.

# 라이브러리 모듈을 새로운 객체로서 페이지에서 사용하려면 tsconfig 세팅이 필요합니다. (예: "types": ["kakao.maps.d.ts"] )

# 카카오 맵의 경우 개인 키를 발급받아 도메인을 적용해야 합니다. (https://apis.map.kakao.com/web/guide/)

# 페이먼츠 API는 테스트용으로 실제로 결제가 되지 않습니다.

# 타입스크립트 세팅(tsconfig.json) 완료된 상태입니다.

# 리액트 인덱스에 BrowserRouter 컴포넌트로 앱을 감싸주지 않으면 에러(react-dom.production.min.js:188)가 발생합니다.
