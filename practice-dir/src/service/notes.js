import axios from 'axios';

// const baseUrl = "http://localhost:3001/api/notes";
const baseUrl = "/api/notes";

const getAll = () =>{
    const dummyNote ={
        id: 10000,
        content: "Non existent quote",
        important:true
    }
    return axios.get(baseUrl).then((response)=> response.data.concat(dummyNote));
}

const create = (noteObj) =>{
    const post = axios.post(baseUrl,noteObj);
    return post.then((response)=> response.data);
}

const update = (newNote,id)=>{
    const put = axios.put(`${baseUrl}/${id}`,newNote);
    return put.then((response)=> response.data);
}

export default { getAll, create, update }