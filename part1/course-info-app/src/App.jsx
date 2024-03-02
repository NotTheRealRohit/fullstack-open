const Header = (props) => <h1>{props.name}</h1>

const Content = (props) => {
  return (
    <div>
      <p>
        {props.items[0].part} {props.items[0].exercises}
      </p>
      <p>
      {props.items[1].part} {props.items[1].exercises}
      </p>
      <p>
      {props.items[2].part} {props.items[2].exercises}
      </p>
    </div>
  )
}

const Footer = (props) => <p>Number of exercises {props.items[0].exercises + props.items[1].exercises + props.items[2].exercises}</p>


const App = () => {
  const course = 'Half Stack application development'
  const partAndExercises = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
     <Header name={course} />
     <Content items={partAndExercises} />
     <Footer items={partAndExercises} />
    </>
  )
}

export default App