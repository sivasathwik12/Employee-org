import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee, EmployeeFormData } from '@/types/employee';
import { generateMockEmployees } from '@/lib/mockData';

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (data: EmployeeFormData) => void;
  updateEmployee: (id: string, data: EmployeeFormData) => void;
  deleteEmployee: (id: string) => void;
  toggleEmployeeStatus: (id: string) => void;
  getEmployee: (id: string) => Employee | undefined;
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const STORAGE_KEY = 'employees_data';

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setEmployees(JSON.parse(savedData));
    } else {
      // Initialize with mock data
      const mockEmployees = generateMockEmployees(12);
      setEmployees(mockEmployees);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEmployees));
    }
  }, []);

  const saveToStorage = (data: Employee[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addEmployee = (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...data,
      id: `EMP${String(Date.now()).slice(-6)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...employees, newEmployee];
    setEmployees(updated);
    saveToStorage(updated);
  };

  const updateEmployee = (id: string, data: EmployeeFormData) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, ...data } : emp
    );
    setEmployees(updated);
    saveToStorage(updated);
  };

  const deleteEmployee = (id: string) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
    saveToStorage(updated);
  };

  const toggleEmployeeStatus = (id: string) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    );
    setEmployees(updated);
    saveToStorage(updated);
  };

  const getEmployee = (id: string) => employees.find((emp) => emp.id === id);

  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.isActive).length,
    inactive: employees.filter((e) => !e.isActive).length,
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleEmployeeStatus,
        getEmployee,
        stats,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
}