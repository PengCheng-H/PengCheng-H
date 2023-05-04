import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from '../pages/home/Index';

export default function RouterIndex() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </>
}