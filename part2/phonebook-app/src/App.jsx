import { useState } from 'react'
import Filter from './components/Filter';
import AddNewContact from './components/AddNewContact';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPerson = (filter.length>0)? (persons.filter(person => person.name.toLowerCase().includes(filter))) : persons;

  const addFilter = (e)=>{
    setFilter(e.target.value.toLowerCase())
  }


  const addNewName = (e)=>{
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  const addNewNumber = (e)=>{
    console.log(e.target.value);
    setNewNumber(e.target.value);
  }

  const addPersons = (e)=>{
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person=> person.name === newPerson.name)){
      window.alert(`${newPerson.name} is already added to phonebook`)
    }else{
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }

  }

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Filter Contact</h2>
      <Filter filterValue={filter} onChangeFilter={addFilter}/>

      <h3>Add a new contact</h3> 
      <AddNewContact onFormSubmit={addPersons} inputValue={[newName,newNumber]} onChangeValue={[addNewName,addNewNumber]}/>
     
      <h3>Numbers</h3>
      <Numbers persons={filteredPerson}/>
    </div>
  )
}

export default App