import React from "react";

interface IMyComponentProps {
    name: string
}

export default class MyComponent extends React.Component {
    constructor(props: IMyComponentProps) {
        super(props);
        this.state = {
            name: "xiaochou"
        };
    }
    render() {
        return (
            <div></div>
        );
    }
}