fetch('http://localhost:3000/api/users')
.then(response=>response.json())
.then(data=>{
    const tbody = document.getElementById('table-body')

    data.forEach(element => {
        tbody.innerHTML += `
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.role}</td>
            <td>${element.city}</td>
        </tr>
        
        `;
    });
})
.catch(error=>{
    console.log("Error: ",error);
    
});