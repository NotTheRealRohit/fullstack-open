import { useState } from 'react'

// Components

const Header = ({text,size}) =>{
  if(size === "2"){
    return (
      <h2>{text}</h2>
    )
  }

  return (
    <h1>{text}</h1>
  )
}

const Content = ({anecdote,votes})=>{

  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Buttons = ({onSmashVote,onSmashNext}) =>{
  return (
    <div>
      <button onClick={onSmashVote}>vote</button>
      <button onClick={onSmashNext}>next anecdote</button>
    </div>
  )
}

// Components END


const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(Array(anecdotes.length).fill(0))
  const handleSmashVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const handleSmashNext = () => {
    const selected = Math.floor(Math.random() * anecdotes.length);
    setSelected(selected);
  }
  const maxVoteIndex = votes.indexOf(Math.max(...votes));
  console.log(maxVoteIndex)


  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Content anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Buttons onSmashVote={handleSmashVotes} onSmashNext={handleSmashNext} />
      <Header text="Anecdote with most votes" size="2"/>
      <Content anecdote={anecdotes[maxVoteIndex]} votes={votes[maxVoteIndex]}/>
    </div>
  )
}

export default App