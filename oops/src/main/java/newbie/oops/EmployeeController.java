package newbie.oops;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private List<Employee> employees = new ArrayList<>();
    private Long idCounter = 1L;

    // POST /employees
    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        employee.setId(idCounter++);
        employees.add(employee);
        return employee;
    }

    // GET /employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employees;
    }

    // PUT /employees/{id}
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id,
                                   @RequestBody Employee updatedEmployee) {

        for (Employee emp : employees) {
            if (emp.getId().equals(id)) {
                emp.setName(updatedEmployee.getName());
                emp.setDepartment(updatedEmployee.getDepartment());
                return emp;
            }
        }
        return null;
    }

    // DELETE /employees/{id}
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {

        employees.removeIf(emp -> emp.getId().equals(id));
        return "Employee deleted successfully";
    }
}
