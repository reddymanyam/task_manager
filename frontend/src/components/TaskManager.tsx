import {
    Box,
    Button,
    Checkbox,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import ModeEditIcon from "@mui/icons-material/ModeEdit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import ClearIcon from "@mui/icons-material/Clear";
  import CheckIcon from "@mui/icons-material/Check";
  import { useEffect, useState } from "react";
  
  const TaskManager: React.FC = () => {
    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");
  
    const today: Date = new Date();
  
    useEffect(() => {
      const storedTasks = localStorage.getItem("tasks");
      const retrivedStoredTasks = storedTasks ? JSON.parse(storedTasks) : [];
      if (storedTasks) setTasks(retrivedStoredTasks);
    }, []);
  
    const handleAddTask = () => {
      if (!task.trim()) return alert("Please enter the task");
      const updated = [...tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updated));
      setTasks(updated);
      setTask("");
    };
  
    const handleEditTask = (id: number) => {
      setIsEditing(id);
      setEditValue(tasks[id]);
    };
  
    const handleUpdate = (id: number) => {
      if (!editValue.trim()) return alert("Task cannot be empty");
      const updatedTasks = [...tasks];
      updatedTasks[id] = editValue;
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setIsEditing(null);
      setEditValue("");
    };
  
    const handleCancel = () => {
      setIsEditing(null);
      setEditValue("");
    };
  
    const handleDelete = (id: number) => {
      const updated = tasks.filter((_, index) => index !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      setTasks(updated);
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          background: "linear-gradient(to right, #c33764, #1d2671)",
          p: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            backdropFilter: "blur(8px)",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 4,
            p: 4,
            mt: 4,
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h4" textAlign="center" color="#fff" fontWeight="bold">
              📝 Task Manager
            </Typography>
  
            <Typography variant="body1" color="#ddd" textAlign="center">
              📅 {today.toDateString()}
            </Typography>
  
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="What needs to be done?"
                size="small"
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                }}
              />
              <Button
                onClick={handleAddTask}
                sx={{
                  background: "linear-gradient(45deg, #11998e, #38ef7d)",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  px: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    background: "linear-gradient(45deg, #0f8c81, #2edb70)",
                  },
                }}
              >
                Add
              </Button>
            </Stack>
  
            {tasks.length > 0 ? (
              tasks.map((task, id) => (
                <Paper
                  key={id}
                  elevation={3}
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
                    <Checkbox />
                    {isEditing === id ? (
                      <TextField
                        value={editValue}
                        variant="standard"
                        fullWidth
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      <Typography
                        sx={{
                          wordBreak: "break-word",
                          fontWeight: 500,
                          fontSize: "16px",
                        }}
                      >
                        {task}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    {isEditing === id ? (
                      <>
                        <IconButton onClick={() => handleUpdate(id)} color="success">
                          <CheckIcon />
                        </IconButton>
                        <IconButton onClick={handleCancel} color="error">
                          <ClearIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEditTask(id)} color="primary">
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </Stack>
                </Paper>
              ))
            ) : (
              <Typography variant="body1" color="#fff" textAlign="center">
                No tasks yet. Add one!
              </Typography>
            )}
          </Stack>
        </Paper>
      </Box>
    );
  };
  
  export default TaskManager;
  