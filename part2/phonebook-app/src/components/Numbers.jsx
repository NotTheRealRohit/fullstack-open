import { v4 as uuidv4 } from 'uuid';
import Person from './Person';
const Numbers = ({persons})=>{
    return (
        <>
            {persons.map(person=>{
        return (
          <Person key={uuidv4()} name={person.name} number={person.number}/>  
        )
      })}
        </>
    )
}

export default Numbers;