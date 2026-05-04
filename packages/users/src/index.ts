import { apiClient } from '@repo/api-client';
import type { User } from '@repo/types';

export const UsersService = {
  getUsers: () => apiClient.get<User[]>('/users'),
  getUserById: (id: string) => apiClient.get<User>(`/users/${id}`),
  createUser: (data: Partial<User>) => apiClient.post<User>('/users', data),
  updateUser: (id: string, data: Partial<User>) => apiClient.put<User>(`/users/${id}`, data),
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
  updateUserRole: (id: string, role: string) => apiClient.patch<User>(`/users/${id}/role`, { role }),
  updateUserStatus: (id: string, status: string) => apiClient.patch<User>(`/users/${id}/status`, { status })
};

export const hasPermission = (user: User | null, requiredRole: string | string[]) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(user.role);
};
