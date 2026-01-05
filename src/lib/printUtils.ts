import { Employee } from '@/types/employee';
import { format } from 'date-fns';

export function printEmployee(employee: Employee) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Employee Details - ${employee.fullName}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          max-width: 600px;
          margin: 0 auto;
          color: #1a1a2e;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #4f46e5;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          color: #4f46e5;
          font-size: 24px;
        }
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 15px;
          border: 4px solid #e5e7eb;
        }
        .details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .detail-item {
          padding: 15px;
          background: #f8fafc;
          border-radius: 8px;
        }
        .detail-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .detail-value {
          font-size: 16px;
          font-weight: 600;
        }
        .status-active {
          color: #059669;
        }
        .status-inactive {
          color: #dc2626;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }
        @media print {
          body { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${employee.profileImage ? `<img src="${employee.profileImage}" alt="${employee.fullName}" class="avatar" />` : ''}
        <h1>${employee.fullName}</h1>
        <p style="color: #64748b; margin: 5px 0 0 0;">Employee ID: ${employee.id}</p>
      </div>
      <div class="details">
        <div class="detail-item">
          <div class="detail-label">Gender</div>
          <div class="detail-value" style="text-transform: capitalize;">${employee.gender}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Date of Birth</div>
          <div class="detail-value">${format(new Date(employee.dateOfBirth), 'dd MMM yyyy')}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">State</div>
          <div class="detail-value">${employee.state}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Status</div>
          <div class="detail-value ${employee.isActive ? 'status-active' : 'status-inactive'}">
            ${employee.isActive ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>
      <div class="footer">
        <p>Printed on ${format(new Date(), 'PPPp')}</p>
        <p>EmpHub - Employee Management System</p>
      </div>
      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();
}

export function printEmployeeList(employees: Employee[]) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const rows = employees.map((emp) => `
    <tr>
      <td>${emp.id}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          ${emp.profileImage ? `<img src="${emp.profileImage}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />` : ''}
          ${emp.fullName}
        </div>
      </td>
      <td style="text-transform: capitalize;">${emp.gender}</td>
      <td>${format(new Date(emp.dateOfBirth), 'dd MMM yyyy')}</td>
      <td>${emp.state}</td>
      <td class="${emp.isActive ? 'status-active' : 'status-inactive'}">
        ${emp.isActive ? 'Active' : 'Inactive'}
      </td>
    </tr>
  `).join('');

  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Employee List</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          color: #1a1a2e;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          color: #4f46e5;
          font-size: 28px;
        }
        .header p {
          color: #64748b;
          margin: 5px 0 0 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        th {
          background: #4f46e5;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        tr:nth-child(even) {
          background: #f8fafc;
        }
        .status-active { color: #059669; font-weight: 600; }
        .status-inactive { color: #dc2626; font-weight: 600; }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }
        @media print {
          body { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Employee Directory</h1>
        <p>Total Employees: ${employees.length}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <div class="footer">
        <p>Printed on ${format(new Date(), 'PPPp')}</p>
        <p>EmpHub - Employee Management System</p>
      </div>
      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();
}