import './style.css';
import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import AddNewContact from './components/AddNewContact';
import Numbers from './components/Numbers';
import personService from './service/person';
import { v4 as uuidv4 } from 'uuid';
import Message from './components/Message';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null);
  const [styleMessage, setStyleMessage] = useState("");
  useEffect(()=>{
    personService.getAll()
      .then(initialData=> setPersons(initialData))
  },[]);

  const filteredPerson = (filter.length>0)? (persons.filter(person => person.name.toLowerCase().includes(filter))) : persons;
  console.log("filter",filteredPerson)
  const addFilter = (e)=>{
    setFilter(e.target.value.toLowerCase())
  }


  const addNewName = (e)=>{
    setNewName(e.target.value);
  }

  const addNewNumber = (e)=>{
    setNewNumber(e.target.value);
  }

  const addPersons = (e)=>{
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person=> person.name === newPerson.name && person.number === newPerson.number)){
      window.alert(`${newPerson.name} is already added to phonebook`)
    }else if(persons.some(person=> person.name === newPerson.name)){
      if(!window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`) )
        return ;
      replaceNumber(newPerson);
    }
    else{

      personService.create(newPerson)
        .then(createdPerson=>{
          setPersons(persons.concat(createdPerson));
          createMessage(`Added ${createdPerson.name}`,"messagePop");
        }).catch(error=>{
          createMessage(error.response.data.error,"messagePopError");
          
        })
        
      }
      setNewName('');
      setNewNumber('');

  }

  const createMessage = (addMessage,styleMessage)=>{
    setMessage(addMessage);
    setStyleMessage(styleMessage);
    const timeOut = (styleMessage === "messagePopError")? 4500 : 2000;
    setTimeout(()=>{
      setMessage(null);
      setStyleMessage("");
    },timeOut);
  }

  const replaceNumber = (newPerson)=>{
    console.log(newPerson);
    const personFromState = persons.filter(person=> person.name === newPerson.name)[0];
    const updatePerson = {...personFromState, number:newPerson.number};
    console.log(personFromState,updatePerson);
    personService.update(personFromState.id,updatePerson)
      .then(data=> {
        setPersons(persons.map(person=> person.id !== data.id ? person : data))
        createMessage(`Replaced Number for ${data.name}`,"messagePop");
      }).catch(error=>{
        createMessage(error.response.data.error,"messagePopError");
      });
    
  }

  const handleDelete = (item)=>{
     console.log("Deleting",item.id);

     if(!window.confirm(`Delete ${item.name}`))
      return;

     personService.deletePerson(item.id)
     .then(data=> {
      setPersons(persons.filter(person=> person.id !== item.id))
      createMessage(`Deleted ${item.name}`,"messagePopDelete");
     }).catch(error=>{
        createMessage(`Already deleted ${item.name}`,"messagePopError");
        setPersons(persons.filter(person=> person.id !== item.id));
     })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={message} styleClass={styleMessage}/>
      <h2>Filter Contact</h2>
      <Filter filterValue={filter} onChangeFilter={addFilter}/>

      <h3>Add a new contact</h3> 
      <AddNewContact onFormSubmit={addPersons} inputValue={[newName,newNumber]} onChangeValue={[addNewName,addNewNumber]}/>
     
      <h3>Numbers</h3>
      {filteredPerson.map(person => <Numbers key={uuidv4()} person={person} onSmashDelete={()=> handleDelete(person)}/>)}
    </div>
  )
}

export default App