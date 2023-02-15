import React, { Component } from 'react';
import { Input, Select } from 'antd';

interface Props {
    dataSource: string[];
    placeholder?: string;
    style?: React.CSSProperties;
    onChange?: (value: string) => void;
}

interface State {
    value: string;
    dataSource: { label: string, value: any }[];
    originDataSource: { label: string, value: any }[];
}

export default class HCFuzzySearch extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: "",
            dataSource: props.dataSource.map(item => {
                return { label: item, value: item };
            }),
            originDataSource: props.dataSource.map(item => {
                return { label: item, value: item };
            }),
        };
    }

    handleChange = (value: string) => {
        const { onChange } = this.props;
        this.setState({ value });
        if (onChange) {
            onChange(value);
        }
    };

    handleSearch = (value: string) => {
        const newDataSource = this.state.originDataSource.filter(item => item.value.includes(value));
        this.setState({ dataSource: newDataSource });
    };

    render() {
        return (
            <Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
                style={this.props?.style}
                options={this.state.dataSource}
                placeholder={this.props?.placeholder}
            ></Select>
        );
    }
}