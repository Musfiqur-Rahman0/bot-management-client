import React, { use, useState } from 'react';

const Bot = ({botsPromises}) => {
   const initalBots = use(botsPromises);

   const [id, setId]=useState(initalBots.length)
  
    

    const handleAddForm = e => {
        setId(id+1)
        e.preventDefault();
        const newBot = {
            id : id,
            name  : e.target.name.value,
            email : e.target.email.value,
        }

        console.log(newBot);
        
       
        
        
        fetch("http://localhost:3000/bots", {
            method : "post",
            headers : {
                'content-type' : 'application/json',
            },
            body : JSON.stringify(newBot)
        }).then(res =>res.json()).then(data => console.log(data))
    }

  


    return (
        <div>
            <h2 className='text-center text-3xl '>Add Bots</h2>
            <form onSubmit={handleAddForm} className='space-y-4 mt-4'> 
               <div>
                <label htmlFor="name">Name : </label>
                 <input type="text" placeholder='Enter bot name' name='name' className='border border-gray-300 px-3 py-1 rounded-lg' />
               </div>
               <div>
                <label htmlFor="email">Email : </label>
                <input type="email" placeholder='Enter bot email' name='email' className='border border-gray-300 px-3 py-1 rounded-lg' />
                </div>
                <div className="flex items-center justify-center"><input type="submit" value="Add Bot" className='border border-gray-300 rounded-full px-5 py-1  text-xs cursor-pointer active:scale-95' /></div>
            </form>
            <div className='flex flex-col gap-5 items-center justify-center mt-5'>
            {initalBots.map(bot => <div key={bot.id} className='flex  items-center gap-5'>
                <h2>{bot.name} : {bot.email}</h2>
                <button className='cursor-pointer'>X</button>
            </div>)}
        </div>
        </div>
    );
};

export default Bot;