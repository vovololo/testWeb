const item = document.querySelectorAll(".item");

for(let i = 0;i<item.length;i++){
    let temp = `
    <div class="option">
        <button class="btnOption btnSugar">Sugar:Full</button>
        <button class="btnOption btnIce">Ice:Full</button>
        <button class="btnOption btnSizeL">size:Large</button>
        <button class="btnOption btnSizeM">size:Medium</button>
        <button class="btnOption btnSubmit">Submit</button>
    </div>
    `
    let tempEl = document.createElement('div');
    tempEl.innerHTML = temp;
    item[i].appendChild(tempEl);
};

let ip = document.querySelectorAll(".itemPart");
let option = document.querySelectorAll(".option");

for(let i = 0;i<ip.length;i++){
    ip[i].addEventListener('click', function(){
        let temp = option[i].getAttribute("class");
        if(temp==='option'){
            option[i].setAttribute("class", "option x");
            $(option[i]).slideToggle();
        }else{
            option[i].removeAttribute("class");
            option[i].setAttribute("class", "option");
            $(option[i]).slideToggle();
        }
        
    });
    let submit = document.querySelectorAll(".btnSubmit");
    $(submit[i]).click(function(){
            let submitted = document.createElement('div');
            let temp = `
            <svg width="200" height="200">
                <circle fill="none" stroke="#68E534" stroke-width="10" cx="100" cy="100" r="90" 
                class="circle" transform="rotate(-90 100 100)" stroke-linecap="round"></circle>
                <polyline fill="none" stroke="#68E534" stroke-width="12" points="44,107 86,142 152,69"
                stroke-linecap="round" stroke-linejoin="round" class="tick" />
            </svg>
            <h2 class="success" >Submitted</h2>
            `;
            submitted.innerHTML = temp;
            submitted.setAttribute("class", "submitted");
            document.body.appendChild(submitted);
            setTimeout(function(){
                document.body.removeChild(submitted);
            }, 2000);
        });
};

// for(let i = 0;i<ip.length;i++){
//     ip[i].addEventListener('click', function(){
//         let submit = document.querySelectorAll(".btnSubmit");
//         let temp = option[i].getAttribute("class");

//         if(temp==='option'){
//             option[i].setAttribute("class", "option x");
//             $(option[i]).slideToggle();
//         }else{
//             option[i].removeAttribute("class");
//             option[i].setAttribute("class", "option");
//             $(option[i]).slideToggle();
//         }

//         $(submit[i]).click(function(){
//             let submitted = document.createElement('div');
//             let temp = `
//                     <button class="box">submitted</button>
//             `;
//             submitted.innerHTML = temp;
//             submitted.setAttribute("class", "submitted");
//             document.body.appendChild(submitted);
//             setTimeout(function(){
//                 document.body.removeChild(submitted);
//             }, 1000);
//         });
//     });
// };

$(".option").hide();

let sugar = document.querySelectorAll(".btnSugar");
let ice = document.querySelectorAll(".btnIce");
let btnL = document.querySelectorAll(".btnSizeL");
let btnM = document.querySelectorAll(".btnSizeM");

for(let i=0;i<option.length;i++){
    sugar[i].addEventListener('click', function(){
        let temp = sugar[i].textContent;
        if(temp =="Sugar:Full"){
            sugar[i].textContent = "Sugar:Half";
        }
        else if(temp == "Sugar:Half"){
            sugar[i].textContent = "Sugar:None";
        }
        else if(temp == "Sugar:None"){
            sugar[i].textContent = "Sugar:Full";
        }
    });

    ice[i].addEventListener('click', function(){
        let temp = ice[i].textContent;
        if(temp =="Ice:Full"){
            ice[i].textContent = "Ice:Half";
        }
        else if(temp == "Ice:Half"){
            ice[i].textContent = "Ice:None";
        }
        else if(temp == "Ice:None"){
            ice[i].textContent = "Ice:Full";
        }
    });

    $(btnL[i]).click(function(){
        let temp = btnM[i].getAttribute("class");
        if(temp !== "btnOption btnSizeM selected"){
            $(btnL[i]).toggleClass("selected");
        };
    });
    $(btnM[i]).click(function(){
        let temp = btnL[i].getAttribute("class");
        if(temp !== "btnOption btnSizeL selected"){
            $(btnM[i]).toggleClass("selected");
        };
    });
};

$(".btnOrder").click(function(){
    $(".order").toggleClass("show");
    $(".btnOrder").toggleClass("clicked")
});
