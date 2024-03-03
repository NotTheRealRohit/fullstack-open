import { useState } from 'react'

// Component section start

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onSmash, text}) => <button onClick={onSmash}>{text}</button>

const StatisticTitle = ({text}) => <h2>{text}</h2>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>
// Component section end



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const data = {
    headerText:"Give feedback",
    statisticTitle: "Statistics",
    button:[
      {
        text:"good",
        handleSmash: () => setGood(good + 1)
      },
      {
        text:"neutral",
        handleSmash: () => setNeutral(neutral + 1)
      },
      {
        text:"bad",
        handleSmash: () => setBad(bad + 1)
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
      }
    ]
  }


  return (
    <div>
      <Header text={data.headerText}/>
      <Button onSmash={data.button[0].handleSmash} text={data.button[0].text}/>
      <Button onSmash={data.button[1].handleSmash} text={data.button[1].text}/>
      <Button onSmash={data.button[2].handleSmash} text={data.button[2].text}/>
      <StatisticTitle text={data.statisticTitle}/>
      <StatisticLine text={data.statistics[0].text} value={data.statistics[0].value}/>
      <StatisticLine text={data.statistics[1].text} value={data.statistics[1].value}/>
      <StatisticLine text={data.statistics[2].text} value={data.statistics[2].value}/>
    </div>
  )
}

export default App