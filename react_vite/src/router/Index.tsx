import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// 主页路由
import HomeIndex from '../pages/home/Index';
import HelpIndex from '../pages/help/Index';
import UserManual from '../pages/help/manual/UserManual';
import ExceptionManual from '../pages/help/manual/ExceptionManual';
import UserIndex from '../pages/user/Index';
import UserLogin from '../pages/user/Login';
import UserRegiste from '../pages/user/Registe';
// 工作站路由
import WorkbenchIndex from '../pages/workbench/Index';
import InboundOrder from '../pages/workbench/order/Inbound';
import OutboundOrder from '../pages/workbench/order/Outbound';
// 控制台路由
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
// 其它路由
import NoPageIndex from "src/pages/no_page/Index";

// 全局路由器
export default function GlobalRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 主页路由 */}
                {/* <Route path='/' element={<HomeIndex />}>
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
                </Route> */}

                {/* 工作站路由 */}
                <Route path='workbench' element={<WorkbenchIndex />}>
                    <Route path='order'>
                        <Route path='inbound' element={<InboundOrder />} />
                        <Route path='outbound' element={<OutboundOrder />} />
                    </Route>
                </Route>

                {/* 控制台路由 */}
                <Route path='console' element={<ConsoleIndex />}>
                    <Route path='basic'>
                        <Route path='dashboard' element={<BasicIndex />} />
                        <Route path='boxes' element={<BasicBox />} />
                        <Route path='cells' element={<BasicCell />} />
                        <Route path='items' element={<BasicItem />} />
                        <Route path='suppliers' element={<BasicSupplier />} />
                    </Route>
                    <Route path='inventory'>
                        <Route path='dashboard' element={<InventoryIndex />} />
                        <Route path='boxes' element={<InventoryBox />} />
                        <Route path='items' element={<InventoryItem />} />
                        <Route path='summary' element={<InventorySummary />} />
                    </Route>
                    <Route path='tasks'>
                        <Route path='dashboard' element={<TaskIndex />} />
                        <Route path='wcs' element={<TaskWcs />} />
                        <Route path='wms' element={<TaskWms />} />
                    </Route>
                    <Route path='users'>
                        <Route path='dashboard' element={<UserManagement />} />
                    </Route>
                </Route>

                {/* 默认路由 */}
                <Route path='404' element={<NoPageIndex />} />
                {/* <Route path='*' element={<Navigate to="workbench" />} /> */}
                <Route path='*' element={<Navigate to="console" />} />
                {/* <Route path='*' element={<Navigate to="404" />} /> */}
            </Routes >
        </BrowserRouter>
    )
}