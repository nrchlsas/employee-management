// employee.model.ts

export interface Employee {
    id?: number; // Optional for initial data, will be assigned by the service for new employees
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string; // Format: 'YYYY-MM-DD'
    basicSalary: number;
    status: string;
    group: string;
    description?: string; // Optional
  }
  