let movingCursor1 = document.querySelector('.cursor1');
let movingCursor2 = document.querySelector('.cursor2');
let addToCarts = document.querySelectorAll('.add-cart');

document.addEventListener("mousemove", (e) => {
    movingCursor1.style.left = `${e.x - 5}px`;
    movingCursor1.style.top = `${e.y - 5}px`;
    movingCursor2.style.left = `${e.x - 30}px`;
    movingCursor2.style.top = `${e.y - 30}px`;
});

function updateCart(menu) {
    axios.post('/update-cart', menu)
        .then(res => {
        })
        .catch(err => {
            console.error(err); // Log error
        });
}

addToCarts.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        try {
            let menu = JSON.parse(btn.dataset.menu);
            updateCart(menu);
        } catch (error) {
            console.error("Error parsing menu data:", error); // Log parsing error
        }
    });
});
