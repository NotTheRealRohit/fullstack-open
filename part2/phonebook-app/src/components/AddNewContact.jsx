const AddNewContact = ({onFormSubmit, inputValue, onChangeValue})=>{
    return (
        <form onSubmit={onFormSubmit}>
        <div>
          name: <input 
                value={inputValue[0]}
                onChange={onChangeValue[0]}/>
        </div>
        <div>
          number: <input 
                value={inputValue[1]}
                onChange={onChangeValue[1]}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default AddNewContact;