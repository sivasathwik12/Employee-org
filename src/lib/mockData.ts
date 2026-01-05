import { Employee, INDIAN_STATES } from '@/types/employee';

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan',
  'Ananya', 'Diya', 'Priya', 'Ishita', 'Aditi', 'Kavya', 'Anika', 'Saanvi',
  'Rohan', 'Karan', 'Vikram', 'Rahul', 'Neha', 'Pooja', 'Sneha', 'Riya'
];

const lastNames = [
  'Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Reddy', 'Nair', 'Verma',
  'Joshi', 'Chopra', 'Malhotra', 'Iyer', 'Rao', 'Mehta', 'Shah', 'Das'
];

const avatarImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
];

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export function generateMockEmployees(count: number): Employee[] {
  const employees: Employee[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const isFemale = ['Ananya', 'Diya', 'Priya', 'Ishita', 'Aditi', 'Kavya', 'Anika', 'Saanvi', 'Neha', 'Pooja', 'Sneha', 'Riya'].includes(firstName);
    
    employees.push({
      id: `EMP${String(100000 + i).slice(-5)}`,
      fullName: `${firstName} ${lastName}`,
      gender: isFemale ? 'female' : 'male',
      dateOfBirth: randomDate(new Date(1970, 0, 1), new Date(2000, 11, 31)),
      profileImage: avatarImages[i % avatarImages.length],
      state: randomItem(INDIAN_STATES),
      isActive: Math.random() > 0.25,
      createdAt: randomDate(new Date(2020, 0, 1), new Date()),
    });
  }
  
  return employees;
}