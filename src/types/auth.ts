export type UserRole = 'employer' | 'worker';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  city: string;
  area?: string;
  cnic?: string;
  primarySkill?: string;
  avatarInitials: string;
  verified: boolean;
  memberSince: string;
}

export interface RegisteredUser extends UserAccount {
  password: string;
}

export interface UserBooking {
  id: string;
  userId: string;
  workerName: string;
  workerRole: string;
  city: string;
  area?: string;
  shift: string;
  timeSlot: string;
  specialNotes?: string;
  status: 'Interview Requested' | 'Trial Active' | 'Finalized' | 'Cancelled';
  createdAt: string;
  paidCommission: boolean;
  commissionTxId?: string;
}

export interface AuthState {
  user: UserAccount | null;
  isAuthenticated: boolean;
}
