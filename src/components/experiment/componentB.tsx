import React from 'react';
import { Component } from 'react'

type props = {
    name: string;
};

export default class ComponentB extends Component<props> {
    render(): React.ReactNode {
        return <span>ComponentB: {this.props.name}</span>
    }
}