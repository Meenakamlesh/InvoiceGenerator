import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, LogOut, ArrowUp, ArrowDown } from 'lucide-react';
import type { RootState } from '../store/store';
import { addProduct, removeProduct } from '../store/invoiceSlice';
import { useLogout } from '../hooks/useAuth';
import { useCreateInvoice, useGeneratePDF } from '../hooks/useInvoice';
import Button from '../Compoents/ui/Button'
import Input from '../Compoents/ui/Input';

const AddProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const logout = useLogout();
  const { products, currentInvoiceId } = useSelector((state: RootState) => state.invoice);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const createInvoiceMutation = useCreateInvoice();
  const generatePDFMutation = useGeneratePDF();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    dispatch(addProduct({
      name: formData.name.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    }));
    
    
    setFormData({ name: '', price: '', quantity: '' });
  };
  console.log(handleAddProduct);

  const handleRemoveProduct = (index: number) => {
    dispatch(removeProduct(index));
  };

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const handleGenerateInvoice = () => {
    if (products.length === 0) {
      alert('Please add at least one product');
      return;
    }
    createInvoiceMutation.mutate({ products });
  };
  console.log(handleGenerateInvoice);
  
  
  
  const handleGeneratePDF = () => {
    if (currentInvoiceId) {
      generatePDFMutation.mutate(currentInvoiceId);
    }
  };
  console.log(handleGeneratePDF);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded"></div>
            </div>
            <span className="text-white text-xl font-semibold">levitation</span>
            <span className="text-gray-400 text-sm">infotech</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {user?.name}</span>
            <Button
              onClick={logout}
              variant="outline"
              className="border-white/20 text-black hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Add Products Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-2">Add Products</h1>
          <p className="text-gray-300 mb-8">
            This is basic login page which is used for levitation assignment purpose.
          </p>

          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Product Name
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Enter the product name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                className="bg-black/20 border-white/30 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Product Price
              </label>
              <Input
                type="number"
                name="price"
                placeholder="Enter the price"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                className="bg-black/20 border-white/30 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Quantity
              </label>
              <Input
                type="number"
                name="quantity"
                placeholder="Enter the Qty"
                value={formData.quantity}
                onChange={handleChange}
                error={errors.quantity}
                className="bg-black/20 border-white/30 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </form>
        </div>

        {/* Products Table */}
        {products.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-medium">
                      <div className="flex items-center space-x-2">
                        <span>Product name</span>
                        <ArrowUp className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-white font-medium">Price</th>
                    <th className="px-6 py-4 text-left text-white font-medium">
                      <div className="flex items-center space-x-2">
                        <span>Quantity</span>
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-white font-medium">Total Price</th>
                    <th className="px-6 py-4 text-left text-white font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="border-t border-white/10">
                      <td className="px-6 py-4 text-gray-300">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        ₹{product.price * product.quantity}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          onClick={() => handleRemoveProduct(index)}
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-400 hover:bg-red-500/10"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Summary Rows */}
                  <tr className="border-t border-white/20 bg-black/10">
                    <td colSpan={3} className="px-6 py-4 text-right text-gray-300 font-medium">
                      Sub-Total
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      ₹{calculateSubtotal().toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                  
                  <tr className="border-t border-white/10 bg-black/10">
                    <td colSpan={3} className="px-6 py-4 text-right text-gray-300 font-medium">
                      Incl + GST 18%
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      ₹{calculateGST().toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                  
                  <tr className="border-t border-white/20 bg-black/20">
                    <td colSpan={3} className="px-6 py-4 text-right text-white font-bold">
                      Total Amount
                    </td>
                    <td className="px-6 py-4 text-white font-bold">
                      ₹{calculateTotal().toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Generate Invoice Button */}
        {products.length > 0 && (
          <div className="text-center space-y-4">
            
            <Button
              onClick={handleGenerateInvoice}
              disabled={createInvoiceMutation.isPending}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-3"
            >
              {createInvoiceMutation.isPending ? 'Refreshing...' : 'Refresh the PDF Invoice'}
            </Button>
            
            
            {currentInvoiceId && (
              <div className="mt-4">
                <p className="text-green-400 mb-2">Invoice created successfully!</p>
                <Button
                  onClick={handleGeneratePDF}
                  disabled={generatePDFMutation.isPending}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3"
                >
                  {generatePDFMutation.isPending ? 'Downloading...' : 'Download PDF'}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl text-white font-semibold mb-2">No Products Added</h3>
            <p className="text-gray-400">Add your first product to get started with invoice generation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductsPage;