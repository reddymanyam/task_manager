import { Box, Button, Checkbox, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const TaskManager: React.FC = () => {

    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<string[]>([]);
    const [editValue, setEditValue] = useState<string>("");

    const today: Date = new Date();

    const handleAddTask = () => {
        if (!task) {
            return alert("Please enter the task");
        }
        setTasks([...tasks, task]);
        setTask("");
    }



    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#90aead", padding: "16px" }}>
            <Paper elevation={8}>
                <Stack spacing={1} sx={{ padding: "20px", maxWidth: "360px" }}>
                    <Typography variant='h5' sx={{ textAlign: "center" }}>Tasks for Today</Typography>
                    <Typography
                        variant='body1'
                        sx={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                        Date:{today.toLocaleDateString()}
                    </Typography>
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
                        tasks.length > 0 ? (tasks.map((task, index) => (
                            <Stack flexDirection="row" justifyContent="space-between">
                                <Stack flexDirection="row" alignItems="center">
                                    <Checkbox />
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            whiteSpace: "normal",
                                            wordBreak:'break-all'
                                        }}
                                    >
                                        {task}
                                    </Typography>
                                </Stack>
                                <Box>
                                    <IconButton aria-label="edit" color="success">
                                        <ModeEditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="error">
                                        <DeleteIcon />
                                    </IconButton>
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