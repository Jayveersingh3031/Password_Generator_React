import { useCallback, useEffect, useRef, useState } from "react"

function App() {

      const [length,setLength]=useState(8);
      const [numberAllowed,setNumberAllowed]=useState(false);
      const [charAllowed,setCharAllowed]=useState(false);
      const [password,setPassword]=useState("");
      const passwordGenerator=useCallback(()=>{
       let pass=""
       let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
          if(numberAllowed) str+="0123456789";
          if(charAllowed) str+="!@#$%^&*()";
        for(var i=1;i<=length;i++){
          var num=Math.floor(Math.random()*str.length+1);
          pass += str.charAt(num);
        }
        setPassword(pass);
      },[length,numberAllowed,charAllowed,setPassword]);
      useEffect(()=>{
          passwordGenerator();
      },[length,numberAllowed,charAllowed,passwordGenerator])

      const passwordRef=useRef(null)
      const copyPassword=useCallback(()=>{
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)//copy karne k liye
      },[password])

  return (
    <>
      <div className="w-full h-screen bg-slate-950 flex justify-center py-40 text-orange-800">
        <div className="text-center">
          <h1>Password Generator</h1>
          <div className="w-full h-10 bg-orange-200 flex justify-start rounded overflow-hidden my-3">
            <input
            className="w-3/4 px-2"
            type="text" 
            value={password}
            placeholder="password"
            ref={passwordRef}
            readOnly
            />
            <button onClick={copyPassword} className="bg-blue-400 w-1/4">Copy</button>
          </div>
          <div className="flex gap-3"> 
            <input 
            type="range"
            min={6}
            max={25}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>length: {length}</label>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed} 
            id="numberAllowed"
            onClick={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
            />
            <label>Numbers</label>
            <input 
            type="checkbox"
            defaultChecked={charAllowed} 
            id="charAllowed"
            onClick={()=>{
              setCharAllowed((prev)=>!prev)
            }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
