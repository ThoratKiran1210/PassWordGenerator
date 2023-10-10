import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(5);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  // const passwordGenerator = useCallback(fun, [dependencies]); Syntax
  const passwordGenerator = useCallback(() => {
    var pass = "";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(number) str += "0123456789"; //true
    if(character) str += "!@#$%^&*()_+{}?><";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  return (
    <>
    <div className='w-full max-x-md mx-auto shadow-md rounded-lg px-4 my-8 text-blue-500 bg-gray-900'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
         />
         <button onClick={copyPassword}
         className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'
         >copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={5} 
          max={50} 
          value={length} 
          className='cursor-pointer' 
          onChange={(e) => {setLength(e.target.value)}} />
          <label>length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={number}
          id='number'
          onChange={() => {setNumber((prev)=> !prev);}}
           />
        </div>
        <label>Number</label>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={character}
          id='character'
          onChange={() => {setCharacter((prev)=> !prev);}}
           />
        </div>
        <label>Character</label>
        </div>
      </div>
    
    </>
    )
}

  

export default App
