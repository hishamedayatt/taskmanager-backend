import Task from "./models/Task.js"

const resolvers = {
    Query:{

        getTask: async()=>{
            const tasks = await Task.find()
            return tasks
        },
        // getTasks: async(root,args)=>{
        //     const task = await Task.findById(args.id)
        //     return task
        // },
    },
    Mutation:{
        addTask:async(root,args)=>{
            const newTask = new Task({title:args.title,description:args.description,status:args.status,date:args.date})
            await newTask.save()
            return newTask
        },
        deleteTask:async(root,args)=>{
            await Task.findByIdAndDelete(args.id)
            return "Task deleated"
        },
        updateTask:async(root,args)=>{
            const {id,title,description,status,date} = args;
            const updateTask = {};
            if (title !=undefined){
                updateTask.title=title
            }
            if (description !=undefined){
                updateTask.description=description
            }
            if (status !=undefined){
                updateTask.status=status
            }
            if (date !=undefined){
                updateTask.date=date
            }
            const task = await Task.findByIdAndUpdate(id, updateTask, {new:true})

            return task;

        }
    }
}

export default resolvers
