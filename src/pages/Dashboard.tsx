import { useState, useMemo } from 'react';
import { useEmployees } from '@/contexts/EmployeeContext';
import { Employee, EmployeeFormData } from '@/types/employee';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EmployeeTable } from '@/components/dashboard/EmployeeTable';
import { EmployeeFilters } from '@/components/dashboard/EmployeeFilters';
import { EmployeeFormDialog } from '@/components/dashboard/EmployeeFormDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX, Plus, Printer } from 'lucide-react';
import { printEmployee, printEmployeeList } from '@/lib/printUtils';

export default function Dashboard() {
  const { employees, stats, addEmployee, updateEmployee } = useEmployees();
  
  // Form dialog state
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesGender = genderFilter === 'all' || employee.gender === genderFilter;
      
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && employee.isActive) ||
        (statusFilter === 'inactive' && !employee.isActive);

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchQuery, genderFilter, statusFilter]);

  const hasActiveFilters = searchQuery || genderFilter !== 'all' || statusFilter !== 'all';

  const handleClearFilters = () => {
    setSearchQuery('');
    setGenderFilter('all');
    setStatusFilter('all');
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: EmployeeFormData) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, data);
    } else {
      addEmployee(data);
    }
  };

  const handlePrintEmployee = (employee: Employee) => {
    printEmployee(employee);
  };

  const handlePrintAll = () => {
    printEmployeeList(filteredEmployees);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <section className="mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard
              title="Total Employees"
              value={stats.total}
              icon={Users}
              variant="accent"
              description="All registered employees"
            />
            <StatsCard
              title="Active Employees"
              value={stats.active}
              icon={UserCheck}
              variant="success"
              description="Currently working"
            />
            <StatsCard
              title="Inactive Employees"
              value={stats.inactive}
              icon={UserX}
              variant="warning"
              description="On leave or departed"
            />
          </div>
        </section>

        {/* Employee List Section */}
        <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <Card className="border-border/50 shadow-soft">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">Employee Directory</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredEmployees.length} of {employees.length} employees
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePrintAll}
                    disabled={filteredEmployees.length === 0}
                    className="border-border/50"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print List
                  </Button>
                  <Button
                    onClick={handleAddEmployee}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <EmployeeFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                genderFilter={genderFilter}
                onGenderChange={setGenderFilter}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                onClearFilters={handleClearFilters}
                hasActiveFilters={!!hasActiveFilters}
              />

              <EmployeeTable
                employees={filteredEmployees}
                onEdit={handleEditEmployee}
                onPrint={handlePrintEmployee}
              />
            </CardContent>
          </Card>
        </section>
      </main>

      <EmployeeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        employee={editingEmployee}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}