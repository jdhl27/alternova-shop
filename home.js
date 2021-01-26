// General variables
let daticos;
let total_price;

// Show products
$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:8080/data-productos.json',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
          daticos = data;
            var info_producto = "";
            data.productos.forEach(product => {

              let num = Math.round(Math.random() * (20 - 1) + 1);
              let url_image = `https://picsum.photos/200?random=${num}`;

              const {nombre, precio_unidad, stock} = product; // Desestructurando objeto espaniol
              
              if (nombre) {
                info_producto += ` <div class="card">  
                                    <div class="card-image">  
                                      <img src=" ${url_image} ">  
                                      <span class="card-title">${nombre}</span> 
                                    </div> 
                                    <div class="card-content">  
                                      <p>$ <span class="card-price">${precio_unidad}</span> </p> 
                                      <input type="number" class="cantidad"  value="1" min = "1" max = "${stock}">
                                    </div> 
                                    <div class="card-action"> `
                if(stock > 0){
                  info_producto += `  <a class="btn-add" onclick="add()">Add to cart</a> 
                                    </div> 
                                  </div>` 
                } else {
                  info_producto += `  <div>No hay Stock</div> 
                                    </div> 
                                  </div>` 
                }
                                      
                
              } else {
                const {name, unit_price, stock} = product; // Desestructurando objeto ingles

                info_producto += ` <div class="card">  
                                    <div class="card-image">  
                                      <img src=" ${url_image} ">  
                                      <span class="card-title">${name}</span> 
                                    </div> 
                                    <div class="card-content">  
                                      <p>$ <span class="card-price">${unit_price}</span> </p> 
                                      <input type="number" class="cantidad" value="1" min = "1" max = "${stock}">
                                    </div> 
                                    <div class="card-action">`
                if(stock > 0){
                  info_producto += `  <a class="btn-add" onclick="add()">Add to cart</a> 
                                    </div> 
                                  </div>` 
                } else {
                  info_producto += `  <div>No hay Stock</div> 
                                    </div> 
                                  </div>` 
                }
              }

            });

            $("#container-products").html(info_producto); 
        }
    })
});

// Add Product
const add = () => {

  
  const button = event.target;

  const item = button.closest('.card')
  
  const item_action = item.querySelector('.card-action');
  const item_title = item.querySelector('.card-title').textContent;
  const item_price = item.querySelector('.card-price').textContent;
  const item_cantidad = item.querySelector('.cantidad').value;
  const item_cantidad2 = item.querySelector('.cantidad');

  const all_title_cart = document.getElementsByClassName("cart-product-title");
 
  var sw = true;


  for (let i = 0; i < all_title_cart.length; i++) {
    if (all_title_cart[i].innerHTML === item_title) {
      let select_quantity = all_title_cart[i].parentElement.querySelector(".cart-product-quantity");
      let select_total_prince = all_title_cart[i].parentElement.querySelector(".cart-total-price");
      
      let resultado = parseInt(select_quantity.innerHTML);

      let cantidad = resultado + parseInt(item_cantidad);
      let total_unidad = cantidad * parseInt(item_price);

      select_quantity.innerHTML = cantidad;
      select_total_prince.innerHTML = total_unidad;

      daticos.productos.forEach(element => {
        if (element.name && item_title === element.name) {
          element.stock -= item_cantidad;
          item_cantidad2.max = element.stock;
          item_cantidad2.value = 1;
          if (element.stock <= 0) {
            button.style.display = 'none'
    
            var newDiv = document.createElement("div");
            newDiv.innerHTML = "No hay Stock";
            item_action.appendChild(newDiv);
          }
        } else if (item_title === element.nombre) {
          element.stock -= item_cantidad;
          item_cantidad2.max = element.stock;
          item_cantidad2.value = 1;
          if (element.stock <= 0) {
            button.style.display = 'none'
    
            var newDiv = document.createElement("div");
            newDiv.innerHTML = "No hay Stock";
            item_action.appendChild(newDiv);
          }
        }
      });
      
      sw = false;
    }
  }


  if (sw) {
    daticos.productos.forEach(element => {
      if (element.name && item_title === element.name) {
        element.stock -= item_cantidad;
        item_cantidad2.max = element.stock;
        item_cantidad2.value = 1;
        if (element.stock <= 0) {
          button.style.display = 'none'
  
          var newDiv = document.createElement("div");
          newDiv.innerHTML = "No hay Stock";
          item_action.appendChild(newDiv);
        }
      } else if (item_title === element.nombre) {
        element.stock -= item_cantidad;
        item_cantidad2.max = element.stock;
        item_cantidad2.value = 1;
        if (element.stock <= 0) {
          button.style.display = 'none'
  
          var newDiv = document.createElement("div");
          newDiv.innerHTML = "No hay Stock";
          item_action.appendChild(newDiv);
        }
      }
    });
  
    const info_cart = 
            `<tr>
              <td class= "cart-product-title">${item_title}</td>
              <td class= "cart-product-quantity">${item_cantidad}</td>
              <td class= "cart-product-price">${item_price}</td>
              <td class= "cart-total-price">${item_cantidad * item_price}</td>
            </tr>`;
  
    const table_cart = document.getElementById("products-cart");
    table_cart.innerHTML += info_cart;
  }
  
}

// Function show total price
const showTotalPrice = () => {
  const total = document.getElementById("total-orden-price");
  let data_price = document.getElementsByClassName('cart-total-price');
  let total_temporal = 0;
  
  for (let i = 0; i < data_price.length; i++) {
    total_temporal += parseInt(data_price[i].innerHTML); 
    
  }
  total.innerHTML = "$" + total_temporal;

}