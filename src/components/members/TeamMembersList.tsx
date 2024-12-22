import React from 'react';
import { TeamMember } from '@/types/members';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface TeamMembersListProps {
  members: TeamMember[];
  onDeleteMember: (memberId: string) => void;
}

const TeamMembersList = ({ members, onDeleteMember }: TeamMembersListProps) => {
  const { toast } = useToast();
  
  const getStatusBadge = (status: TeamMember['status']) => {
    if (status === 'pending') {
      return <Badge variant="secondary">Pending</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  const handleDelete = (memberId: string, memberName: string) => {
    onDeleteMember(memberId);
    toast({
      title: "Member removed",
      description: `${memberName} has been removed from the team.`,
    });
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
          <TableHead>Actions</TableHead>
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
            <TableCell>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove team member</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove {member.firstName} {member.lastName} from the team? 
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(member.id, `${member.firstName} ${member.lastName}`)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Remove member
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamMembersList;