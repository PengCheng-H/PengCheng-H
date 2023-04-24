import React from 'react';
import HCSideMenu from '../../components/HCSideMenu';



export default class HCHome extends React.Component<object, object>{
    render(): React.ReactNode {
        return <div>
            <HCSideMenu />
            {/* <h1>Home</h1> */}
        </div>;
    }
}
