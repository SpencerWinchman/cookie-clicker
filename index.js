const btn = document.getElementById("btn");
const btnCtr = document.getElementById("btnContainer");

const myH1 = document.getElementById("myH1");


let intervalId = null;
let timeoutId = null;
let isHolding = false;
let lastMouseEvent = null;


btn.addEventListener('mousedown', (e) => {
  if (isHolding) return;
  isHolding = true;

  showCookie(e); // Immediate cookie on click
  lastMouseEvent = e;

  // Start the repeating calls after 500ms
  timeoutId = setTimeout(() => {
    intervalId = setInterval(() => {
      if (lastMouseEvent) {
        showCookie(lastMouseEvent);
      }
    }, 120); //delay between repeats
  }, 300); //initial delay
});

// Track mouse position anywhere on the page
btn.addEventListener('mousemove', (e) => {
  lastMouseEvent = e;
});

// Clear everything on mouse release
document.addEventListener('mouseup', () => {
  clearTimeout(timeoutId);
  clearInterval(intervalId);
  isHolding = false;
  timeoutId = null;
  intervalId = null;
});


function showCookie(event) {
    let x = event.clientX-42;
    let y = event.offsetY-35;
    //these should be both client or offset, but this works for some reason??

    const yWrapper = document.createElement("div"); //parent
    const xWrapper = document.createElement("div"); //child
    const cookie = document.createElement("img"); //grandchild


    const imgSideLength = 70;
    cookie.width = imgSideLength;
    cookie.height = imgSideLength;
    cookie.src = "cookie.png";

    // yWrapper.
    yWrapper.width = imgSideLength+20;
    yWrapper.height = imgSideLength+20;
    yWrapper.borderRadius = "50%";
    yWrapper.boxShadow = "50px 10px 5px white";
    yWrapper.style.backgroundColor = "yellow";

    yWrapper.style = `position: absolute; left: ${x}px; top: ${y}px;`;

    //prevents drag/select
    cookie.draggable = false;
    cookie.style.pointerEvents = "none";

    xWrapper.draggable = false;
    xWrapper.style.pointerEvents = "none";

    yWrapper.draggable = false;
    yWrapper.style.pointerEvents = "none";
    //~~~~~~~~~~~~~~~~~~~~~~~~

    let rotation = Math.floor(Math.random()*360);
    cookie.style.transform = `rotate(${rotation}deg)`;
    // cookie.style.transition = "opacity 0.5s";

    
    yWrapper.appendChild(xWrapper);
    xWrapper.appendChild(cookie);
    btnCtr.appendChild(yWrapper);


    setTimeout(() => cookie.remove(), 5000); //clear cookies in case animation fails


    const animSwitch = true;

    if(animSwitch){
        // start of switch
        const jumpHeight = 30;
        const distanceToBottom = window.innerHeight;


        const xScale = 150;
        const randXMove = ((Math.random()*2)-1)*xScale;

        const upTime = 0.1;
        const downTime = 0.9;
        const totalTime = upTime + downTime;
       

        requestAnimationFrame(() => {
            yWrapper.getBoundingClientRect(); //this prevents the browser from "optimizing animations"
                                            //basically the browser skips anims sometimes if they're short
            xWrapper.style.transition = `transform ${totalTime}s linear`;
            xWrapper.style.transform = `translateX(${randXMove}px)`;
            yWrapper.getBoundingClientRect();
            yWrapper.style.transition = `transform ${upTime}s ease-out`;
            yWrapper.style.transform = `translateY(-${jumpHeight}px)`;
        });

        // yWrapper.getBoundingClientRect();


        yWrapper.addEventListener("transitionend", function handleTransition(e) {
            if (e.propertyName === "transform") {
                
                yWrapper.style.transition = `transform ${downTime}s ease-in`;
                yWrapper.style.transform = `translateY(${distanceToBottom}px)`;

                yWrapper.addEventListener("transitionend", function handleFade(e) {
                    if (e.propertyName === "transform") {
                        cookie.remove();
                    }
                });
            }
        });
        //end of switch
    }
}