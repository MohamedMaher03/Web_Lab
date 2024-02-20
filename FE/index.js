function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
      deleteEventListeners();
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const submitBotton = document.getElementById('submitbutton');
submitBotton.addEventListener("click", () => {
  createEmployee();
})



// TODO
// add event listener to delete button
function deleteEventListeners() {
  const deleteButtons = document.querySelectorAll('.btn-danger');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.parentElement.parentElement.firstChild.textContent;
      deleteEmployee(id);
    });
  });
}


// TODO
function createEmployee() {
  // get data from input field
  const username = document.getElementById('name').value;
  const userid = document.getElementById('id').value;
  if (!username || !userid) {
    console.error("enter all data");
    return;
  }
  // send data to BE
  const employeeData = {
    name: username,
    id: userid
  };

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create employee');
      }
      fetchEmployees();
    })
    .catch(error => {
      console.error(error);
    });
}

// TODO
function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      fetchEmployees();
    })
    .catch(error => {
      console.error(error);
    });
}

fetchEmployees();
