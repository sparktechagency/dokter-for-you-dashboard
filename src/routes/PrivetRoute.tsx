import React from 'react';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    console.log(authToken);
    if (!authToken) {
      toast.error('You are not authorized to access this. Please login first.');
      navigate('/login', { replace: true, state: { from: location } });
    } else {
      try {
        const decodedToken = jwtDecode(authToken);

        const { role }: { role: string } | any = decodedToken;

        if (
          !role ||
          (role !== 'ADMIN' && role !== 'SUPERADMIN' && role !== 'DOCTOR' && role !== 'PHARMACY' && role !== 'DOCTOR')
        ) {
          toast.error('Access denied. Insufficient permissions.');
          navigate('/login', { replace: true, state: { from: location } });
        }
      } catch (error) {
        toast.error('Invalid token. Please login again.');
        localStorage.removeItem('authToken');
        navigate('/login', { replace: true, state: { from: location } });
      }
    }
  }, [navigate, location]);

  const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken);
      const { role }: { role: string } | any = decodedToken;

      if (role === 'ADMIN' || role === 'SUPERADMIN' || role === 'DOCTOR' || role === 'PHARMACY') {
        return children;
      }
    } catch {}
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
