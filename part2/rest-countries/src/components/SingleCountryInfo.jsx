import { v4 as uuidv4 } from 'uuid';
const SingleCountryInfo = ({data})=>{
    if(data.length<1) {return null;}

    const languagesArray = Object.entries(data.languages);
    const language = languagesArray.map(([key,value])=> value);

    return(
        <>
            <h1>{data.name}</h1>
            <p>Capital : {data.capital}</p>
            <p>Area : {data.area}</p>
            <h3>Languages:</h3>
            <ul>
                {language.map(lang=>{
                    return(
                        <li key={uuidv4()}>
                            {lang}
                        </li>
                    )
                })}
            </ul>
            <img src={data.flags.png} alt={data.flags.alt} />

        </>
    )
}

export default SingleCountryInfo;