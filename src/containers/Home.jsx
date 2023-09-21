import React, {useEffect, useState} from 'react';
import {useParams /* useNavigate */} from 'react-router';
import {Col, Tooltip, Button, Row, Menu, Layout, Upload, message, Space, Card, Avatar, List} from 'antd';
import {BellOutlined, DashboardOutlined, LogoutOutlined, PlusOutlined, HeartOutlined, ShareAltOutlined, MenuOutlined, SettingOutlined, InboxOutlined, AppstoreOutlined, PieChartOutlined} from '@ant-design/icons';
import  {Bar}  from "@ant-design/plots/";
import 'antd/dist/reset.css';
import '../assets/css/Home.css';
import logo from '../assets/img/logotipo.svg';
import avatar from '../assets/img/avatar.jpg';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';
import { Pie } from '@ant-design/plots/';
import bgImg from '../assets/img/Laguna_Blanca.png';
import CardImage from '../components/Card';
import Map from './Map';
const API_KEY = 'unmoQU4B83Uk8pA39BJB';

const {Dragger} = Upload;
const {Sider} = Layout;
const {Meta} = Card;



const Home = () => {

    //Estilos
const stiles = {
    cardHeader: {
        minHeight: '50px',
        lineHeight: '30px',
        padding: "0 10px"
        //fontSize: '1',
        //fontWeight: 'bold',
        //textAlign: 'center',
    }
}

    //Pie Data
    const pieData = [
        {
            type: 'Nitrogeno',
            value: 27,
        },
        {
            type: 'Hidrogeno',
            value: 25,
        },
        {
            type: 'Azufre',
            value: 18,
        },
        {
            type: 'Potasio',
            value: 15,
        },
        {
            type: 'Calsio',
            value: 10,
        },
        {
            type: 'Magnesio',
            value: 5,
        },
        ];
        const pieConfig = {
            appendPadding: 10,
            height: 180,
            angleField: 'value',
            colorField: 'type',
            //radius: 0.4,
            label: {
            type: 'outer',
            content: '{name} {percentage}',
            },
            interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
            ],
        };

    //Get User Data
    const [userName, setName] = useState();
    const [userMeasures, setUserMeasures] = useState();
    const { id } = useParams();

    console.log(`${id}`);

    useEffect(() => {
        axios
        .get(`http://localhost:5000/getUser/${id}`)
        .then(({data}) => {
            setName(data.user);
            console.log(data.email);
        })
        .catch((err)=> console.error(err));
    }, [id]);
    
    useEffect(() => {
        axios.get(`http://localhost:5000/getMeasures/${id}`)
        .then(({data}) => {
            setUserMeasures(data);
            console.log(data);
        })
        .catch((err) => console.error(err));
    }, [id]);

    //Menu Data
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState('dashboard');
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
        function getItem(label, key, icon, children, type) {
            return {
            key,
            icon,
            children,
            label,
            type,
            };
        }
        const items = [
            getItem('Inicio', 'dashboard', <DashboardOutlined/>),
            getItem('Datos', 'data', <PieChartOutlined/>),
        ];
        const onClick = (e) => {
            setSelected(e.key);
            console.log('click ', e);
        };

//Dragger props
const props = {
    name: 'file',
    action: 'http://localhost:5000/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        const filename = info.file.name;
        const status = info.file.status;
        const file = info.file.originFileObj;
        if (status === 'done') {
            message.success(`El archivo ${filename} fue cargado correctamente`);
            var read = new FileReader();
            read.onload = (e) =>{
                alert(read.result);
                const content = e.target.result;
                const lines = content.split('\n');
                const columnNames = lines[0].split(','); //Guardamos los encabezados de las columnas
                
                const data = lines.slice(1).map((line) => { // Almacenar los datos del archivo CSV en un array
                    const values = line.split(',');
                    return columnNames.reduce((obj, columnName, index) => {
                    obj[columnName] = values[index];
                    return obj;
                    }, {});
                });
                const {temperatura, humedad, ph, latitud, longitud, altitud} = data[0];
                const Content = {
                            id,
                            temperatura,
                            humedad,
                            ph,
                            latitud,
                            longitud,
                            altitud
                        };
                axios.post('http://localhost:5000/upload', Content)
                .then(({data})=>{
                    message.success(`${data}`);
                })
                .catch((err)=>{
                    message.error(`error: ${err}`);
                });
            };
            read.readAsText(file);
        } else if (status === 'error') {
        message.error(`${filename} Error al subir el archivo.`);
        }
    },
    progress: {
        strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
        },
    strokeWidth: 6,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    } 
};


//List Data
const listData = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

//Ajustando el tamaño de la pagina
const [windowHeight, setWindowHeight] = useState(window.innerHeight);

useEffect(() => {
    const handleResize = () => {
    setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
    window.removeEventListener('resize', handleResize);
    };
}, []);

//Rendering
    return(
        <>
                <div className='navbar'>
                    <ul className='izq'>
                        <li>
                            <a href="http://localhost:3000"><img className="logo" src={logo} alt="logo"/></a>
                        </li>
                    </ul>
                    <ul className='der'>
                        <li className="notifications">
                        <Tooltip title="Notificaciones">
                            <Button type='text' shape="circle" size='large' style={{color:'#35396f'}} icon={<BellOutlined />} />
                        </Tooltip>
                            {/* <BellOutlined className='icons' style={{fontSize: '1.2em', color: '#35396f'}} /> */}
                        </li>
                        <li className="divider">
                        </li>
                        <li className='user-account'>
                            <img className='avatar' src={avatar} alt="avatar"/>
                            <div className='user-data'>
                                <p>{userName ? `${userName}` : "no name"}</p>
                                <p>Project Manager</p>
                            </div>
                        </li>
                        <li className="divider">
                        </li>
                        <li>
                        <Tooltip title="Cerrar Sesion">
                            <Button type='text' shape="circle" size='large' style={{color:'#35396f'}} icon={<LogoutOutlined />} />
                        </Tooltip>
                            {/* <LogoutOutlined className='icons' style={{fontSize: '1.2em', color: '#35396f'}}/> */}
                        </li>
                    </ul>
                </div>

                <div className="toolbar">
                    <div className="menu">
                        <Tooltip title="Menu">
                            <Button onClick={toggleCollapsed} type='text' shape="circle" size='large' style={{color:'#35396f'}} icon={<MenuOutlined />} />
                        </Tooltip>
                    </div>
                    <div className="tools">
                        <Tooltip title="Favorito">
                            <Button type='text' shape="circle" size='large' style={{color:'#35396f'}} icon={<HeartOutlined />} />
                        </Tooltip>
                        <Tooltip title="Compartir">
                            <Button type='text' shape="circle" size='large' style={{color:'#35396f'}} icon={<ShareAltOutlined />} />
                        </Tooltip>
                        <Tooltip title="Subir CSV">
                            <Button type='text' shape="circle" size='large' style={{color:'#35396f'}} icon={<PlusOutlined />} />
                        </Tooltip>
                    </div>    
                </div>

                {/* <div className="workspace"> */}
                <Layout hasSider style={{minHeight: windowHeight - 114}}>
                    <Sider theme='light' trigger={null} style={{ backgroundColor: 'white', padding: 0, width: '300px', flexBasis: 'auto'}} collapsible collapsed={collapsed}>
                        {/*<div>*/}
                        <div className="sidebar"> 
                            <Menu
                                className='Menu'
                                onClick={onClick}
                                style={{margin: 0, width: '100%'}}
                                inlineCollapsed={collapsed}
                                defaultSelectedKeys={['dashboard']}
                                mode="inline"
                                items={items}
                            />
                            <div className="dragger_area">
                                { !collapsed ?
                                <Dragger
                                    {...props}
                                    onDrop = {(e)=>{
                                    console.log('Dropped files', e.dataTransfer.files);
                                        }
                                    } 
                                    style={{width: 150}}
                                >
                                    <p className="ant-upload-drag-icon">
                                    { !collapsed ? <InboxOutlined size={4}/> : <PlusOutlined/> }
                                    </p>
                                    <p style={{fontSize: '0.8rem'}} className="ant-upload-text">{ !collapsed ? "Subir CSV" : ""}</p>
                                    <p style={{fontSize: '0.6rem'}} className="ant-upload-hint">
                                    {!collapsed ? "Arrastre aquí o haga clic" : ""}
                                    </p>
                                </Dragger> 
                                : 
                                <Upload {...props}>
                                    <Button icon={<PlusOutlined />}></Button>
                                </Upload>
                                }
                            </div>
                        </div>
                        {/* </div> */}
                    </Sider>

                    <Content style={{height: '100%'}}>
                        {selected === 'dashboard' && 
                            <>
                            <Row style={{/*backgroundColor: 'coral'*/}}>
                                <Col span={8}>
                                    <Card
                                        title="Reciente"
                                        bordered={false}
                                        headStyle={stiles.cardHeader}
                                        style={{
                                            height: 250,
                                            margin: '10px 0 0 10px',
                                        }}
                                    >
                                        <CardImage 
                                            width='280px'
                                            height='150px'
                                            imageUrl={bgImg}
                                            title="Laguna Blanca"
                                            subtitle="20.27856, -73.64722"
                                        />
                                    </Card>
                                </Col>
                                <Col span={16}>
                                    <Card
                                        title='Estadisticas'
                                        bordered={false}
                                        headStyle={stiles.cardHeader}
                                        style={{
                                            height: 250,
                                            margin: '10px 10px 0 10px',
                                        }}
                                    >   <Pie {...pieConfig} data={pieData}/>
                                        {/* <PieChart {...config}/> */}
                                    </Card>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={24}>
                                    <Card
                                        title='Todas las mediciones'
                                        headStyle={stiles.cardHeader}
                                        bordered={false}
                                        style={{
                                            padding: 0,
                                            margin: '10px 10px 10px 10px',
                                        }}
                                    >
                                        <div
                                            id="scrollableDiv"
                                            style={{
                                                height: 160,
                                                overflow: 'auto',
                                                padding: '0 0 16px 0',
                                            }}
                                        >
                                            <List
                                            itemLayout="horizontal"
                                            dataSource={userMeasures}
                                            renderItem={(item, index) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                    avatar={<Avatar src={'../assets/img/map.png'} />}
                                                    title={<a href="https://ant.design">{item.latitud}</a>}
                                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                    />
                                                </List.Item>
                                            )}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                        }
                        {selected === 'data' &&
                            <div className='map-section'>
                                <div className='map'>
                                    {/* <Map/> */}
                                </div>
                                <div className="charts">
                                    <div className='nutrient'>
                                        <h4 className="charts-title">Nutrientes</h4>
                                        <Pie {...pieConfig} data={pieData}/>
                                    </div>
                                    <div className="measures">
                                        <h4 className="charts-title">Indicadores</h4>
                                        
                                    </div>
                                    <div className="crops">
                                        <h4 className="charts-title">Cultivos</h4>
                                    </div>
                                </div>
                            </div>
                        }
                    </Content>
                </Layout>
            {/* </div> */}
        </>
    );
}

export default Home;