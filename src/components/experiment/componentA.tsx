import React from 'react';
import { Component } from 'react'
import CompoenntB from './componentB';

export default class ComponentA extends Component {
    render(): React.ReactNode {
        return <CompoenntB name={"compoent_A"} />
    }
}