import React, { Component } from 'react'
import Header from './components/Header'
import { Drawer, Flex, theme } from 'antd'
import SearchBar from './components/Search'
import type { DrawerProps } from 'antd'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import Link from 'antd/es/typography/Link'
import { Switch } from 'antd'
import { SunOutlined,MoonOutlined } from '@ant-design/icons'
import { ConfigProvider } from 'antd'
import { Layout } from 'antd'
import './App.css'
import { GithubOutlined } from '@ant-design/icons'  

const flexStyle:React.CSSProperties = {
  marginTop: '50px'
}


export default class App extends Component {

  state = {
    open: false,
    placement: 'left' as DrawerProps['placement'],
    isDark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  showDrawer = () => {
    this.setState({
      open: true,
    })
  }

  onClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <ConfigProvider
          theme={{
            algorithm: this.state.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
          }}
      >
        <Layout style={{ minHeight: '100vh', overflow: 'hidden'}}>
          <div>
            <MenuUnfoldOutlined onClick={this.showDrawer} style={
              { 
                fontSize: '30px', 
                position: 'fixed', 
                top: '20px', 
                left: '20px', 
                zIndex: 1000,
                color: this.state.isDark ? 'white' : 'black'
              }
            } />
            <Switch 
              checkedChildren= {<MoonOutlined />}
              unCheckedChildren= {<SunOutlined />}
              onChange={(checked) => this.setState({isDark: checked})}
              style={{ width: '50px',height:'auto',position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}
              defaultChecked={this.state.isDark}
            />
            <Flex align='center' justify='center' style={flexStyle} vertical={true}>
              <Header />
              <br />
              <SearchBar />
            </Flex>
            <Drawer 
              title = '关于Nyaa Mirror'
              placement = {this.state.placement}
              closable = {true}
              onClose = {this.onClose}
              open = {this.state.open}
              key = {this.state.placement}
            >
              Nyaa Mirror由
              <Link href='https://react.docschina.org/'>React</Link>
              和<Link href='https://ant.design/index-cn'>Ant Design</Link>
              进行编码，由<Link href='https://vitejs.dev/'>Vite</Link>进行构建。
              <br />
              Nyaa Mirror Server由<Link href='https://fastapi.tiangolo.com/'>FastAPI</Link>提供支持。
              {/* 使图标下沉到抽屉的底部 */}
              <GithubOutlined style={{
                position: 'absolute',
                bottom: '40px',
                left: '40px',
                fontSize: '50px',
              }} onClick={() => window.open("https://github.com/ElinLiu0/NyaaMirror")}/>
            </Drawer>
          </div>
        </Layout>
      </ConfigProvider>
    )
  }
}
