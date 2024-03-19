// this scroll is now applied to the top most element of the page , so it can be applied to the whole page
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


// intially clientx and client y window ke top left corner se shuru hote hai , and then their value changes accordingly

// translate property is used to move the object in any axis
function mouseFollower(xscale, yscale) {
    window.addEventListener('mousemove', (dets) => {
        document.querySelector("#bindu").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}

// jab mouse move ho to hum log squeeze kr payein aur maximum squeeze and min define /set kr payein, 
// jab mouse move ho , chapte ki value badhe , when mouse stops , chapta removes 
function squeezeKaro() {
    // bindu ka default size
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    // jab mouse moves karega
    window.addEventListener('mousemove', (dets) => {
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        mouseFollower(xscale, yscale);
    })
}

// used clamp(min, max, curr)-> it'll take the sbse choti and sbse badi value jo tumhe deni hai bindu ki, and return that value agar koi uss range ke bahar gya toh , agra bich ki dedi toh bich ki hi print hoajyegi
squeezeKaro();

function firstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    tl.to(".boundingElem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1.7,
        stagger: .2,
        delay: -.5
    })

    tl.from('#hero-footer', {
        y: -10,
        opacity: 0,
        duration: 2,
        delay: -.5,
        ease: Power4.easeOut
    })
}


mouseFollower();
firstPageAnim();




/*
image vala section 
teeno element ko select kro , uske bad tino par mpusemove lagao , mousemove hone par pata kro ki mouse kaha se kaha par hai ,
jiska matlb mouse ki x and y pos pata karo , 
mouse ki x y pos ke badle image show kro , and move kro 
move krte waqt rotate kro , 
jese jese mouse tez chale , vse vse rotation bhi tez hojaye

*/

document.querySelectorAll(".elem").forEach(function (el) {
    var rotate =0;
    var diffRotate = 0;
    el.addEventListener("mousemove", (dets) => {
        var diff = dets.clientY - el.getBoundingClientRect().top;
        diffRotate = dets.clientX - rotate;
        rotate = dets.clientX;

       
        gsap.to(el.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diffRotate*.3)
        });
    });
});

document.querySelectorAll(".elem").forEach(function (el) {
    el.addEventListener("mouseleave", () => {
       
        gsap.to(el.querySelector("img"), {
            opacity: 0,
            ease: Power4,
            duration:.5
        });
    });
});




