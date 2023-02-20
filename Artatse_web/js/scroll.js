let background = document.getElementById("exhibition");
window.addEventListener('scroll', function (){
    let value = window.scrollY;
    background.style.top=-value*0.5+'px';
})