import React from 'react';
import ReactDOM from 'react-dom/client';
import HCRouter from './router';
import './index.css';

/**
 * @description 慧仓穿云箭WMS Web前端项目入口
 */
class HCApp {
    run(): void {
        const root = ReactDOM.createRoot(
            document.getElementById('root') as HTMLElement
        );

        root.render(
            <React.StrictMode>
                <HCRouter />
            </React.StrictMode>
        );
    }
}

const app = new HCApp();
app.run();