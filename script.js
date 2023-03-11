let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
  cartItem.classList.remove("active");
};

let cartItem = document.querySelector(".cart-items-container");

document.querySelector("#cart-btn").onclick = () => {
  cartItem.classList.toggle("active");
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
  // cartItem.classList.remove("active");
};
let arrCollection = [];
if (localStorage.getItem("items") != null) {
  arrCollection = JSON.parse(localStorage.getItem("items"));
  displaycartItem(arrCollection);
}
$(".box-container .box #addCartIcon").click(function boxs() {
  let box = Array.from($(this).parent().parent());
  let imgSrc = $(box).children(".image").children("img").attr("src");
  let price = Array.from(
    $(box).children(".content").children(".price").html()
  ).join("");
  console.log(price);
  let objPush = {
    prices: price,
    imgs: imgSrc,
  };
  arrCollection.push(objPush);
  localStorage.setItem("items", JSON.stringify(arrCollection));
  displaycartItem(arrCollection);
});
$(".box .btn").click(function demo() {
  let box = Array.from($(this).parent());
  let imgSrc = $(box).children("img").attr("src");
  let price = Array.from($(box).children(".price").html()).join("");
  let objPush = {
    prices: price,
    imgs: imgSrc,
  };
  arrCollection.push(objPush);
  localStorage.setItem("items", JSON.stringify(arrCollection));
  displaycartItem(arrCollection);
});
function displaycartItem(arr) {
  if (arr.length == 0) {
    $(".cartItemNum").addClass("d-none");
    $("#cartItems").html('<h1 id="cartCheckMas">Cart Embety</h1>');
  } else {
    $(".cartItemNum").html(arr.length);
    $(".cartItemNum").removeClass("d-none");

    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
      cartona += `
    <div class="cart-item">
    <span class="fas fa-times" id='deleteItem' onclick="deleteItem(${i})" ></span>
    <img src="${arr[i].imgs}" alt="" />
    <div class="content">
      <h3>cart item 0${i + 1}</h3>
      <div class="price">${arr[i].prices}</div>
    </div>
  </div>
    
    `;
    }
    $("#cartItems").html(cartona);
  }
  if (arr.length > 5) {
    $(".header .cart-items-container").css("overflow-y", "scroll");
  } else {
    $(".header .cart-items-container").css("overflow", "hidden");
  }
}
function deleteItem(index) {
  arrCollection.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(arrCollection));
  displaycartItem(arrCollection);
}
