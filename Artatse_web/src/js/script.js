// function turn(obj) {
//     obj.style.display= 'inline-block';
//     obj.style.background.repeat(null);
//     obj.style.height='25px';
//     obj.style.width='30px';
// }
window.onload=function (){
    //for shop-list
    document.getElementById("shop").onclick=function (){
        let splt= document.getElementById("shop-list");
        splt.style.height=(splt.style.height != '1070px') ? '1070px' : '0px';
        // let spic = document.getElementById("shop-icon");
        // spic.style.background=(spic.style.background !='url(../images/Vup.png)') ? 'url(../images/Vup.png)' : 'url(../images/Vdown1.png)';
        // turn(spic);
        let sple= document.getElementById("shop-line");
        sple.style.display=(sple.style.display != 'block') ? 'block' : 'none';
    }
    //for journal-list
    document.getElementById("journal").onclick=function (){
        let jnlt= document.getElementById("journal-list");
        jnlt.style.height=(jnlt.style.height != '1070px') ? '1070px' : '0px';
        let jnle= document.getElementById("journal-line");
        jnle.style.display=(jnle.style.display != 'block') ? 'block' : 'none';
    }
}