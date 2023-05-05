import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import HomeIndex from '../pages/home/Index';
import WorkbenchIndex from '../pages/workbench/Index';
import InboundOrder from '../pages/workbench/order/Inbound';
import OutboundOrder from '../pages/workbench/order/Outbound';
import ConsoleIndex from '../pages/console/Index';
import BasicIndex from '../pages/console/basic_data/Index';
import BasicBox from '../pages/console/basic_data/Box';
import BasicCell from '../pages/console/basic_data/Cell';
import BasicItem from '../pages/console/basic_data/Item';
import BasicSupplier from '../pages/console/basic_data/Supplier';
import InventoryIndex from '../pages/console/inventory/Index';
import InventoryBox from '../pages/console/inventory/Box';
import InventoryItem from '../pages/console/inventory/Item';
import InventorySummary from '../pages/console/inventory/Summary';
import TaskIndex from '../pages/console/task/Index';
import TaskWcs from '../pages/console/task/WcsTask';
import TaskWms from '../pages/console/task/WmsTask';
import UserManagement from '../pages/console/user/Index';
import HelpIndex from '../pages/help/Index';
import UserManual from '../pages/help/manual/UserManual';
import ExceptionManual from '../pages/help/manual/ExceptionManual';
import UserIndex from '../pages/user/Index';
import UserLogin from '../pages/user/Login';
import UserRegiste from '../pages/user/Registe';
import NoPageIndex from '../pages/no_page/Index';

export default function RouterIndex() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path='home'>
                    <Route path='' element={<HomeIndex />} />
                </Route>
                <Route path='workbench'>
                    <Route path='' element={<WorkbenchIndex />} />
                    <Route path='order'>
                        <Route path='inbound' element={<InboundOrder />} />
                        <Route path='outbound' element={<OutboundOrder />} />
                    </Route>
                </Route>
                <Route path='console'>
                    <Route path='' element={<ConsoleIndex />} />
                    <Route path='basic'>
                        <Route path='' element={<BasicIndex />} />
                        <Route path='box' element={<BasicBox />} />
                        <Route path='cell' element={<BasicCell />} />
                        <Route path='item' element={<BasicItem />} />
                        <Route path='supplier' element={<BasicSupplier />} />
                    </Route>
                    <Route path='inventory'>
                        <Route path='' element={<InventoryIndex />} />
                        <Route path='box' element={<InventoryBox />} />
                        <Route path='item' element={<InventoryItem />} />
                        <Route path='summary' element={<InventorySummary />} />
                    </Route>
                    <Route path='task'>
                        <Route path='' element={<TaskIndex />} />
                        <Route path='wcs' element={<TaskWcs />} />
                        <Route path='wms' element={<TaskWms />} />
                    </Route>
                    <Route path='user'>
                        <Route path='' element={<UserManagement />} />
                    </Route>
                </Route>
                <Route path='help'>
                    <Route path='' element={<HelpIndex />} />
                    <Route path='manual'>
                        <Route path='user' element={<UserManual />} />
                        <Route path='exception' element={<ExceptionManual />} />
                    </Route>
                </Route>
                <Route path='user'>
                    <Route path='' element={<UserIndex />} />
                    <Route path='login' element={<UserLogin />} />
                    <Route path='registe' element={<UserRegiste />} />
                </Route>
                <Route path='404' element={<NoPageIndex />} />
                <Route path='*' element={<Navigate to="workbench" />} />
            </Routes>
        </BrowserRouter>
    </>
}