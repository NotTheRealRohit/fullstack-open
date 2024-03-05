import { v4 as uuidv4 } from 'uuid';
import Part from './Part';

const Content = ({contents})=>{
    return(
        <>
            {contents.map((item)=>{
                return(
                    <Part key={uuidv4()} name={item.name} count={item.exercises} />
                )
            }
            )}
        </>
    )
}

export default Content;