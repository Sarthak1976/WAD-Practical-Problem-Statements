let products = [
    {name: "Wireless Headphones",price: 7999,description:"Noise-cancelling over-ear headphones."},
    {name: "Smartwatch",price: 12999,description:"Finess tracking smartwatch"},
    {name: "Gaming Mouse",price: 2499 ,description:"Ergonomic gaming mouse."},
    {name: "Laptop Stand",price: 1999,description:"Adjustable aluminium stand."},
    {name: "TV",price: 20000,description:"a"},
    {name: "Jeans",price: 3000,description:"a"},
    {name: "Shirt",price: 2000,description:"abcde"},
    {name: "T-shirt",price: 2000,description:"abcde"},
    {name: "Hoody",price: 2000,description:"abcde"},
    {name: "Jacket",price: 2000,description:"abcde"},
    {name: "Blazer",price: 2000,description:"abcde"},
    {name: "Shoes",price: 2000,description:"abcde"},
    {name: "Book",price: 200,description:"abcde"},
    {name: "Fridge",price: 20000,description:"abcde"}
];

let currentPage = 1;
const rowPerPage = 10;

displayTable = () =>{
    let start = (currentPage-1)*rowPerPage;
    let end = start + rowPerPage;
    let paginatedItems = products.slice(start,end);

    document.getElementById('table-body').innerHTML = "";
    paginatedItems.forEach(element => {
        document.getElementById('table-body').innerHTML +=`<tr>
                    <td><img src="" alt="img"></td>
                    <td>${element.name}</td>
                    <td>${element.price}</td>
                    <td>${element.description}</td>
                </tr>`
        
    });

};

load = () => {
    document.getElementById('loading-text').innerText = "Getting the list...";
    document.getElementById('table').style.display = "none";
    document.getElementById('buttons').style.display = "none";
    
    setTimeout(() => {
        document.getElementById('loading-text').innerText = "";
        document.getElementById('table').style.display = "";
        document.getElementById('buttons').style.display = "";
        displayTable();
        
    }, 2000);
    
}


next = () => {
    const totalPages = Math.ceil(products.length / rowPerPage);
    if (currentPage < totalPages){
        currentPage += 1;
        displayTable();
    }

}


prev = () => {
    if (currentPage > 1){
        currentPage -= 1;
        displayTable();
    }
}




