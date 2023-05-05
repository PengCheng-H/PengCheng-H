import zhCN from 'antd/locale/zh_CN';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './App';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
)
