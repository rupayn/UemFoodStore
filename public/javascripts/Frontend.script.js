let movingCursor1 = document.querySelector('.cursor1');
let movingCursor2 = document.querySelector('.cursor2');
let addToCarts = document.querySelectorAll('.add-cart');

let li= document.querySelectorAll('li');

const scroll = new LocomotiveScroll({
    el: document.querySelector('main'),
    smooth: true,
    lerp: 0.05, 
});

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




gsap.to("nav button",{
    // y:40,
    duration:3,
    delay:1,
    stagger: true,
    opacity:1,
});
li.forEach((eli) => {
    console.log(eli.innerText);
    eli.addEventListener("mouseover",(el)=>{
        el.target.style.cursor="pointer";
        el.target.style.transform="skew(180deg)";
        el.target.style.transition="all ease 2s";
    })
    eli.addEventListener("mouseleave",(el)=>{
        el.target.style.transform="skew(0deg)";
        el.target.style.transition="all ease";
    })
    
})

gsap.from("nav #logo,nav ul li,#nimg1,#nimg2",{
    y:-50,
    duration:2,
    delay:0.5,
    stagger: true,
    opacity:0,
});

gsap.from(".cont",{
    x:-350,
    duration:2,
})
gsap.from(".fimg",{
    x:350,
    duration:2,
})
gsap.from(".gcart",{
    x:-350,
    duration:2,
})