import React from 'react';
import ReactDOM from 'react-dom/client';
//최신버전에서는 클라이언트 같이 붙여서 쓰라는데...
//그럼 처음부터 이걸로 써주지
import App from './App';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);