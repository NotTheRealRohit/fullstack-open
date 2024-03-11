// import { useState } from 'react';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import ListItems from "./components/ListItems";
import noteService from './service/notes';
import './index.css'
import Notification from "./components/Notification";

// const Display = ({counter}) => <p>{counter}</p>;
  

// const Button = ({onSmash, text}) => <button onClick={onSmash}> {text}</button>;


// const App = () => {
//   // const [counter, setCounter] = useState(10);
//   const [clicks, setClick] = useState({
//     left: 0,
//     right: 0
//   });
//   const [trackClicks, setTrack] = useState([]);
//   const [totalClicks,setTotal] = useState(0);

//   // console.log("Counter set to ::"+counter);
//   console.log("Clicks set to ::",clicks);
//   console.log("Track set to ::"+trackClicks);
//   console.log("Total set to ::"+totalClicks);

//   // const increaseByOne = () => {
//   //   console.log("Increasing, before :: "+counter);
//   //   setCounter(counter + 1);
//   // }

//   // const setToZero = () => {
//   //   console.log("zeroing, before :: "+counter);
//   //   setCounter(0);
//   // }

//   const incrementLeftClick = () => {
//     console.log("left, before :: "+clicks.left);
//     setTrack(trackClicks.concat('L'));
//     const updateLeftClick = clicks.left + 1;
//     console.log("left click before set::"+clicks.left);
//     setClick({
//       ...clicks,
//       left: updateLeftClick
//     });
//     console.log("left click after set::"+clicks.left);
//     setTotal(updateLeftClick + clicks.right);
//   }

//   const incrementRightClick = () => {
//     console.log("right, before :: "+clicks.right);
//     setTrack(trackClicks.concat('R'));
//     const updateRightClick = clicks.right + 1;
//     setClick({
//       ...clicks,
//       right: updateRightClick
//     });
//     setTotal(clicks.left + updateRightClick);
//   }

//   return (
//     <div>
//       {/* <Display counter={counter}/>
//       <Button onSmash={increaseByOne} text="Click Me"/>
//       <Button onSmash={setToZero} text="Dont Click Me"/> */}

//       <div>
//         {clicks.left}
//         <Button onSmash={incrementLeftClick} text="Left"/>
//       </div>
//       <div>
//         {clicks.right}
//         <Button onSmash={incrementRightClick} text="Right"/>
//       </div>
//       <p>
//         {trackClicks.join(' ')}
//       </p>
//       <p>
//         {totalClicks}
//       </p>
//     </div>
//   )
// }

// const Button = ({handleClick, text}) => <button onClick={handleClick}> {text}</button>


// const Display = ({counter}) => <p>{counter}</p>

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   const updateCounter = (value) => {
//     console.log("Counter set to ::"+value);
//     setCounter(value);
//   }

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button handleClick={() => updateCounter(1000)} text="Set Counter to 1000" />
//       <Button handleClick={() => updateCounter(counter + 1)} text="Increment counter" />
//     </div>
//   )
// }

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note..")
  const [showAll,setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const notesToShow = showAll ? notes : notes.filter(note=> note.important)
  console.log(notes);

  useEffect(()=>{
    noteService.getAll()
      .then(initialNotes=>  setNotes(initialNotes));
  },[]);

  const addNote = (e)=>{
      e.preventDefault();
        const noteObj = {
          // id: notes.length + 1,
          content: newNote,
          important: Math.random < 0.5
        }

        noteService.create(noteObj)
                    .then((newNote)=>{
                      setNotes(notes.concat(newNote));
                      setNewNote('');
                    })

  }

  const addNewNote = (e)=>{
    setNewNote(e.target.value)
  }

  const handleToggleImportance = (id)=>{
    const note = notes.find(note=> note.id === id);
    const newNote = {...note, important: !note.important};

    noteService.update(newNote,id)
      .then(updatedNote=> setNotes(notes.map(note=> note.id !== id ? note : updatedNote)))
      .catch(error=>{
        setErrorMessage(`Note: "${note.content}" was already deleted from Server`);
        setTimeout(()=>{
          setErrorMessage(null);
        },5000);
        setNotes(notes.filter(note=> note.id !== id))
      })

  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <ul>
        {notesToShow.map((note)=>{
          return (
            <li key={uuidv4()} className="note">
              <ListItems 
                data={note} 
                toggleImportance={()=> handleToggleImportance(note.id)}
              />
            </li>
          )
        })}

        <button
          onClick={()=> setShowAll(!showAll)}
        >
         Show {showAll?"Important":"All"}
        </button>

        <form
        onSubmit={addNote}>
          <input 
            value={newNote}
            onChange={addNewNote}
          />
          <button type="submit">Click here to submit</button>
        </form>

      </ul>
     </div>
  )
}

export default App
