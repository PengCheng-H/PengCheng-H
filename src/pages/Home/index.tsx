import React from 'react';
import HCSideMenu from '../../components/HCSideMenu';



export default class HCHome extends React.Component<{}, {}>{
    render(): React.ReactNode {
        return <div>
            <HCSideMenu />
            {/* <h1>Home</h1> */}
        </div>;
    }
}
