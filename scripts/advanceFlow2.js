// startline global variable
const dd = console.log;
const dde = console.error;

var platformHolder = [];
var currentLevel = 0;
var platformActiveNode = null;
var nextButton = null;
var backButton = null;
window.onload = ()=>{
    platformActiveNode = document.getElementById('triggerToChoose');
    nextButton = document.getElementById('nextButton');
    backButton = document.getElementById('backButton');
}

// endline global variable

// startline tmp variable
var TMPPreviewsSelected = [];
var TMPDefaultValue = [];

// endline tmp variable

/*
Global Variable are more consant than tmp variable that could replace anytime 
*/

function saveCurrentData(){
    try{
        var titleInfo = document.getElementById('titleInfo').innerHTML;
        if(!titleInfo) titleInfo = "Unknown";
    
        var descriptionInfo = document.getElementById('descriptionInfo').innerHTML;
        if(!descriptionInfo) descriptionInfo = "Unknown";
        
        platformHolder[currentLevel] = [];
    
        // SAVE on current
        if(!platformHolder[currentLevel]["current"]){
            platformHolder[currentLevel]["current"] = []
        }
        platformHolder[currentLevel]["current"]["platformId"] = platformActiveNode.getAttribute('id');
        platformHolder[currentLevel]["current"]["platformNode"] = platformActiveNode;
        platformHolder[currentLevel]["current"]["titleInfo"] = titleInfo;
        platformHolder[currentLevel]["current"]["descriptionInfo"] = descriptionInfo;
        var currentForm = platformHolder[currentLevel]["current"]["platformNode"].querySelector('form');
        platformHolder[currentLevel]["current"]["formNode"] = currentForm;
        platformHolder[currentLevel]["current"]["render"] = currentForm.getAttribute('render');
        platformHolder[currentLevel]["current"]["elementSelected"] = TMPPreviewsSelected[currentLevel];
        return 'Everything is OK';
    }catch(err){
        dde(err);
        return 'Something Went Wrong';
    }
    
}

function saveNextData(){
    try{
        var nextPlatformId = platformHolder[currentLevel]["current"]["formNode"].getAttribute('next');
        // SAVE nextStage Data
        platformHolder[currentLevel]["next"] = [];
        platformHolder[currentLevel]["next"]["platformId"] = nextPlatformId;
        platformHolder[currentLevel]["next"]["platformNode"] = document.getElementById(nextPlatformId);
        platformHolder[currentLevel]["next"]["titleInfo"] = platformHolder[currentLevel]["current"]["formNode"].getAttribute('nextTitle');
        platformHolder[currentLevel]["next"]["descriptionInfo"] = platformHolder[currentLevel]["current"]["formNode"].getAttribute('nextDescription');
        platformActiveNode = platformHolder[currentLevel]["next"]["platformNode"];
        platformHolder[currentLevel]["next"]["formNode"] = document.getElementById(platformHolder[currentLevel]["current"]["formNode"].getAttribute('next')).querySelector('form');
        return 'Everything is Ok';
    }catch(err){
        dde(err);
        return 'Something went Wrong!';
    }
}

function isTheNextFinalForm(){
    return platformHolder[currentLevel]["next"]["formNode"].getAttributeNames().includes('final');
}


function selectBox(element_t,localForm,localInput,localValue,nextData){

    //change border of if has previews
    if(TMPPreviewsSelected[currentLevel]){
        TMPPreviewsSelected[currentLevel].style.border = '2px solid #60CEF500';
    }
  
    
    element_t.style.border = '2px solid #60CEF5';
    TMPPreviewsSelected[currentLevel] = element_t; // save element 
    if(!document.querySelector(`[name="${localInput}"]`)){
        localForm.insertAdjacentHTML('beforeend',`
        <input type="text" name="${localInput}" value="${localValue}">
        `);
    }else{
        document.querySelector(`[name="${localInput}"]`).value = localValue;
    }
  

   


    localForm.setAttribute('next',nextData.nextStage);
    localForm.setAttribute('nextTitle',nextData.nextTitle);
    localForm.setAttribute('nextDescription',nextData.nextDescription);
}


function displayNextStage(){
    platformHolder[currentLevel]["current"]["platformNode"].style.display = 'None';
    platformHolder[currentLevel]["next"]["platformNode"].style.display = '';
}
function updateTitleAndDescription(){
    var titleInfo = document.getElementById('titleInfo');
    var descriptionInfo = document.getElementById('descriptionInfo');
    titleInfo.innerHTML = platformHolder[currentLevel]["next"]["titleInfo"];
    descriptionInfo.innerHTML = platformHolder[currentLevel]["next"]["descriptionInfo"];
}


function messageOutput(stringData){
    document.getElementById('messageOutput').innerHTML = stringData;
    setTimeout(()=>{
        document.getElementById('messageOutput').innerHTML = '';
    },5000);
}

function GOnextStage(){
    backButton.style.visibility = '';
    saveCurrentData(); // process to save current data
    if(!checkRequirment()){
        messageOutput("It is necessary to complete the requirement.");
        return null;
    }
    
    if(nextButton.innerHTML == 'Finish'){
        previewPath(true);
        messageOutput("Success is done");
        return null;
    }
    saveNextData(); // process to save next data for render later
    displayNextStage(); // hide current stage show next stage
    updateTitleAndDescription(); // update titleInfo && descriptionInfo
    if(isTheNextFinalForm()) nextButton.innerHTML = 'Finish';
    platformActiveNode = platformHolder[currentLevel]["next"]["platformNode"];
    showOrHideBackArrowButton();
    currentLevel++;
    previewPath();
    showOrHideBackArrowButton();
}



/////////////////// startline GoBackStage
function displayBackStage(){
    platformHolder[currentLevel]["current"]["platformNode"].style.display = '';
    platformHolder[currentLevel]["next"]["platformNode"].style.display = 'None';
}

function updateBackStageTitleAndDescription(){
    var titleInfo = document.getElementById('titleInfo');
    var descriptionInfo = document.getElementById('descriptionInfo');
    titleInfo.innerHTML = platformHolder[currentLevel]["current"]["titleInfo"];
    descriptionInfo.innerHTML = platformHolder[currentLevel]["current"]["descriptionInfo"];
}

function showOrHideBackArrowButton(){
    if(currentLevel == 0){
        document.querySelectorAll('.fa-chevron-left-icon').forEach((item)=>{
            try{
                item.classList.add('display-none-class');
            }catch(err){ dde("At least you tried.")}
        });
    }else{
        document.querySelectorAll('.fa-chevron-left-icon').forEach((item)=>{
            try{
                item.classList.remove('display-none-class');
            }catch(err){ dde("At least you tried.")}
        });
    }
}
function GObackStage(){
    if(currentLevel < 1)return null;
    if(currentLevel == 1){
        backButton.style.visibility = 'hidden';
    }
    showOrHideBackArrowButton();
    currentLevel--;
    previewPath();
    displayBackStage();
    updateBackStageTitleAndDescription();
    platformActiveNode = platformHolder[currentLevel]["current"]["platformNode"];
    nextButton.innerHTML = 'Next';
}
function GOBackTo(level){
    var backFrom = currentLevel-parseInt(level)
    for(var i=0;i<backFrom;i++){
        GObackStage();
    }
}
////////////////// endline GoBackStage

// startline Special Choice
function dropDownChoice(element_t,localForm,nameInput){
    localForm.querySelector(`[name="${nameInput}"]`).value = element_t.value;
}
// endline Special choice

// startline Utils
function checkRequirment(){
    var allInputs = platformHolder[currentLevel]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
    if(allInputs.length == 0){
        return false;
    }
    for(var i=0;i<allInputs.length;i++){
        if(!allInputs[i].value || allInputs[i].value == ""){
            return false;
        }
    }
    return true;
}
// endline Utils

// startline peviewPath
function previewPath(isFinal = false){
    var previewHolder = document.getElementById('previewHolder');
    previewHolder.innerHTML = '';
    var levelRender = currentLevel;
    if(isFinal) {
        levelRender++;
        currentLevel++;
    }

    for(var i=0;i<levelRender;i++){
        var tmpHolder = platformHolder[i]["current"]["titleInfo"];
        // parse Text from Action (Optional) --> Action 
        if(platformHolder[i]["current"]["titleInfo"].includes('(') && 
        platformHolder[i]["current"]["titleInfo"].includes(')') &&
        platformHolder[i]["current"]["titleInfo"].split('(',2)[1].includes(')')){
            platformHolder[i]["current"]["titleInfo"] = platformHolder[i]["current"]["titleInfo"].split('(')[0];
        }
        // render themself for preview
        if(platformHolder[i]["current"]["render"] == 'self'){
            normalBoxRender(i);
        }else if(platformHolder[i]["current"]["render"] == 'cat-space'){
            catSpaceRender(i);
        }else if(platformHolder[i]["current"]["render"] == 'SM-ITA'){
            subjectWithTextArea(i);
        }else if(platformHolder[i]["current"]["render"] == 'one-textarea'){
            oneTextArea(i);
        }
        platformHolder[i]["current"]["titleInfo"] = tmpHolder; // return to the orginal value
        
    }

    // if there is nothing selected or when back from start show this below
    if(previewHolder.innerHTML == ''){
        previewHolder.innerHTML = `
        <div>
            <h5 class="preview-main-title col-12">Choose a trigger</h5>
            <div class="row justify-content-center">
                <div class="col-lg-3 col-4">
                    <div class="d-flex ps-2 canSelect align-items-center">
                        Choose how your visitors will be engaged by the chatbot.
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.querySelector('.preview-holder-content').scrollTop = document.querySelector('.preview-holder-content').scrollHeight;
    if(isFinal) {
        currentLevel--;
    }
}
// endline previewpath

function oneTextArea(i){
    // render input 0 as div for just one
    var inputsList = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
    var inputsListValues = [];
    inputsList.forEach((item)=>{
        inputsListValues.push(item.value);
    });
    if(currentLevel-1 != i)
    var extraBorder = 'border:2px solid #60cef500;';
    else
    var extraBorder = 'border:2px solid rgb(96, 206, 245);';

    previewHolder.insertAdjacentHTML('beforeend',`
    <div>
        <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
        <div class="row justify-content-center">
            <div style="${extraBorder}" onclick="GOBackTo(${i})" class="${currentLevel-1 == i ? '': 'line-to-bottom'}  col-lg-3 col-12 text-start canSelect align-items-center  justify-content-center">
                <div>
                <pre >${inputsListValues[0]}</pre>
                </div>
            </div>
        </div>
    </div>
    `);
}


function subjectWithTextArea(i){
    // render input 0 as Subject and input 1 as TextArea
    var inputsList = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
    var inputsListValues = [];
    inputsList.forEach((item)=>{
        inputsListValues.push(item.value);
    });
    if(currentLevel-1 != i)
    var extraBorder = 'border:2px solid #60cef500;';
    else
    var extraBorder = 'border:2px solid rgb(96, 206, 245);';

    previewHolder.insertAdjacentHTML('beforeend',`
    <div>
        <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
        <div class="row justify-content-center">
            <div style="${extraBorder} ;padding-right: 30px;
            padding-left: 30px;
            padding-top: 10px;padding-bottom: 10px;" onclick="GOBackTo(${i})" class="${currentLevel-1 == i ? '': 'line-to-bottom'}  col-lg-4 col-12 text-start canSelect align-items-center  justify-content-center">
                <div class="form-text">Subject:</div>
                <div class="mb-2" style="font-weight: 600;">${inputsListValues[0]}</div>
                <div class="form-text">Message:</div>
                <div class="text-wrap">${inputsListValues[1]}</div>
            </div>
        </div>
    </div>
    `);
}


function normalBoxRender(i){
    var randomIDGEN = 'preview_'+Math.floor(Math.random()*999999999);
    var newCloneNode = platformHolder[i]["current"]["elementSelected"].cloneNode(true);
    newCloneNode.removeAttribute('onclick');
    newCloneNode.setAttribute('level',i);
    newCloneNode.setAttribute('onclick',`GOBackTo(${i});`);
    if(currentLevel-1 != i)
    newCloneNode.style.border = '2px solid #60cef500';
    else
    newCloneNode.style.border = '2px solid rgb(96, 206, 245);';
    newCloneNode.classList.add('mb-0');
    previewHolder.insertAdjacentHTML('beforeend',`
    <div>
        <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
        <div class="row justify-content-center">
            <div id="${randomIDGEN}" class="${currentLevel-1 == i ? '': 'line-to-bottom'} col-lg-3 col-12">
            </div>
        </div>
    </div>
    `);
    document.getElementById(randomIDGEN).insertAdjacentElement('beforeend',newCloneNode);
}

function catSpaceRender(i){
            // render as concatenated text [form value="t1"] and [form value="t2"] --> t1 t2
            var inputsList = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
            var inputsListValues = [];
            inputsList.forEach((item)=>{
                inputsListValues.push(item.value);
            });

            if(currentLevel-1 != i)
            var extraBorder = 'border:2px solid #60cef500;';
            else
            var extraBorder = 'border:2px solid rgb(96, 206, 245);';

            previewHolder.insertAdjacentHTML('beforeend',`
            <div>
                <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
                <div class="row justify-content-center">
                    <div style="${extraBorder}" onclick="GOBackTo(${i})" class="${currentLevel-1 == i ? '': 'line-to-bottom'} col-lg-3 col-12 d-flex canSelect align-items-center text-center justify-content-center">
                        ${inputsListValues.join(' ')}
                    </div>
                </div>
            </div>
            `);
    
}
function getAllInputs(){
    var formData = new FormData();
    for(var i=0;i<=currentLevel;i++){
        var Inputs = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
        for(var j=0;j<Inputs.length;j++){
            dd(Inputs[j].getAttribute('name'),Inputs[j].value);
            formData.append(Inputs[j].getAttribute('name'),Inputs[j].value);
        }
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            dd("response:",xhttp.responseText);
        }
    };
    xhttp.open("POST", "https://httpbin.org/anything", true);
    xhttp.send(formData);
}
