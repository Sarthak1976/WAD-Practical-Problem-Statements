fetch('http://localhost:3000/api/products',{method:"GET"})
.then(response=>response.json())
.then(data=>{
    const tbody = document.getElementById('tbody');

    data.forEach(element => {
        tbody.innerHTML += `
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td><img src='${element.image}'></td>
    
        </tr>
        `;
    });
})
.catch(error=>{
    console.error("Error: ",error);
    
})