export type MemberStatus = 'pending' | 'active';

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'administrator' | 'bookkeeper' | 'user';
  status: MemberStatus;
  invitedAt: Date;
  lastActive?: Date;
}