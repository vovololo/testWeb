const item = document.querySelectorAll(".item");
var fastOrder = false;

$(".btnFast").click(function(){
    $(".btnFast").toggleClass("switch");
    if(fastOrder == true){
        fastOrder = false;
    }
    else{
        fastOrder = true;
    }
});



for(let i = 0;i<item.length;i++){
    let temp = `
    <div class="option">
        <button class="btnOption btnSugar">Sugar:Full</button>
        <button class="btnOption btnIce">Ice:Full</button>
        <button class="btnOption btnSizeL">size:Large</button>
        <button class="btnOption btnSizeM">size:Medium</button>
        <button class="btnOption btnPrice">price:</button>
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
            let name = ip[i].querySelector('p').textContent;
            let detail = item[i].querySelectorAll(".btnOption");
            let orderPrice = 0;
            let optionDetail = '';
            let sizeSelected = 0;
            
            for(let i = 0; i<detail.length-2;i++){
                if(detail[i].textContent == "size:Large" || detail[i].textContent == "size:Medium"){
                    let sizeClass = detail[i].getAttribute('class');
                    if(sizeClass === 'btnOption btnSizeL'){
                        continue;
                    }
                    else if(sizeClass === 'btnOption btnSizeM'){
                        continue;
                    }
                    else{
                        sizeSelected++;
                    }
                }
                optionDetail += detail[i].textContent;
                optionDetail +=" ";
            }
            
            orderPrice = detail[4].textContent.replace(/[^0-9]/g, '');

            if(sizeSelected >= 1){
                showOrderInfo(name,optionDetail,orderPrice);
                if(fastOrder != true) successAnimation();    
            }
            else{
                if(fastOrder == true) failAnimation(1000);
                if(fastOrder != true) failAnimation(3000);
            }
            
        });
};
$(".option").hide();

function showOrderInfo(name, optionDetail, orderPrice){
        let order = document.querySelector('.order');
        let tempDiv = document.createElement('div');
        let tempOrder = `
        <p>${name}</p>
        <p>${optionDetail}</p>
        <p>${orderPrice}</p>
        `;
        tempDiv.innerHTML = tempOrder;
        tempDiv.setAttribute('class', 'orderInfo')
        let tempHr = document.createElement('hr');
        let total = document.querySelector(".total");
        order.insertBefore(tempDiv, total);
        order.insertBefore(tempHr, total);
        // order.appendChild(tempDiv);
        // order.appendChild(tempHr);

        let totalItem = document.querySelectorAll(".orderInfo").length;
        let tempTI = document.querySelector(".tti");
        let tempTP = document.querySelector(".ttp");
        if(tempTP.textContent == "Total price:"){
            tempTP.textContent = 0;
        }
        tempTP.textContent = Number(tempTP.textContent.replace(/[^0-9]/g, ''));
        tempTI.textContent = "Total item :" + totalItem;
        tempTP.textContent ="Total price:" + (Number(tempTP.textContent) + Number(orderPrice));
}

function successAnimation(){
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
}

function failAnimation(time){
    let submitted = document.createElement('div');
    let temp = `
    <svg width="200" height="200">
            <circle fill="none" stroke="#EE0000" stroke-width="10" cx="100" cy="100" r="90" 
            class="circle" transform="rotate(-90 100 100)" stroke-linecap="round"></circle>
            <polyline fill="none" stroke="#EE0000" stroke-width="12" points="60,60 100,100 140,60 100,100 140,140 100,100 ,60,140"
            stroke-linecap="round" stroke-linejoin="round" class="cross" />
        </svg>
        <h2 class="success">Fail Submit</h2>
        <h2 class="success">(NEED TO SELECT SIZE)</h2>
    `;
    submitted.innerHTML = temp;
    submitted.setAttribute("class", "submitted");
    document.body.appendChild(submitted);
    setTimeout(function(){
        document.body.removeChild(submitted);
    }, time);
}

let sugar = document.querySelectorAll(".btnSugar");
let ice = document.querySelectorAll(".btnIce");
let btnL = document.querySelectorAll(".btnSizeL");
let btnM = document.querySelectorAll(".btnSizeM");
let btnP = document.querySelectorAll(".btnPrice");

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
        }
        else if(temp == "btnOption btnSizeM selected"){
            $(btnM[i]).toggleClass("selected");
            $(btnL[i]).toggleClass("selected");
        }
            let price = item[i].getAttribute("id").replace(/[^0-9]/g, '');
            price = Number(price)+10;
            $(btnP[i]).html("price:"+price);
    });
    $(btnM[i]).click(function(){
        let temp = btnL[i].getAttribute("class");
        if(temp !== "btnOption btnSizeL selected"){
            $(btnM[i]).toggleClass("selected");
        }
        else if(temp == "btnOption btnSizeL selected"){
            $(btnM[i]).toggleClass("selected");
            $(btnL[i]).toggleClass("selected");
        }
            let price = item[i].getAttribute("id").replace(/[^0-9]/g, '');
            $(btnP[i]).html("price:"+price);
    });
};

$(".btnOrder").click(function(){
    $(".order").toggleClass("show");
    $(".btnOrder").toggleClass("clicked")
});