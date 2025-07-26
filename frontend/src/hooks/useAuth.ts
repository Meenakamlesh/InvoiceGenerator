import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api'
import { loginSuccess, logout } from '../store/authSlice';
import type { AuthResponse, ApiError } from '../types';


interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<AuthResponse, ApiError, LoginData>({
    mutationFn: async (data) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate('/add-products');
    },
  });
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<AuthResponse, ApiError, RegisterData>({
    mutationFn: async (data) => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate('/add-products');
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    dispatch(logout());
    queryClient.clear();
    navigate('/login');
  };
};