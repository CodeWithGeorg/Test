import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../routes/constants';
import LoadingButton from '../components/LoadingButton';
import Input from '../components/Input';
import { useToast } from '../components/Toast';
import { validateField } from '../utils/validation';

/**
 * Profile Page
 * User profile management page
 */
export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate field on change
    const fieldErrors = validateField(value, getValidationRules(name));
    if (fieldErrors.length > 0) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[0] }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const fieldErrors = validateField(value, getValidationRules(name));
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[0] }));
  };

  const getValidationRules = (fieldName) => {
    const rules = {
      name: { required: true, minLength: 2, maxLength: 50 },
      email: { required: true, email: true },
      phone: { phone: true },
    };
    return rules[fieldName] || {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let isValid = true;
    
    for (const field in formData) {
      const fieldErrors = validateField(formData[field], getValidationRules(field));
      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors[0];
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true });
    
    if (!isValid) return;

    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6">
        <p className="text-center text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          required
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          required
        />
        
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
        />
        
        <div className="flex gap-4">
          <LoadingButton
            type="submit"
            loading={loading}
            variant="primary"
          >
            Save Changes
          </LoadingButton>
          
          <LoadingButton
            type="button"
            onClick={handleLogout}
            variant="danger"
          >
            Logout
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
