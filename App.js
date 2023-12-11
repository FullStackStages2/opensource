import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const Join = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(true);
  const [cancelMessage, setCancelMessage] = useState('');
  const [cancelMessageColor, setCancelMessageColor] = useState('');

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return emailRegex.test(inputEmail);
  };

  const validatePhone = (inputPhone) => {
    const phoneRegex = /^01\d{8,10}$/;
    return phoneRegex.test(inputPhone);
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    const isValidPassword = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(newPassword);
    setPasswordError(isValidPassword ? '' : '비밀번호는 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자가 최소 하나씩 포함되어야 합니다.');
  };

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
    const isValidPhone = validatePhone(newPhone);
    setPhoneError(isValidPhone ? '' : '유효한 휴대전화번호를 입력하세요.');
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    setIsUsernameAvailable(true);
    
    setIsSignUpButtonDisabled(true);
  };

  const handleCheckUsernameAvailability = () => {
    const isValidLength = username.length >= 4;

    if (isValidLength) {
      
      const isAvailable = true; 
      setIsUsernameAvailable(isAvailable);

      if (!isAvailable) {
        alert('이미 사용 중인 아이디입니다. 다른 아이디를 입력하세요.');
       
        setIsSignUpButtonDisabled(true);
      } else {
       
        setIsSignUpButtonDisabled(false);
      }
    } else {
      setIsUsernameAvailable(false);
     
      setIsSignUpButtonDisabled(true);
    }
  };

  const handleSignUp = () => {
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);

    const isFormValid =
      name !== '' &&
      isUsernameAvailable &&
      password !== '' &&
      confirmPassword === password &&
      isEmailValid &&
      isPhoneValid;

    if (isFormValid && passwordError === '' && phoneError === '') {
      setIsSignUpSuccess(true);
    } else {
      console.log('입력값을 확인하세요.');
    }
  };

  const handleCancel = () => {
    setName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
    setPhone('');
    setPasswordError('');
    setPhoneError('');
    setIsUsernameAvailable(true);
    setIsSignUpSuccess(false);
    setIsSignUpButtonDisabled(true);

   
    setCancelMessage('회원가입이 취소되었습니다.');
    setCancelMessageColor('green');
  };

  const handleCloseModal = () => {
    setIsSignUpSuccess(false);
  };

  useEffect(() => {
    if (isSignUpSuccess) {
      setName('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
      setPhone('');
      setPasswordError('');
      setPhoneError('');
      setIsUsernameAvailable(true);
      setIsSignUpButtonDisabled(true);
    }
  }, [isSignUpSuccess]);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            회원가입
          </Typography>
          <Typography style={{ color: cancelMessageColor }}>{cancelMessage}</Typography>
          <TextField
            label="성명"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                label="아이디"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                required
                error={!isUsernameAvailable}
                helperText={!isUsernameAvailable ? '4자 이상의 아이디를 입력하세요.' : ''}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCheckUsernameAvailability}
                style={{ marginLeft: '8px' }}
              >
                중복 확인
              </Button>
            </Grid>
          </Grid>
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
            autoComplete="current-password password"
            error={passwordError !== ''}
            helperText={passwordError}
          />
          <TextField
            label="비밀번호 확인"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={confirmPassword !== password}
            helperText={confirmPassword !== password ? '비밀번호가 일치하지 않습니다.' : ''}
          />
          <TextField
            label="이메일"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!validateEmail(email)}
            helperText={!validateEmail(email) ? '유효한 이메일을 입력하세요.' : ''}
          />
          <TextField
            label="휴대전화번호"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            required
            error={phoneError !== ''}
            helperText={phoneError}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            disabled={isSignUpButtonDisabled}
          >
            회원가입
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            style={{ marginLeft: '8px' }}
          >
            취소
          </Button>
        </Paper>
      </Grid>

      {/* 회원가입 완료 모달창 */}
      <Dialog open={isSignUpSuccess} onClose={handleCloseModal} PaperProps={{ style: { backgroundColor: '#fff7e0' } }}>
        <DialogTitle style={{ fontWeight: 'bold' }}>회원가입 완료</DialogTitle>
        <DialogContent>
          <Typography>생성한 아이디로 로그인 진행해 주세요 :)</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleCloseModal}>
            로그인하기
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Join;
