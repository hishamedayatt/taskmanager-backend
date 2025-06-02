import gql from "graphql-tag"

const typeDefs = gql`
scalar Date
type Task{
    id:ID
    title:String
    description:String
    status:String
    date:Date
}

type Query{
    getTask:[Task]
    getTasks(id:ID):Task
    
}
type Mutation{
    addTask(title:String,description:String,status:String,date:Date):Task
    deleteTask(id:ID):String
    updateTask(id:ID,title:String,description:String,status:String,date:Date):Task
}`

export default typeDefs