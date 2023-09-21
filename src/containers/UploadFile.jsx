import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import axios from 'axios';


const UploadFile = () => {
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
                const id = '64f7c9560127c7ead4269c8d';
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


    return(
    <>
    <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
    </>
    )
}
export default UploadFile;

//Dragger data
// const props = {
//     name: 'file',
//     multiple: true,
//     action: `http://localhost:5000/${id}/upload/`,
//     onChange(info) {
//         const filename = info.file.name;
//         const filesize = info.file.size;
//         const file = info.file.originFileObj;
//         const { status } = info.file.status;
//         const [mensaje, setMensaje] = useState();

//         if (status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }
//         if (status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully.`);
//             var read = new FileReader();
//             read.onload = (e) =>{
//                 alert(read.result);
//             };
//             read.readAsText(file);
//             const fileSend = {
//                 filename,
//                 filesize
//             }
//             axios.post(`http://localhost:5000/${id}/upload`, fileSend)
//             .then(({data}) => {
//                 setMensaje(data.mensaje);
//                 setTimeout(() => {
//                 setMensaje('');
//                 }, 1500);
//             })
//             .catch((error) => {
//                 console.error(error);
//                 setMensaje("Hubo un error");
//                 setTimeout(() => {
//                 setMensaje("");
//                 }, 1500);
//             });
//         } else if (status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//         },
//         onDrop(e) {
//         console.log('Dropped files', e.dataTransfer.files);
//         },
//     };