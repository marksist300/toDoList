const { default: mongoose } = require('mongoose');
const Todo = require('../models/todosModels')
const User = require('..//models/userModels');
const { findById } = require('../models/todosModels');


// get all todos
const getAllTodos = async (req,res)=>{
    try {
        const user_id = req.user._id;
        const followingList = await User.findOne({ _id: user_id })
        .then(data=> data.following.map(friendId=> friendId))
        console.log(...followingList)
        const todos = await Todo.find({ $or:[ {user_id:user_id}, {user_id: followingList }]}).sort({completed: 1 ,toFinishBy: 1,  createdAt: -1});
        // const followingTodos = await Promise.all(
        //         followingList.map((friendId)=> {
        //             return Todo.find({ user_id: friendId}).sort({completed: 1 ,toFinishBy: 1,  createdAt: 1})
        //         })
        //     );
        // const allTodos = Promise.all([])
        // res.status(200).json(todos.concat(...followingTodos))

            res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// const getAllTodos = async (req,res)=>{
//     try {
//         const currentUser = req.user._id;

//         const todos = await Todo.find({ user_id: currentUser }).sort({completed: 1 ,toFinishBy: 1,  createdAt: 1});
//         const followingTodos = await Promise.all(
//             currentUser.following.map((friendId)=> {
//                 return Todo.find({ userid: friendId})
//             })
//         );
//         res.status(200).json(todos.concat(...followingTodos))
//     } catch (error) {
//         console.log('problem with get all todos')
//         res.status(500).json({error: error.message})
//     }
// }

// get single todo
const getTodo = async (req,res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such todo exists'})
        }
        const todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).json({error: 'No such todo found'})
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// create new todo
const createTodo = async (req,res)=>{
    const { title, description, toFinishBy, completed} = req.body;

    let emptyFields = [];

    if(!title){
        emptyFields.push('Title')
    }
    if(!description){
        emptyFields.push('Description')
    }
    if(emptyFields.length> 0) {
        return res.status(400).json({error: 'Please make sure all Todos have Title and Description', emptyFields})
    }

    try {
        const user_id = req.user._id;
        const todo = await Todo.create({title, description, toFinishBy, completed, user_id})
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
// delete todo
const deleteTodo = async (req,res)=>{
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such todo exists'})
        }
        const todo = await Todo.findOneAndDelete({_id: id})
        if(!todo){
            return res.status(400).json({error: 'no such todo found to delete'})
        }   
        res.status(200).json(todo);    
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}
// update todo
const updateTodo = async (req,res)=>{
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such todo exists'})
        }
        const todo = await Todo.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        if(!todo){
            return res.status(400).json({error: 'no such todo found to update'})

        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = { getAllTodos, getTodo, createTodo, deleteTodo, updateTodo }


