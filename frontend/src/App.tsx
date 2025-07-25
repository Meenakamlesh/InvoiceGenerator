import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';
import { useDispatch, useSelector } from 'react-redux';

// import { loginSuccess } from '../store/authSlice';

import type  { RootState } from './store/store';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductsPage from './pages/AddProductPage';
import ProtectedRoute from './Compoents/ProtectedRoute';


// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('token');
    if (savedToken && !isAuthenticated) {
      // You might want to validate the token with your backend here
      // For now, we'll just restore the auth state
      // dispatch(loginSuccess({ user: savedUser, token: savedToken }));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            token ? <Navigate to="/add-products" replace /> : <LoginPage />
          } 
        />
        <Route 
          path="/register" 
          element={
            token ? <Navigate to="/add-products" replace /> : <RegisterPage />
          } 
        />
        
        {/* Protected Routes */}
        <Route
          path="/add-products"
          element={
            <ProtectedRoute>
              <AddProductsPage />
            </ProtectedRoute>
          }
        />
        
        {/* Default redirect */}
        <Route 
          path="/" 
          element={
            <Navigate to={token ? "/add-products" : "/login"} replace />
          } 
        />
        
        {/* Catch all route */}
        <Route 
          path="*" 
          element={
            <Navigate to={token ? "/add-products" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;