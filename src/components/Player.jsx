import { useRef, useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState()

  let pName = useRef()

  function setName(){
    setPlayerName(pName.current.value);
    pName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'Anonymous Player'}</h2>
      <p>
        <input 
          type="text"
          required 
          ref={pName}
        />
        <button onClick={setName}>Set Name</button>
      </p>
    </section>
  );
}
