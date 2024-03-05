// <Course course={course} />

import Content from "./Content";
import Header from "./Header";
import SumOfExercises from "./SumOfExercises";

const Course = ({course})=>{
    return(
        <>
            <Header name={course.name} />
            <Content contents={course.parts} />
            <SumOfExercises data={course.parts}/>
        </>
    )
}

export default Course;