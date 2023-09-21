import React from 'react';
import Navbar from "../components/Navbar";
import Hero from '../components/Hero';
import '../assets/css/Landing1.css';

const Landing1 = () => {
    return(
        <div className='wrapper'>
            <Navbar/>
            <Hero className='max-width'/>
        </div>
    );
}
export default Landing1;