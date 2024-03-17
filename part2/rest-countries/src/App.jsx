import { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import SingleCountryInfo from './components/SingleCountryInfo';
function App() {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState("")
  const [message, setMessage] = useState(null)
  const [countriesFound,setCountriesFound] = useState([])
  const [oneCountryFound, setOneCountryFound] = useState([])
  // get all countries and put in countries state
  useEffect(()=>{
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response)=>{
        const dataFromRest = response.data;
        const namesOfCountries = dataFromRest.map((object)=>{
          return object.name.common
        })
        setCountries(namesOfCountries);
      })
    },[])
    
    useEffect(()=>{
    },[countries])
    
    // filter action
    useEffect(()=>{
      if(value !== ""){
        const checkInApi = countries.filter(country=> country.toLowerCase().includes(value))
        // console.log(checkInApi)
        if(checkInApi.length >10){
          setMessage("Too Many Matches, Specify Another Filter")
          setCountriesFound([])
        }else{
          setMessage(null);
          let id=0;
          const newCheck = checkInApi.map(item=>{
            return(
              {
                name:item,
                id: id++ 
              }
            )
          })
          setCountriesFound(newCheck);
        }
      }else{
        setMessage(null);
      }
    },[value])
    
    // get specific country
    useEffect(()=>{
      if(countriesFound.length === 1){
        const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"
        const url = `${baseUrl}/${countriesFound[0].name}`;
        axios.get(url)
        .then(response=>{
          const countryInfo = {
            name : response.data.name.common,
            capital: response.data.capital,
            area : response.data.area,
            languages : response.data.languages,
            flags: response.data.flags,
          };
          setOneCountryFound(countryInfo);
        })
      }else{
        setOneCountryFound([]);
    }

  },[countriesFound])


  const handleInputCountry = (e)=>{
    setValue(e.target.value.toLowerCase());
  }

  const handleShow = (id)=>{
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"
    const url = `${baseUrl}/${countriesFound[id].name}`;
    axios.get(url)
    .then(response=>{
      const countryInfo = {
        name : response.data.name.common,
        capital: response.data.capital,
        area : response.data.area,
        languages : response.data.languages,
        flags: response.data.flags,
      };
      setOneCountryFound(countryInfo);
    })
  }

  return (
    <>
      <form>
        Find Countries : <input type="text" value={value} onChange={handleInputCountry}/>
      </form>
      <p>{message}</p>
      <ul>
        {countriesFound.map((country)=>{
          return (
            <li key={uuidv4()}>
              {country.name} <button onClick={()=>handleShow(country.id)}>Show</button>
            </li>
          )
        })}
      </ul>
      
      <SingleCountryInfo data={oneCountryFound}/>
      
    </>
  )
}

export default App
