// const socketClient = io();

// socketClient.on('saludoDesdeElBack', (msg) => {
//     console.log(msg);

//     socketClient.emit('respuestaDesdeElFront', 'Muchas gracias')
// })

// const form = document.getElementById('form');
// const inputName = document.getElementById('name');
// const inputPrice = document.getElementById('price');
// const products = document.getElementById('products');

// form.onsubmit = (e) => {
//     e.preventDefault();
//     const name = inputName.value;
//     const price = inputPrice.value;
//     const product = { name, price };
//     socketClient.emit('newProduct', product);
//     inputName.value = ''
//     inputPrice.value = ''
// };

// socketClient.on('arrayProducts', (productsArray) => {
//     let infoProducts = '';
//     productsArray.forEach(p => {
//         infoProducts += `${p.name} - $${p.price} </br>`
//     })
//     products.innerHTML = infoProducts
// })

// socketClient.on('message', (msg) => {
//     console.log(msg);
// })
const socket = io();
socket.on("productos", (data) => {
  const productosLista = document.querySelector(".container");
  productosLista.innerHTML = " ";
  data.forEach((products) => {
    const boxItem = `
                <div class="product">
                <h3>${products.title}</h3>
                <p>Description: ${products.description}</p>
                <p>ID: ${products.id}</p>
                <p>$ ${products.price}</p>
                <p>Stock: ${products.stock}</p>
                </div>`;
    productosLista.innerHTML += boxItem;
  });
  


  

});