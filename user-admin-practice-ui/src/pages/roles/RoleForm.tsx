import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useCreateRole, useUpdateRole, useRole, usePermissions } from '../../hooks/useRoles';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { CreateRoleRequest, UpdateRoleRequest } from '../../types';

interface RoleFormData {
  name: string;
  description?: string;
  permissionIds: number[];
}

export const RoleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const { data: role, isLoading: roleLoading } = useRole(Number(id));
  const { data: permissions, isLoading: permissionsLoading } = usePermissions();
  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RoleFormData>();

  const selectedPermissionIds = watch('permissionIds') || [];

  useEffect(() => {
    if (role && isEdit) {
      setValue('name', role.name);
      setValue('description', role.description || '');
      setValue('permissionIds', role.permissions.map(permission => permission.id));
    }
  }, [role, isEdit, setValue]);

  const onSubmit = async (data: RoleFormData) => {
    try {
      if (isEdit && id) {
        const updateData: UpdateRoleRequest = {
          name: data.name,
          description: data.description,
          permissionIds: data.permissionIds,
        };
        await updateRoleMutation.mutateAsync({ id: Number(id), data: updateData });
      } else {
        const createData: CreateRoleRequest = {
          name: data.name,
          description: data.description,
          permissionIds: data.permissionIds,
        };
        await createRoleMutation.mutateAsync(createData);
      }
      navigate('/roles');
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    const currentPermissions = selectedPermissionIds;
    if (checked) {
      setValue('permissionIds', [...currentPermissions, permissionId]);
    } else {
      setValue('permissionIds', currentPermissions.filter(id => id !== permissionId));
    }
  };

  if (roleLoading || permissionsLoading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  const isLoading = createRoleMutation.isPending || updateRoleMutation.isPending;

  // Group permissions by resource for better UX
  const permissionsByResource = (permissions || []).reduce((acc, permission) => {
    if (!acc[permission.resource]) {
      acc[permission.resource] = [];
    }
    acc[permission.resource].push(permission);
    return acc;
  }, {} as Record<string, typeof permissions>);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/roles')}
          className="text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Roles
        </Button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">
          {isEdit ? 'Edit Role' : 'Create Role'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Role Name"
            {...register('name', { required: 'Role name is required' })}
            error={errors.name?.message}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-200">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Describe the role's purpose and responsibilities"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-200">Permissions</label>
            {Object.entries(permissionsByResource).map(([resource, resourcePermissions]) => (
              <div key={resource} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300 capitalize">{resource}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-4">
                  {resourcePermissions.map((permission) => (
                    <label key={permission.id} className="flex items-center space-x-3 p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissionIds.includes(permission.id)}
                        onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-200">{permission.name}</span>
                        {permission.description && (
                          <p className="text-xs text-gray-400 mt-1">{permission.description}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/roles')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isLoading}>
              {isEdit ? 'Update Role' : 'Create Role'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};