import { useState } from 'react'

// Component section start

const Header = ({text}) => <h1>{text}</h1>

const Buttons = ({data}) =>{
  return (
    <div>
      {data.map((item,index) => (
        <Button key={index} onSmash={item.handleSmash} text={item.text}/>
      ))}
    </div>
  )
}

const Button = ({onSmash, text}) => <button onClick={onSmash}>{text}</button>

const StatisticTitle = ({text}) => <h2>{text}</h2>

const Statistics = ({allInfo,data}) => {
  if(allInfo === 0){
    return <p>No feedback given</p>
  }
  
  return (
          <table>
            <tbody>
            {data.map((item,index) => (
              <tr key={index}>
                <StatisticLine text={item.text} value={item.value}/>
              </tr>
            )
            )}
            </tbody>
          </table>                
  )
}


const StatisticLine = ({text, value}) => {
  if(text === "positive"){
    return (
      <>
        <td>{text}</td>
        <td>{value} %</td>
      </>
    )
  }

  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>

)};
// Component section end



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleSmashGood = () => {
    const updateGood = good + 1;
    const updateAll = updateGood + neutral + bad;
    setGood(updateGood)
    setAll(updateAll)
    updateAverage(updateGood,bad,updateAll);
    updatePositive(updateGood,updateAll);
  }
  
  const handleSmashNeutral = () => {
    const updateNeutral = neutral + 1;
    const updateAll = good + updateNeutral + bad;
    setNeutral(updateNeutral)
    setAll(updateAll)
    updateAverage(good,bad,updateAll);
    updatePositive(good,updateAll);
  }
  
  const handleSmashBad = () => {
    const updateBad = bad + 1;
    const updateAll = good + neutral + updateBad;
    setBad(updateBad)
    setAll(updateAll)
    updateAverage(good,updateBad,updateAll);
    updatePositive(good,updateAll);
  }

  const updateAverage = (updateGood, updateBad, updateAll) => {
    setAverage((updateGood - updateBad) / updateAll);
  }

  const updatePositive = (updateGood,updateAll) => {
    setPositive((updateGood / updateAll) * 100);
  }


  
  const data = {
    headerText:"Give feedback",
    statisticTitle: "Statistics",
    statisticComment: "No feedback given",
    button:[
      {
        text:"good",
        handleSmash: handleSmashGood
      },
      {
        text:"neutral",
        handleSmash: handleSmashNeutral
      },
      {
        text:"bad",
        handleSmash: handleSmashBad
      }
    ],
    statistics: [
      {
        text: "good",
        value: good
      },
      {
        text: "neutral",
        value: neutral
      },
      {
        text: "bad",
        value: bad
      },
      {
        text: "all",
        value: all
      },
      {
        text: "average",
        value: average
      },
      {
        text: "positive",
        value: positive
      }
    ]
  }

  return (
    <div>
      <Header text={data.headerText}/>
      <Buttons data={data.button}/>
      <StatisticTitle text={data.statisticTitle}/>
      <Statistics allInfo={all} data={data.statistics}/>
    </div>
  )
}

export default App