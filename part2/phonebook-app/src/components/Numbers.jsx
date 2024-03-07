import Person from './Person';
const Numbers = ({person,onSmashDelete})=>{
    return(
            <Person name={person.name} 
                number={person.number} 
                onDelete={onSmashDelete}/>      
        )
}

export default Numbers;