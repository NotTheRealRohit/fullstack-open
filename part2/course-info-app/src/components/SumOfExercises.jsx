
const SumOfExercises = ({data})=>{
   const total = data.reduce((sum,item)=>{
    return sum+item.exercises
   },0)
    return (
        <h3>total of {total} execrises</h3>
    )
}

export default SumOfExercises;