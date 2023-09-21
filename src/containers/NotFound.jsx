import React from 'react';
const Montserrat = require('../assets/fonts/Montserrat.ttf');

const NotFound = () => {
    const style = {
        button: {
        backgroundColor: '#13154e',
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: '500',
        padding: '10px 30px',
        marginTop: '12px',
        letterSpacing: '-1px',
        textDecoration: 'none',
        borderRadius: '50px',
    }}
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', fontFamily: 'Montserrat'}}>
            <h1 style={{fontWeight: 'bold', fontSize: '7rem', lineHeight: '2rem', color: '#13154e'}}>404</h1>
            <h2 style={{fontWeight: 'bold', fontSize: '2.5rem', color: '#13154e'}}>NO ENCONTRADO</h2>
            <h3 style={{fontSize: '1.2rem', letterSpacing: '-1px', fontWeight: '300', maxWidth: '50%', lineHeight: '1.5rem', textAlign: 'center', color: '#13154e',}}>Lo sentimos, la página que estás buscando no existe. Vuelve a la página principal usando el siguiente botón.</h3>
            <a href='/landing' style={style.button}>Regresar</a>
        </div>
    );
}

export default NotFound;