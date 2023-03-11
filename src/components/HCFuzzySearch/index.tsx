import React, { Component } from 'react';
import { Input, Select } from 'antd';


interface Props {
    dataSource: any[];
    placeholder?: string;
    style?: React.CSSProperties;
    className?: string;
    autoFocus?: boolean;
    onChange?: (value: string) => void;
    onSearch?: (value: string, cb: Function) => void;
}

interface DataSourceType { label: string, value: any }

interface State {
    value: string;
    realDataSource: DataSourceType[];
    fruzzydataSource: DataSourceType[];
}

export default class HCFuzzySearch extends Component<Props, State> {
    child_select: React.ReactNode | any;

    constructor(props: Props) {
        super(props);
        this.state = {
            value: "",
            fruzzydataSource: props.dataSource.map(item => {
                return { label: item.toString(), value: item.toString() };
            }),
            realDataSource: props.dataSource.map(item => {
                return { label: item.toString(), value: item.toString() };
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
        const { onSearch } = this.props;
        if (onSearch) {
            onSearch(value, (data_source: DataSourceType[]) => this.setState({ realDataSource: data_source }));
        }
        const newDataSource = this.state.realDataSource.filter(item => item.value.includes(value));
        this.setState({ fruzzydataSource: newDataSource });
    };

    render() {
        return (
            <Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onChange={this.handleChange.bind(this)}
                onSearch={this.handleSearch.bind(this)}
                notFoundContent={null}
                style={this.props?.style}
                options={this.state.fruzzydataSource}
                placeholder={this.props?.placeholder}
                className={this.props?.className}
                autoFocus={this.props?.autoFocus}
                ref={child => this.child_select = child}
            ></Select>
        );
    }

    focus() {
        this.child_select.focus()
    }

    blur() {
        this.child_select.blur()
    }


}