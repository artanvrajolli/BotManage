const dd = console.log;
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}

function XandYPositionFormat(postionFrom, elementDrawedFrom, levelsHolderEle) {
    var levelsHolderElePos = getPosition(levelsHolderEle);
    var XandYtier2 = getPosition(elementDrawedFrom);
    XandYtier2.x = Math.floor(XandYtier2.x);
    XandYtier2.y = Math.floor(XandYtier2.y - 1);
    if (postionFrom == 'topleft') {
        var XandY = {
            x: XandYtier2.x - levelsHolderElePos.x,
            y: XandYtier2.y - levelsHolderElePos.y
        }
    } else if (postionFrom == 'top') {
        var XandY = {
            x: XandYtier2.x + Math.ceil(elementDrawedFrom.offsetWidth / 2) - levelsHolderElePos.x,
            y: XandYtier2.y - levelsHolderElePos.y
        }
    } else if (postionFrom == 'topright') {
        var XandY = {
            x: XandYtier2.x + (elementDrawedFrom.offsetWidth) - levelsHolderElePos.x,
            y: XandYtier2.y - levelsHolderElePos.y
        }
    } else if (postionFrom == 'left') {
        var XandY = {
            x: XandYtier2.x - levelsHolderElePos.x,
            y: XandYtier2.y + Math.ceil(elementDrawedFrom.offsetHeight / 2) - levelsHolderElePos.y
        }
    } else if (postionFrom == 'middle') {
        var XandY = {
            x: XandYtier2.x + Math.ceil(elementDrawedFrom.offsetWidth / 2) - levelsHolderElePos.x,
            y: XandYtier2.y + Math.ceil(elementDrawedFrom.offsetHeight / 2) - levelsHolderElePos.y
        }
    } else if (postionFrom == 'right') {
        var XandY = {
            x: XandYtier2.x + elementDrawedFrom.offsetWidth - levelsHolderElePos.x,
            y: XandYtier2.y + (elementDrawedFrom.offsetHeight / 2) - levelsHolderElePos.y
        }
    } else if (postionFrom == 'bottomleft') {
        var XandY = {
            x: XandYtier2.x - levelsHolderElePos.x,
            y: XandYtier2.y + elementDrawedFrom.offsetHeight - levelsHolderElePos.y
        }
    } else if (postionFrom == 'bottom') {
        var XandY = {
            x: XandYtier2.x + Math.ceil(elementDrawedFrom.offsetWidth / 2) - levelsHolderElePos.x,
            y: XandYtier2.y + elementDrawedFrom.offsetHeight - levelsHolderElePos.y
        }
    } else if (postionFrom == 'bottomright') {
        var XandY = {
            x: XandYtier2.x + elementDrawedFrom.offsetWidth - levelsHolderElePos.x,
            y: XandYtier2.y + elementDrawedFrom.offsetHeight - levelsHolderElePos.y
        }
    }
    return XandY
}
function diffTwoElem(el1, pos1, el2, pos2) {
    XandYel1 = XandYPositionFormat(pos1, el1);
    XandYel2 = XandYPositionFormat(pos2, el2);
    return {
        H: XandYel2.x - XandYel1.x, // horzontal or axis-x
        V: XandYel2.y - XandYel1.y, // vertical or axis-v 
    }
}


function drawLines(element_t, nextBranch, mainParent) {
    var XandYfrom = XandYPositionFormat('bottom', element_t, mainParent);
    var XandYTo = XandYPositionFormat('top', nextBranch, mainParent);
    var HandV = diffTwoElem(element_t, 'bottom', nextBranch, 'top');
    var randomID = 'line_' + Math.floor(Math.random() * 999999999);
    
    if(document.documentElement.clientWidth < 990){
        var borderWidth = 1; //mobile
    }else{
        var borderWidth = 1; // desktop
    }

    if (HandV.H > 0) {
        if(Math.abs(HandV.H) < 10){
            document.querySelector('.messageHolder').insertAdjacentHTML('beforeend', `
            <div id="start_${randomID}" style="height:${(HandV.V)}px;width:1px;
            top: ${(XandYfrom.y)}px;
            left: ${(XandYfrom.x)}px;
            border-bottom: ${borderWidth}px solid #60CEF5;
            border-left: ${borderWidth}px solid #60CEF5;
            border-radius: 0px 0px 0px 5px;
            position: absolute;"></div>`);
            document.querySelector('.messageHolder').insertAdjacentHTML('beforeend', `
            <div id="end_${randomID}" style="height:0px;width:0px;position: absolute;"></div>`);
            
        }else{
        document.querySelector('.messageHolder').insertAdjacentHTML('beforeend', `
                <div id="start_${randomID}" style="height:${(HandV.V / 2)}px;width:${(HandV.H / 2)}px;
                top: ${(XandYfrom.y)}px;
                left: ${(XandYfrom.x)}px;
                border-bottom: ${borderWidth}px solid #60CEF5;
                border-left: ${borderWidth}px solid #60CEF5;
                border-radius: 0px 0px 0px 5px;
                position: absolute;"></div>`);

        document.querySelector('.messageHolder').insertAdjacentHTML('beforeend', `
                <div id="end_${randomID}" style="height:${(HandV.V / 2)}px;width:${(HandV.H / 2)}px;
                top: ${(XandYfrom.y + (HandV.V / 2) - 1)}px;
                left: ${(XandYfrom.x + (HandV.H / 2))}px;
                border-top: ${borderWidth}px solid #60CEF5;
                border-right: ${borderWidth}px solid #60CEF5;
                border-radius: 0px 5px 0px 0px;
                position: absolute;"></div>`);
        }

        document.querySelector('.messageHolder').insertAdjacentHTML(`beforeend`, `
            <div id="endDot_${randomID}"
            style="height:6.5px;width:6.5px;
            top: ${(XandYTo.y-3)}px;
            left: ${(XandYTo.x-3.5)}px;
            background: #60CEF5;
            border: 1.5px solid #FFFFFF;
            box-sizing: border-box;
            border-radius:50%;
            position: absolute;
            ">
            </div>
        `);
    } else {
        if(Math.abs(HandV.H) < 10){
            document.querySelector('.messageHolder').insertAdjacentHTML('beforeend', `
            <div id="start_${randomID}" style="height:${(HandV.V)}px;width:1px;
            top: ${(XandYfrom.y)}px;
            left: ${(XandYfrom.x)}px;
            border-bottom: ${borderWidth}px solid #60CEF5;
            border-left: ${borderWidth}px solid #60CEF5;
            border-radius: 0px 0px 0px 5px;
            position: absolute;"></div>`);
            document.querySelector('.messageHolder').insertAdjacentHTML('beforeend', `
            <div id="end_${randomID}" style="height:0px;width:0px;position: absolute;"></div>`);
        }else{
        document.querySelector('.messageHolder').insertAdjacentHTML('beforeend', `
                <div id="start_${randomID}" style="height:${Math.abs(HandV.V / 2)}px;width:${Math.abs(HandV.H / 2)}px;
                top: ${(XandYfrom.y)}px;
                left: ${(XandYfrom.x) - Math.abs(HandV.H / 2)}px;
                border-right: ${borderWidth}px solid #60CEF5;
                border-bottom: ${borderWidth}px solid #60CEF5;
                border-radius: 0px 0px 5px 0px;
                position: absolute;"></div>`);

        document.querySelector('.messageHolder').insertAdjacentHTML('beforeend', `
                <div id="end_${randomID}" style="height:${Math.abs(HandV.V / 2)}px;width:${Math.abs(HandV.H / 2)}px;
                top: ${(XandYfrom.y + Math.abs(HandV.V / 2) - 1)}px;
                left: ${(XandYfrom.x + HandV.H)}px;
                border-top: ${borderWidth}px solid #60CEF5;
                border-left: ${borderWidth}px solid #60CEF5;
                border-radius: 5px 0px 0px 0px;
                position: absolute;"></div>`);            
        }
        document.querySelector('.messageHolder').insertAdjacentHTML(`beforeend`, `
            <div id="endDot_${randomID}"
            style="height:6.5px;width:6.5px;
            top: ${(XandYTo.y-3)}px;
            left: ${(XandYTo.x-2.5)}px;
            background: #60CEF5;
            border: 1.5px solid #FFFFFF;
            box-sizing: border-box;
            border-radius:50%;
            position: absolute;
            ">
            </div>
        `);
    }

    return [
        `start_${randomID}`,
        `end_${randomID}`,
        `endDot_${randomID}`
    ];
}


function reRenderLines(){

    for(var i=0;i<globalLines.length;i++){
       try{
        destroyLinesInLevel(i);
        var fromElemen = globalLines[i]["from"];
        var toElemen = globalLines[i]["to"];
        var linesAndDot = drawLines(globalLines[i]["from"], globalLines[i]["to"], mainParent);
        globalLines[i] = linesAndDot;
        //save from and to
        globalLines[i]["from"] = fromElemen;
        globalLines[i]["to"] = toElemen;
       }catch(error){}
    }

    
}


function destroyLinesInLevel(level){
    if(!globalLines[level]){
        return
    }
    for(var i=0;i<globalLines[level].length && i<3;i++){
        try{
            document.getElementById(globalLines[level][i]).remove();
        }catch(error){}        
    }
}
function filterArrayText(array,filtered = []){
    var newArray = [];
    newArray = array.filter((item)=>{
        for(var i=0;i<filtered.length;i++){
            try{
                if(filtered[i].test(item.toString())){
                    return true;
                }
            }catch(error){}
        }
        return false;
    });
    
    return newArray;
}