import Bot from "./component/Bot"




const botsPromises = fetch("http://localhost:3000/bots").then(res => res.json());

function App() {

  return (
    <>
     
      <h1 className="text-center text-5xl py-8 font-bold">Bot management application</h1>
      <div className="flex flex-col items-center justify-center">
        <Bot botsPromises={botsPromises}/>
   
      </div>
      
    </>
  )
}

export default App
