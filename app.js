let listBg = document.querySelectorAll('.bg');
let listTab = document.querySelectorAll('.tab');
let titleBanner = document.querySelector('.header');

window.addEventListener("scroll", (event) => {
    /*scrollY is the web scrollbar position (pixel)*/
    let top = this.scrollY;
    /*index is the order of classes bg (0,1,2,3,4,5,6,7,8)
    When scrolling the web, the classes bg scroll down,
    the bigger the index, the faster the movement
    */
    listBg.forEach((bg, index) => {
        if(index != 0 && index != 8){
            bg.style.transform = `translateY(${((top+index/2)/2)}px)`;
        }else if(index == 0){
            bg.style.transform = `translateY(${(top/3)}px)`;
        }
    })
    titleBanner.style.transform = `translateY(${(top*3/2)}px)`;

    /* parallax scroll in tab
    when tab's position is less than 550 px
    from scrollbar position add active class to animate 
    and vice versa
    */
    listTab.forEach(tab =>{
        if(tab.offsetTop - top < 550){
            tab.classList.add('active');
        }else{
            tab.classList.remove('active');
        }
    })
});  


// Overlay
// Nav bar

/* Set the height of the sidebar to 86vh (show it) */
function openNav() {
    document.getElementById("mySidepanel").style.height = "90%";
}

/* Set the height of the sidebar to 0vh (hide it) */
function closeNav() {
    document.getElementById("mySidepanel").style.height = "0vh";
}

function openNav2() {
    document.getElementById("mySidepanel2").style.height = "90%";
}

/* Set the height of the sidebar to 0vh (hide it) */
function closeNav2() {
    document.getElementById("mySidepanel2").style.height = "0vh";
}

function openNav3() {
    document.getElementById("mySidepanel3").style.height = "90%";
}

/* Set the height of the sidebar to 0vh (hide it) */
function closeNav3() {
    document.getElementById("mySidepanel3").style.height = "0vh";
}