import express from 'express';
import { connection } from '../app.mjs'

const route = express();

route.get('/tasks', (req, res) => {
    res.json({
        task1: 'Strategic Planning: Evaluating and adjusting business plans',
        task2: 'Team Management: Meetings and coordination with employees',
        task3: 'Financial Oversight: Reviewing cash flow and expenses',
        task4: 'Client Relations: Handling customer service and negotiations',
        task5: 'Market Analysis: Monitoring trends and competition'
    });
});

route.post('/tasks', (req, res) => {
    const task = req.body.task;
    if (task) {
        const query = 'INSERT INTO task_manager.task (title) VALUES (?)';
        connection.query(query, [task], (err, results) => {
            if (err) {
                return res.status(500).send('Error adding task');
            }
            res.status(201).json({ id: results.insertId, title: task });
        });
    } else {
        res.status(400).send('Task is required');
    }
});


route.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body.task;
    const query = 'UPDATE task_manager.task SET title = ? WHERE id = ?';
    connection.query(query, [updatedTask, taskId], (err, results) => {
        if (err) {
            return res.status(500).send('Error updating task');
        }
        res.send(`Task with ID ${taskId} updated to: ${updatedTask}`);
    });
});

route.delete('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const queryDelete = 'DELETE FROM task_manager.task WHERE id = ?';
    connection.query(queryDelete, [taskId], (err, results) => {
        if (err) {
            return res.status(500).send('Error deleting task');
        }
        res.send(`Task ${taskId} has been deleted`);
    });
});

route.patch('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body.task;

    if (!updatedTask) {
        return res.status(400).send('Task is required');
    }

    const query = 'UPDATE task_manager.task SET title = ? WHERE id = ?';
    connection.query(query, [updatedTask, taskId], (err, results) => {
        if (err) {
            return res.status(500).send('Error updating task');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Task not found');
        }
        res.send(`Task with ID ${taskId} updated to: ${updatedTask}`);
    });
});



export default route;