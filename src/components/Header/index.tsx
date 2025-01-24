import {Component} from "react";
import { Typography } from "antd";
import Link from "antd/es/typography/Link";

const { Title } = Typography;

export default class Header extends Component {
    render() {
        return (
            <div>
                <Title level={2} style={{textAlign: "center",color: '#fffff'}}>Nyaa Mirror</Title>
                <Title level={5} style={{textAlign: "center"}}>
                    一个简单易用的<Link href="https://nyaa.si">Nyaa</Link>镜像站
                </Title>
            </div>
        )
    }
}