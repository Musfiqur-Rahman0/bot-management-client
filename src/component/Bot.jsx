import React, { use, useState } from 'react';

const Bot = ({botsPromises}) => {
   const initalBots = use(botsPromises);
    const [bots, setBots] = useState(initalBots)
  
    

    const handleAddForm = e => {
       
        e.preventDefault();
        const newBot = {
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
        }).then(res =>res.json()).then(data => {
            if(data.insertedId){
                newBot.id = data.insertedId;
                setBots([...bots, newBot]);
                e.target.reset();
            }
        })
    }

    const handleDeleteBots = id =>{
        console.log(`bot to be deleted id ${id}`);
        fetch(`http://localhost:3000/bots/${id}`, {
            method : 'DELETE',
        }).then(res => res.json()).then(data=> {
            if(data.deletedCount){
              const  remainingBots  =     bots.filter((bot)=> bot._id !== id)
                setBots(remainingBots)
                console.log("after delete", data)
            }
        })

    }
  
    console.log(bots)

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
            {bots.map(bot => <div key={bot._id} className='flex  items-center gap-5'>
                <h2>{bot.name} : {bot.email}</h2>
                <button 
                onClick={()=> handleDeleteBots(bot._id)}
                className='cursor-pointer border border-gray-500 rounded-l
                g  px-4 focus:outline-lime-400'>X</button>
            </div>)}
        </div>
        </div>
    );
};

export default Bot;