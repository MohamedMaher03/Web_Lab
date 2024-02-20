const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = employee.findIndex(emp => emp.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    employee.splice(index, 1); // Removing the employee from the array
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const index = employee.findIndex(emp => emp.id === id);
    if ((index === -1)) {
      const newEmployee = { id, name };
      employee.push(newEmployee);
      res.status(201).json({ message: 'Employee created successfully', data: newEmployee });
    }
  } catch (error) {
    next(error);
  }
};



