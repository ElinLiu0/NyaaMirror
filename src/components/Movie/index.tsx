import { Component } from "react";
import { Table } from 'antd';
import type { TableProps } from 'antd';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faMagnet } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'antd'

export interface MovieProps {
    cateString: string;
    cateImage?: string;
    name?: string;
    torrentLink?: string;
    magnetLink?: string;
    size: string;
    date: string;
    seeders: number;
    leechers: number;
    downloads: number;
}

export interface dataProps {
    data: MovieProps[];
    width: string;
}

const NYAAMIRROR_SERVER_PORT = 8000
const NYAAMIRROR_SERVER_DOMAIN = "localhost"

const columns: TableProps<MovieProps>['columns'] = [
    {
        title: '分类',
        dataIndex: 'cateImage',
        key: 'cateImage',
        render: (imageURL: string, record: MovieProps) => <Image src={imageURL} width={50} alt={record.cateString}/>,
        width: '5%'
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (name: string) => <span>{name}</span>,
        width: '25%'
    },
    {
        title: '种子下载',
        dataIndex: 'torrentLink',
        key: 'torrentLink',
        render: (link: string,record: MovieProps) => <FontAwesomeIcon icon={faDownload} size='2x' onClick={
            () => {
                console.log(link)
                let torrentId: string | string[] = link.split("/")
                const lastIndex = torrentId.length - 1
                torrentId = torrentId[lastIndex].split(".")[0]
                window.open(`http://${NYAAMIRROR_SERVER_DOMAIN}:${NYAAMIRROR_SERVER_PORT}/download?torrent_id=${torrentId}&torrent_name=${record.name}`)
            }
        } />,
        width: '5%'
    },
    {
        title: '磁力链',
        dataIndex: 'magnetLink',
        key: 'magnetLink',
        render: (link: string) => <FontAwesomeIcon icon={faMagnet} size='2x' onClick={() => window.open(link)} />,
        width: '5%'
    },
    {
        title: '大小',
        dataIndex: 'size',
        key: 'size',
        width: '5%'
    },
    {
        title: '上传日期',
        dataIndex: 'date',
        key: 'date',
        sorter: (a: MovieProps, b: MovieProps) => a.date.localeCompare(b.date),
        width: '10%'
    },
    {
        title: '种子数',
        dataIndex: 'seeders',
        key: 'seeders',
        sorter: (a: MovieProps, b: MovieProps) => a.seeders - b.seeders,
        width: '5%'
    },
    {
        title: 'Leechers数量',
        dataIndex: 'leechers',
        key: 'leechers',
        sorter: (a: MovieProps, b: MovieProps) => a.leechers - b.leechers,
        width: '5%'
    },
    {
        title: '下载量',
        dataIndex: 'downloads',
        key: 'downloads',
        sorter: (a: MovieProps, b: MovieProps) => a.downloads - b.downloads,
        width: '5%'
    },
];

export default class MovieResult extends Component<dataProps> {
    static propTypes = {
        data: PropTypes.array.isRequired,
        width: PropTypes.string,
    };

    render() {
        return (
            <Table
                dataSource={this.props.data}
                columns={columns}
                scroll={{ y: 240 }}
                style={{ width: this.props.width,marginTop:'20px' }}
            />
        );
    }
}
