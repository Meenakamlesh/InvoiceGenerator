import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import api from '../utils/api';
import { setCurrentInvoiceId, clearProducts } from '../store/invoiceSlice';
import type  { Product, Invoice, ApiError } from '../types';

interface CreateInvoiceData {
  products: Product[];
}

export const useCreateInvoice = () => {
  const dispatch = useDispatch();

  return useMutation<{ invoice: Invoice }, ApiError, CreateInvoiceData>({
    mutationFn: async (data) => {
      const response = await api.post('/invoices', data);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setCurrentInvoiceId(data.invoice._id));
      dispatch(clearProducts());
    },
  });
};

// export const useGeneratePDF = () => {
//   return useMutation<Blob, ApiError, string>({
//     mutationFn: async (invoiceId) => {
//       const response = await api.get(`/invoices/${invoiceId}/pdf`, {
//         responseType: 'blob',
//       });
   
      
//       return response.data;
//     },
//     onSuccess: (data, invoiceId) => {
//       const url = window.URL.createObjectURL(new Blob([data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `invoice-${invoiceId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     },
//   });
// };

export const useGeneratePDF = () => {
  return useMutation<Blob, ApiError, string>({
    mutationFn: async (invoiceId) => {
      const response = await api.get(`/invoices/${invoiceId}/pdf`, {
        responseType: 'blob',
      
      });
      return response.data;
    },
    onSuccess: (data, invoiceId) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      

    },
    onError: (error) => {
      console.error('PDF download failed:', error);
      alert('Failed to generate PDF. Please check server logs.');
    }
  });
};
