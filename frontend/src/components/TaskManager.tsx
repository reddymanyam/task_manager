import { Box, Button, Checkbox, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

const TaskManager: React.FC = () => {

    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const today: Date = new Date();

    const handleAddTask = () => {
        if (!task.trim()) {
            return alert("Please enter the task");
        }
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
    };

    const handleEditTask = (id: number) => {
        setIsEditing(id);
        setEditValue(tasks[id].text);
    };

    const handleUpdate = (id: number) => {
        if (!editValue.trim()) {
            return alert("Task cannot be empty");
        }
        const updatedTasks = tasks.map((t, index) =>
            index === id ? { ...t, text: editValue } : t
        );
        setTasks(updatedTasks);
        setIsEditing(null);
        setEditValue("");
    };

    const handleCancel = () => {
        setIsEditing(null);
        setEditValue("");
    };

    const handleDelete = (id: number) => {
        setTasks(tasks.filter((_, index) => index !== id));
    };

    const handleCheckBox = (id: number) => {
        setTasks(tasks.map((t, index) =>
            index === id ? { ...t, completed: !t.completed } : t
        ));
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#90aead", padding: "16px" }}>
            <Paper elevation={8}>
                <Stack spacing={1} sx={{ padding: "20px 14px", maxWidth: "360px" }}>
                    <Typography variant='h5' sx={{ textAlign: "center" }}>Tasks for Today</Typography>
                    <Typography variant='body1' sx={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                        Date: {today.toLocaleDateString()}
                    </Typography>

                    {/* Task Input Field */}
                    <Stack flexDirection="row" gap={1}>
                        <TextField
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder='Add tasks here...!'
                            variant="outlined"
                            size="small"
                        />
                        <Button variant='contained' onClick={handleAddTask}>Task+</Button>
                    </Stack>

                    {/* Task List */}
                    {tasks.length > 0 ? (
                        tasks.map((task, id) => (
                            <Stack key={id} flexDirection="row" justifyContent="space-between">
                                <Stack flexDirection="row" alignItems="center">
                                    <Checkbox 
                                        checked={task.completed} 
                                        onChange={() => handleCheckBox(id)} 
                                    />
                                    {isEditing === id ? (
                                        <TextField
                                            variant="standard"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                    ) : (
                                        <Typography
                                            variant='h6'
                                            sx={{
                                                whiteSpace: "normal",
                                                wordBreak: 'break-word',
                                                fontSize: "20px",
                                                textDecoration: task.completed ? "line-through" : "none",
                                                color: task.completed ? "gray" : "inherit"
                                            }}
                                        >
                                            {task.text}
                                        </Typography>
                                    )}
                                </Stack>
                                <Box>
                                    {isEditing === id ? (
                                        <>
                                            <IconButton color="success" onClick={() => handleUpdate(id)}>
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={handleCancel}>
                                                <ClearIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton color="success" onClick={() => handleEditTask(id)}>
                                                <ModeEditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </Box>
                            </Stack>
                        ))
                    ) : (
                        <Typography variant='h6' sx={{ textAlign: "center", marginTop: "8px" }}>
                            No tasks for today
                        </Typography>
                    )}
                </Stack>
            </Paper>
        </Box>
    );
};

export default TaskManager;
