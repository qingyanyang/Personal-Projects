window.onload=function (){
    //for shop-list
    document.getElementById("shop").onclick=function (){
        let splt= document.getElementById("shop-list");
        splt.style.height=(splt.style.height !== '800px') ? '800px' : '0px';
        let sple= document.getElementById("shop-line");
        sple.style.display=(sple.style.display !== 'block') ? 'block' : 'none';
    }
}