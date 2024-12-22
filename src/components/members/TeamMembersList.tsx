import React from 'react';
import { TeamMember } from '@/types/members';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

interface TeamMembersListProps {
  members: TeamMember[];
}

const TeamMembersList = ({ members }: TeamMembersListProps) => {
  const getStatusBadge = (status: TeamMember['status']) => {
    if (status === 'pending') {
      return <Badge variant="secondary">Pending</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Invited</TableHead>
          <TableHead>Last Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.firstName} {member.lastName}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell className="capitalize">{member.role}</TableCell>
            <TableCell>{getStatusBadge(member.status)}</TableCell>
            <TableCell>{format(new Date(member.invitedAt), 'MMM d, yyyy')}</TableCell>
            <TableCell>
              {member.lastActive ? format(new Date(member.lastActive), 'MMM d, yyyy') : '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamMembersList;