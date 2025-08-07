/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useCreateUser, useUpdateUser, useUser } from '../../hooks/useUsers';
import { useAllRoles } from '../../hooks/useRoles';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { CreateUserRequest, UpdateUserRequest } from '../../types';

interface UserFormData {
  username: string;
  email: string;
  password?: string;
  roleIds: number[];
}

export const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const { data: user, isLoading: userLoading } = useUser(Number(id));
  const { data: roles, isLoading: rolesLoading } = useAllRoles();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UserFormData>();

  const selectedRoleIds = watch('roleIds') || [];

  useEffect(() => {
    if (user && isEdit) {
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('roleIds', user.roles.map(role => role.id));
    }
  }, [user, isEdit, setValue]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEdit && id) {
        const updateData: UpdateUserRequest = {
          username: data.username,
          email: data.email,
          roleIds: data.roleIds,
        };
        if (data.password) {
          updateData.password = data.password;
        }
        await updateUserMutation.mutateAsync({ id: Number(id), data: updateData });
      } else {
        const createData: CreateUserRequest = {
          username: data.username,
          email: data.email,
          password: data.password!,
          roleIds: data.roleIds,
        };
        await createUserMutation.mutateAsync(createData);
      }
      navigate('/users');
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleRoleChange = (roleId: number, checked: boolean) => {
    const currentRoles = selectedRoleIds;
    if (checked) {
      setValue('roleIds', [...currentRoles, roleId]);
    } else {
      setValue('roleIds', currentRoles.filter(id => id !== roleId));
    }
  };

  if (userLoading || rolesLoading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  const isLoading = createUserMutation.isPending || updateUserMutation.isPending;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/users')}
          className="text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">
          {isEdit ? 'Edit User' : 'Create User'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Username"
              {...register('username', { required: 'Username is required' })}
              error={errors.username?.message}
            />

            <Input
              label="Email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />
          </div>

          <Input
            label={isEdit ? "Password (leave blank to keep current)" : "Password"}
            type="password"
            {...register('password', { 
              required: !isEdit ? 'Password is required' : false,
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={errors.password?.message}
          />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-200">Roles</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles?.map((role) => (
                <label key={role.id} className="flex items-center space-x-3 p-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRoleIds.includes(role.id)}
                    onChange={(e) => handleRoleChange(role.id, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-200">{role.name}</span>
                    {role.description && (
                      <p className="text-xs text-gray-400 mt-1">{role.description}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/users')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isLoading}>
              {isEdit ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};