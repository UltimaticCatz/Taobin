import React, { useState } from 'react'
import { toast } from 'react-toastify' 

const AddDrink = () => {

  const [visibility, setVisibility] = useState("invisible");
  const [drink_name, setDrinkName] = useState("");
  const [price, setDrinkPrice] = useState("");
  const [type_drink, setDrinkType] = useState("");
  const [image, setDrinkFile] = useState(null);

  const FormToggle = () => {
    setVisibility("visible");
  }

  const FormUnToggle = () => {
    setVisibility("invisible");
  }

  const addDrink = async (newDrink) => {
    const res = await fetch('http://localhost:3001/drinks/registerDrink', {
      method: 'POST',
      body: newDrink
    });

    console.log([...newDrink]);

    if (!res.ok) {
      console.log("Error response from add Drink");
    }
    return;
  }

  const submitForm = (e) => {
    e.preventDefault();

    const newDrink = new FormData();
    
    newDrink.append('drink_name', drink_name);
    newDrink.append('price', price);
    newDrink.append('type_drink', type_drink);
    newDrink.append('image', image);

    addDrink(newDrink);

    toast.success("Drink Added");

    setTimeout(() => {
        window.location.reload(true);
    }, 2000);

  }

  return (
    <>
      <div className='grid place-content-center'>
        <button onClick={ FormToggle } className='bg-orange-400 text-center rounded-full m-10 px-10 py-3 font-mono text-3xl hover:bg-orange-500 active:bg-orange-600 active:ring active:ring-blue-400'>
            Add Drink 
        </button>
      </div>
      <div className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center font-mono ${ visibility }`}>
        <div className='mt-10 flex-col gap-5 text-white'>
            <div className='flex justify-end'>
                <button onClick={ FormUnToggle } className='place-self-end text-2xl'>X</button>
            </div>
            <div className='bg-orange-600 rounded-xl px-14 py-20 flex flex-col gap-5 times-center mx-4'>
                <h1 className='text-3xl font-extrabold'>Add A Drink</h1>
                <form onSubmit={submitForm} className='text-2xl'>
                    <input type='file' onChange={(e) => setDrinkFile(e.target.files[0])} required/>
                    <p>Drink Name:</p>
                    <input type='text' className='caret-pink-500 text-black' onChange={(e) => setDrinkName(e.target.value)} required/>
                    <p>Price:</p>
                    <input type='number' min='0.00' className='text-black' onChange={(e) => setDrinkPrice(e.target.value)} required/>
                    <p>Type:</p>
                    <input type='radio' name='drink_type' className='scale-150' value='Hot' onChange={(e) => setDrinkType(e.target.value)} required/>
                    <label> Hot</label>
                    <br></br>
                    <input type='radio' name='drink_type' className='scale-150' value='Cold' onChange={(e) => setDrinkType(e.target.value)}/>
                    <label> Cold</label>
                    <br></br>
                    <input type='radio' name='drink_type' className='scale-150' value='Frappe' onChange={(e) => setDrinkType(e.target.value)}/>   
                    <label> Frappe</label>
                    <br></br>
                    <input type="submit" className='bg-blue-500 rounded-full px-5 py-0.5n hover:bg-blue-600 active:ring active:ring-indigo-600'/>
                </form>
            </div>
        </div>
      </div>
    </>
    
  )
}

export default AddDrink