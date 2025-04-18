import { Box, Button, Checkbox, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';

const TaskManager: React.FC = () => {

    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const today: Date = new Date();

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        const retrivedStoredTasks = storedTasks ? JSON.parse(storedTasks) : [];
        console.log("retrivedStoredTasks....", retrivedStoredTasks);

        if (storedTasks) {
            setTasks(retrivedStoredTasks);
        }

    }, []);

    const handleAddTask = () => {
        if (!task.trim()) {
            return alert("Please enter the task");
        }
        localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
        setTasks([...tasks, task]);
        setTask("");
    }

    const handleEditTask = (id: number) => {
        setIsEditing(id);
        setEditValue(tasks[id]);
    }

    const handleUpdate = (id: number) => {
        if (!editValue.trim()) {
            return alert("Task cannot be empty");
        }
        const updatedTasks = [...tasks];
        updatedTasks[id] = editValue;
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setIsEditing(null);
        setEditValue("");
    }

    const handleCancel = () => {
        setIsEditing(null);
        setEditValue("")
    }

    const handleDelete = (id: number) => {
        const updatedTasks = tasks.filter((_, index) => index !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    }


    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#90aead", padding: "16px" }}>
            <Paper elevation={8}>
                <Stack spacing={1} sx={{ padding: "20px 14px", maxWidth: "360px" }}>
                    <Typography variant='h5' sx={{ textAlign: "center" }}>Tasks for Today</Typography>
                    <Typography
                        variant='body1'
                        sx={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                        Date:{today.toLocaleDateString()}
                    </Typography>

                    {/* Addition of tasks........ */}
                    <Stack flexDirection="row" gap={1}>
                        <TextField
                            id="outlined-basic"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            // label="Task"
                            placeholder='Add tasks here...!'
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: "14px", fontWeight: 700 }} />
                        <Button variant='contained' onClick={handleAddTask}>Task+</Button>
                    </Stack>
                    {
                        tasks.length > 0 ? (tasks.map((task, id) => (
                            <Stack flexDirection="row" justifyContent="space-between">
                                <Stack flexDirection="row" alignItems="center">
                                    <Checkbox />
                                    {
                                        isEditing === id ? (
                                            <TextField
                                                variant="standard"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                sx={{ fontSize: "18px", fontWeight: 700 }}
                                            />

                                        ) :
                                            (
                                                <Typography
                                                    variant='h6'
                                                    sx={{
                                                        whiteSpace: "normal",
                                                        wordBreak: 'break-all',
                                                        fontSize: "20px"
                                                    }}
                                                    key={id}
                                                >
                                                    {task}
                                                </Typography>
                                            )
                                    }

                                </Stack>
                                <Box>
                                    {
                                        isEditing === id ? (
                                            <>
                                                <IconButton aria-label="update" color="success">
                                                    <CheckIcon onClick={() => handleUpdate(id)} />
                                                </IconButton>
                                                <IconButton aria-label="cancle" color="error" >
                                                    <ClearIcon onClick={handleCancel} />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton aria-label="edit" color="success">
                                                    <ModeEditIcon onClick={() => handleEditTask(id)} />
                                                </IconButton>
                                                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )
                                    }
                                </Box>
                            </Stack>

                        ))) : <Typography variant='h6' sx={{ textAlign: "center", marginTop: "8px" }}>
                            No tasks for today</Typography>
                    }
                </Stack>
            </Paper>
        </Box>
    )
}

export default TaskManager;