const Header = (props) => <h1>{props.name}</h1>

const Content = (props) => {
  return (
    <div>
      <InnerContent part={props.items[0].name} exercises={props.items[0].exercises}/>
      <InnerContent part={props.items[1].name} exercises={props.items[1].exercises}/>
      <InnerContent part={props.items[2].name} exercises={props.items[2].exercises}/>
    </div>
  )
}

const InnerContent = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Footer = (props) => <p>Number of exercises {props.items[0].exercises + props.items[1].exercises + props.items[2].exercises}</p>


// const Practice = () => {
//   const arr1 = [1,2,3,4]
//   const arr2 = arr1.map(item => item + 1)
//   const [...rest] = arr1;
//   console.log(arr2,rest)
// return (
//   <></>
// )
// }

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
     <Header name={course} />
     <Content items={parts} />
     <Footer items={parts} />
     {/* <Practice /> */}
    </>
  )
}

export default App