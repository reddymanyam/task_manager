import {
    Box,
    Button,
    Card,
    CardContent,
    Tab,
    Tabs,
    TextField,
    Typography,
    InputAdornment,
    Stack
  } from '@mui/material';
  import { Email, Lock, AccountCircle } from '@mui/icons-material';
  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
  
    const [userSignupDetails, setUserSignupDetails] = useState({
      userName: '',
      emailId: '',
      password: ''
    });
  
    const [userLoginDetails, setUserLoginDetails] = useState({
      emailId: '',
      password: ''
    });
  
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    };
  
    const handleSignup = () => {
      localStorage.setItem('user', JSON.stringify(userSignupDetails));
      alert('User signed up successfully!');
      setUserSignupDetails({ userName: '', emailId: '', password: '' });
    };
  
    const handleLogin = () => {
      const userData = localStorage.getItem('user');
      if (!userData) {
        alert('No user found, please signup first');
        return;
      }
      const retrievedUserData = JSON.parse(userData);
      if (
        retrievedUserData.emailId === userLoginDetails.emailId &&
        retrievedUserData.password === userLoginDetails.password
      ) {
        alert('Login successful!');
        navigate('/dashboard');
        setUserLoginDetails({ emailId: '', password: '' });
      } else {
        alert('Invalid credentials');
      }
    };
  
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: 'linear-gradient(to right, #00c6ff, #0072ff)',
          px: 2
        }}
      >
        <Card
          sx={{
            width: 400,
            backdropFilter: 'blur(12px)',
            background: 'rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            borderRadius: 4,
            color: '#fff'
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
  
          <CardContent>
            <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
              {tabIndex === 0 ? 'Welcome Back!' : 'Create an Account'}
            </Typography>
  
            <Stack spacing={2} mt={2}>
              {/* Sign Up Fields */}
              {tabIndex === 1 && (
                <TextField
                  label="Username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                  value={userSignupDetails.userName}
                  onChange={(e) =>
                    setUserSignupDetails({ ...userSignupDetails, userName: e.target.value })
                  }
                />
              )}
  
              <TextField
                label="Email"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
                value={
                  tabIndex === 0 ? userLoginDetails.emailId : userSignupDetails.emailId
                }
                onChange={(e) =>
                  tabIndex === 0
                    ? setUserLoginDetails({ ...userLoginDetails, emailId: e.target.value })
                    : setUserSignupDetails({ ...userSignupDetails, emailId: e.target.value })
                }
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  )
                }}
                value={
                  tabIndex === 0 ? userLoginDetails.password : userSignupDetails.password
                }
                onChange={(e) =>
                  tabIndex === 0
                    ? setUserLoginDetails({ ...userLoginDetails, password: e.target.value })
                    : setUserSignupDetails({ ...userSignupDetails, password: e.target.value })
                }
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  color: '#0072ff',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#f0f0f0'
                  }
                }}
                onClick={tabIndex === 0 ? handleLogin : handleSignup}
              >
                {tabIndex === 0 ? 'Login' : 'Sign Up'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  };
  
  export default Auth;
  