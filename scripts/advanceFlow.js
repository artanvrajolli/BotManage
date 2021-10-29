function customText(element_t, forFormData) {
    var nameF = forFormData.name;
    var valueF = forFormData.value;
    var nextS = forFormData.next;
    nextTitle = forFormData.title;
    nextDescription = forFormData.description;

    if (!mainForm.querySelector(`[name*="${nameF}"`)) {
        mainForm.insertAdjacentHTML("beforeend", `
        <input level="f_${currentLevel}" type="text" name="${nameF}" value="${valueF}">
        `)
    } else {
        mainForm.querySelector(`[name*="${nameF}"`).setAttribute('value', valueF);
    }

    currentStageId = element_t.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
    saveInLevelHolder(currentStageId, arguments.callee.name, nextS,element_t,forFormData);
}

function selectBox(element_t, forFormData) {
    var nameF = forFormData.name;
    var valueF = forFormData.value;
    var nextS = forFormData.next;
    var render = forFormData.render;


    if (!mainForm.querySelector(`[name*="${nameF}"`)) {
        mainForm.insertAdjacentHTML("beforeend", `
            <input level="f_${currentLevel}" render="${render}" type="text" name="${nameF}" value="${valueF}">
        `);
    } else {
        mainForm.querySelector(`[name*="${nameF}"`).setAttribute('value', valueF);
    }

    var allSiblings = element_t.parentNode.children;

    for (var i = 0; i < allSiblings.length; i++) {
        item = allSiblings[i];
        item.children[0].style.border = '2px solid #25313c00';
    }

    // activate selected box 
    element_t.children[0].style.border = '2px solid #60CEF5';

    // save for nextStage butten when is clicked
    currentStageId = element_t.parentNode.parentNode.getAttribute('id');
    saveInLevelHolder(currentStageId, arguments.callee.name, nextS, element_t,forFormData);
}

function nextStage() {
    document.getElementById(levelHolder[currentLevel]["next"]).style.display = '';
    document.getElementById(levelHolder[currentLevel]["current"]).style.display = 'none';
    updateNextTitleDescription();
    currentLevel++;
    previewRender();
}

function saveInLevelHolder(currentStageId, nameFunctionUsed, nextS,currentElmSelected,forFormData) {
    levelHolder[currentLevel] = [];
    levelHolder[currentLevel]["current"] = currentStageId;
    levelHolder[currentLevel]["functionUsed"] = nameFunctionUsed;
    levelHolder[currentLevel]["currentTitle"] = document.getElementById('titleInfo').innerHTML;
    levelHolder[currentLevel]["next"] = nextS;
    levelHolder[currentLevel]["currentElmSelected"] = currentElmSelected;
    levelHolder[currentLevel]["nextTitle"] = forFormData.title;
    levelHolder[currentLevel]["nextDescription"] = forFormData.description;
}

function updateNextTitleDescription() {
    if (levelHolder[currentLevel]["nextTitle"]) {
        document.getElementById('titleInfo').innerHTML = levelHolder[currentLevel]["nextTitle"];
    }
    if (levelHolder[currentLevel]["nextDescription"]) {
        document.getElementById('descriptionInfo').innerHTML = levelHolder[currentLevel]["nextDescription"];
    }
}

function previewRender(){
    var previewHolder = document.getElementById('previewHolder');
    previewHolder.innerHTML = '';
    for(var i=0;i<currentLevel;i++){
        var x = document.querySelectorAll(`[level="f_${i}"]`);
        var renderTypes = [];

        for(var j=0;j<x.length;j++){
            renderTypes.push(x[j].getAttribute('render'));
        }
        if(renderTypes.includes('self')){
            var randomId = 'previeBox_'+Math.floor(Math.random()*999999999);
            previewHolder.insertAdjacentHTML('beforeend',`
            <h5 class="mt-5 mb-2 col-12">${levelHolder[i]["currentTitle"]}</h5>
            <div class="row justify-content-center">
                <div id="${randomId}" class="col-4"></div>
            </div>
            `);
            var cloneChild = levelHolder[i]["currentElmSelected"].children[0].cloneNode(true);
            document.getElementById(randomId).insertAdjacentElement('beforeend',cloneChild)
        }
    }
}
/*
current: "dayChoose"
currentElmSelected: select.form-select.form-select-lg
currentTitle: "Day"
functionUsed: "customText"
next: "actionChose"
nextDescription: "What condition is needed in order to make next execute"
nextTitle: "Action"
*/
function destroyInLevel(level){
    for(var i=level+1;i<currentLevel;i++){
        document.getElementById(levelHolder[i]["current"]).style.display = 'None';
        try{
            levelHolder[i]["currentElmSelected"].children[0].style.border = '2px solid #25313c00';
        }catch(error){}
        document.getElementById(levelHolder[i]["next"]).style.display = 'None';
        destroyGroupElements(`[level="f_${i}"]`);
        delete levelHolder[i];
    }
    document.getElementById(levelHolder[level]["current"]).style.display = '';
    document.getElementById(levelHolder[level]["next"]).style.display = 'None';
    currentLevel = level;

}


function destroyGroupElements(elemntIndentitet){
    var x = document.querySelectorAll(elemntIndentitet);
    for(var i=0;i<x.length;i++){
        try{
            x[i].remove();
        }catch(error){}
    }
}