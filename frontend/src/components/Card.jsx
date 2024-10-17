import React, { useState, useEffect } from 'react'
import { toast} from 'react-toastify'

const Card = ({ drink }) => {
     
    const [visibility, setVisibility] = useState("invisible");
    const [blurVar, setBlur] = useState("");

    const isHover = () => {
        setVisibility("visible");
        setBlur("blur-sm");
    }

    const notHover = () => {
        setVisibility("invisible");
        setBlur("");
    }

    const orderNotify = () => {
        toast.success(drink.drink_name + " Ordered!");
    }




    return (
        <div onMouseEnter={() => isHover()} onMouseLeave={() => notHover()} className='bg-orange-200 flex flex-col rounded-3xl font-mono text-2xl pb-7 hover:bg-orange-300 hover:scale-110 transition ease-linear duration-300 relative shadow-lg hover:shadow-xl'>
            
            <img className={ `m-5 rounded-full ${ blurVar }` } src={ drink.image } alt='An Image'/>
            <div className={ `m-5 ${ blurVar }` }>{ drink.drink_name }</div>
            <div className={ `relative m-5 ${ blurVar }` }>   
                <div className='absolute inset-y-0 right-0'> ฿{ drink.price } { drink.type_drink }</div>
            </div>
            <button onClick={orderNotify} className={ `${ visibility } absolute place-self-center bottom-1/2 text-center bg-orange-400 rounded-full px-3 py-2 text-6xl hover:bg-orange-500 active:bg-orange-600 active:ring active:ring-blue-400` }>
                Order
            </button>            
        </div>
    )
}

export default Card