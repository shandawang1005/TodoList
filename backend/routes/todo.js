import express from "express"
import { Todo } from "../models/todo.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    }
    catch {
        res.status(500).json({ error: error.message })
    }
})





router.post("/", async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title
        })
        const savedTodo = await newTodo.save()
        res.status(201).json(savedTodo)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.patch("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        )
        res.json(updatedTodo)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

})

router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(
            req.params.id
        )
        res.status(204).send()
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})
export default router