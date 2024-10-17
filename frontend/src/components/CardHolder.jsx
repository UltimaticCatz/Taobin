import React, { useState, useEffect } from 'react'
import Card from './Card'

const CardHolder = () => {

    const [drinks, setDrinks] = useState([]);
    
    useEffect( () => {
        const fetchDrinks = async() => {
            try {
                const res = await fetch('http://localhost:3001/drinks');
                const data = await res.json();
                setDrinks(data);
            } catch (error) {
                console.log('Error retrieving data.')
            }
        }

        fetchDrinks();
    }, []);

  return (
    <div className='grid grid-cols-3 gap-10 mx-20'>
        { drinks.map((drink) => (
            <Card  drink={ drink }/>
        ))} 
    </div>
    
  )
}

export default CardHolder