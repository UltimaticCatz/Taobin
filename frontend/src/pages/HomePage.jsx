import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import CardHolder from '../components/CardHolder'
import AddDrink from '../components/AddDrink'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = () => {

    useEffect(() => {
        document.body.style.backgroundColor = '#ffedd5';
    
        return () => {
          document.body.style.backgroundColor = "";
        };
    }, []);

    return (
        <>
            <ToastContainer />
            <Hero />
            <CardHolder />
            <AddDrink />
            
        </>
    )
}

export default HomePage