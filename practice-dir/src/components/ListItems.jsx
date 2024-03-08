const ListItems = ({data,toggleImportance})=>{
    const label = data.important ? "make not important" : "make important"
    return(
        <>
            {data.content}  
            <button 
                onClick={toggleImportance}
            >{label}</button>    
        </>

    )
}

export default ListItems;