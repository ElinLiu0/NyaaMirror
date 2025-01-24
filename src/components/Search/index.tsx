import React, { Component } from 'react'
import { Input } from 'antd'
import axios, { AxiosResponse } from 'axios'
import MovieResult from "../Movie"
// import type { MovieProps } from '../Movie'
import { message } from 'antd'

const { Search } = Input

const baseStyle:React.CSSProperties = {
    width: '1200px',
    height: 'auto'
}

export default class SearchBar extends Component {
    state = {
        query: '',
        onSearching: false,
        error: '',
        description: '',
        data: []
    }

    protected readonly api = '/api?q='

    search = async (query: string) => {
        this.setState({ 
            onSearching: true,
            data:[]
        })
        axios.get(
            this.api + query,
        ).then((response: AxiosResponse) => {
            // 渲染数据
            const data = response.data;
            this.setState({
                onSearching: false,
                data: data
            })
        }).catch((error) => {
            this.setState(
                { 
                    onSearching: false, 
                    error: error.message, 
                    description: '请检查网络连接或者稍后再试',
                    data: []
                }
            )
            message.error('请检查网络连接或者稍后再试')
        })
    }

    render() {
        return (
        <div>
            <Search 
                placeholder='请输入想要搜索的番剧名' 
                loading = {this.state.onSearching} 
                onSearch={this.search} 
                style={baseStyle}
            />
            {
                (this.state.data.length > 0) &&
                <MovieResult data={this.state.data} width='1200px'/>
            }
        </div>
        )
    }
}
