const Filter = ({filterValue, onChangeFilter})=>{
    return(
        <input 
        value={filterValue}
        onChange={onChangeFilter}
        ></input>
    )
}

export default Filter;