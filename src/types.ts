export interface EventItem {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  dateTime: string;
  time: string;
  venue: string;
  coordinators: string[];
  maxParticipants: number;
}

export interface StudentRegistration {
  id: string;
  studentName: string;
  registerNumber: string;
  department: string;
  email: string;
  phone: string;
  selectedEventId: string;
  registeredAt: string;
}

export interface UserProfile {
  username: string;
  registerNumber?: string;
  department?: string;
  email?: string;
  phone?: string;
  isLoggedIn: boolean;
}
