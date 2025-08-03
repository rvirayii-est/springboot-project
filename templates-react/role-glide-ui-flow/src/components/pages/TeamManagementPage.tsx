
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, UserPlus, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { TeamMemberDialog } from '@/components/dialogs/TeamMemberDialog';
import { useToast } from '@/hooks/use-toast';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  phone?: string;
  avatar?: string;
}

// Mock data for demonstration
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'manager',
    department: 'Engineering',
    status: 'active',
    joinDate: '2023-01-15',
    phone: '+1 (555) 123-4567',
    avatar: 'SC'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'contributor',
    department: 'Marketing',
    status: 'active',
    joinDate: '2023-03-22',
    phone: '+1 (555) 987-6543',
    avatar: 'JS'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    email: 'emily.johnson@company.com',
    role: 'admin',
    department: 'HR',
    status: 'active',
    joinDate: '2022-11-08',
    phone: '+1 (555) 456-7890',
    avatar: 'EJ'
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    role: 'contributor',
    department: 'Engineering',
    status: 'pending',
    joinDate: '2023-12-01',
    avatar: 'MB'
  }
];

export const TeamManagementPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { toast } = useToast();

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddMember = () => {
    setEditingMember(null);
    setIsDialogOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      // Here you would normally make an API call
      // await axios.delete(`/api/team-members/${memberId}`);
      
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      toast({
        title: "Member deleted",
        description: "Team member has been successfully removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete team member.",
        variant: "destructive",
      });
    }
  };

  const handleSaveMember = async (memberData: Omit<TeamMember, 'id'>) => {
    try {
      if (editingMember) {
        // Update existing member
        // await axios.put(`/api/team-members/${editingMember.id}`, memberData);
        setTeamMembers(prev => 
          prev.map(member => 
            member.id === editingMember.id 
              ? { ...memberData, id: editingMember.id }
              : member
          )
        );
        toast({
          title: "Member updated",
          description: "Team member has been successfully updated.",
        });
      } else {
        // Create new member
        // const response = await axios.post('/api/team-members', memberData);
        const newMember = { ...memberData, id: Date.now().toString() };
        setTeamMembers(prev => [...prev, newMember]);
        toast({
          title: "Member added",
          description: "New team member has been successfully added.",
        });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save team member.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      pending: "secondary",
      inactive: "destructive"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-purple-100 text-purple-800",
      contributor: "bg-blue-100 text-blue-800",
      guest: "bg-gray-100 text-gray-800"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role] || colors.guest}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-gray-600">Manage your team members and their roles</p>
        </div>
        <Button onClick={handleAddMember} className="flex items-center space-x-2">
          <UserPlus size={16} />
          <span>Add Member</span>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="contributor">Contributor</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(member.role)}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {member.phone && (
                          <a href={`tel:${member.phone}`} className="text-blue-600 hover:text-blue-800">
                            <Phone size={14} />
                          </a>
                        )}
                        <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800">
                          <Mail size={14} />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMember(member)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <TeamMemberDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveMember}
        member={editingMember}
      />
    </div>
  );
};
