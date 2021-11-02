// startline global variable
const dd = console.log;
const dde = console.error;

var platformHolder = [];
var currentLevel = 0;
var platformActiveNode = null;
var nextButton = null;
var backButton = null;
window.onload = () => {
    // on load save next and back button on variables and as starting platform triggerTochoose
    platformActiveNode = document.getElementById('triggerToChoose');
    nextButton = document.getElementById('nextButton');
    backButton = document.getElementById('backButton');
}

// endline global variable

// startline tmp variable
var TMPPreviewsSelected = [];
var TMPDefaultValue = [];
var TMPDecisionData = [];
// endline tmp variable

/*
    On the TMP Variables are saved about everything
    when the path is change etc. 
    On the global Variables are saved only currentPath path
*/


// save currentdata that been select or choosen
function saveCurrentData() {
    try {
        var titleInfo = document.getElementById('titleInfo').innerHTML;
        if (!titleInfo) titleInfo = "Unknown";

        var descriptionInfo = document.getElementById('descriptionInfo').innerHTML;
        if (!descriptionInfo) descriptionInfo = "Unknown";

        platformHolder[currentLevel] = [];

        // SAVE on current
        if (!platformHolder[currentLevel]["current"]) {
            platformHolder[currentLevel]["current"] = []
        }
        platformHolder[currentLevel]["current"]["platformId"] = platformActiveNode.getAttribute('id');
        platformHolder[currentLevel]["current"]["platformNode"] = platformActiveNode;
        platformHolder[currentLevel]["current"]["titleInfo"] = titleInfo;
        platformHolder[currentLevel]["current"]["descriptionInfo"] = descriptionInfo;
        var currentForm = platformHolder[currentLevel]["current"]["platformNode"].querySelector('form');
        platformHolder[currentLevel]["current"]["formNode"] = currentForm;
        platformHolder[currentLevel]["current"]["formNodeId"] = currentForm.getAttribute('id');
        platformHolder[currentLevel]["current"]["render"] = currentForm.getAttribute('render');
        platformHolder[currentLevel]["current"]["elementSelected"] = TMPPreviewsSelected[currentForm.getAttribute('id')];
        return 'Everything is OK';
    } catch (err) {
        dde(err);
        return 'Something Went Wrong';
    }

}

// save nextData that will be used
function saveNextData() {
    try {
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
    } catch (err) {
        dde(err);
        return 'Something went Wrong!';
    }
}

// check the next form if is final/finish 
function isTheNextFinalForm() {
    return platformHolder[currentLevel]["next"]["formNode"].getAttributeNames().includes('final');
}

function selectBox(element_t, localForm, localInput, localValue, nextData) {
    if(!localForm.getAttribute('id')){
        dde("LocalForm required to have id and has to be unique!");
        return;
    }
    var localFormID = localForm.getAttribute('id');
    
    //change border if has previews
    if (TMPPreviewsSelected[localFormID]) {
        TMPPreviewsSelected[localFormID].style.border = '2px solid #60CEF500';
    }
    if (TMPPreviewsSelected[localFormID] != element_t) {
        element_t.style.border = '2px solid #60CEF5';
        TMPPreviewsSelected[localFormID] = element_t; // save element 
      
        if (!document.querySelector(`[name="${localInput}"]`)) {
            localForm.insertAdjacentHTML('beforeend', `
            <input type="text" name="${localInput}" value="${localValue}">
            `);
        } else {
            document.querySelector(`[name="${localInput}"]`).value = localValue;
        }
    } else {
        document.querySelector(`[name="${localInput}"]`).value = "";
        TMPPreviewsSelected[localFormID].style.border = '2px solid #60CEF500';
        TMPPreviewsSelected[localFormID] = null;

        localForm.setAttribute('next', "");
        localForm.setAttribute('nextTitle', "");
        localForm.setAttribute('nextDescription', "");
    }

    localForm.setAttribute('next', nextData.nextStage);
    localForm.setAttribute('nextTitle', nextData.nextTitle);
    localForm.setAttribute('nextDescription', nextData.nextDescription);
}


function displayNextStage() {
    platformHolder[currentLevel]["current"]["platformNode"].style.display = 'None';
    platformHolder[currentLevel]["next"]["platformNode"].style.display = '';
}
function updateTitleAndDescription() {
    var titleInfo = document.getElementById('titleInfo');
    var descriptionInfo = document.getElementById('descriptionInfo');
    titleInfo.innerHTML = platformHolder[currentLevel]["next"]["titleInfo"];
    descriptionInfo.innerHTML = platformHolder[currentLevel]["next"]["descriptionInfo"];
}


function messageOutput(stringData) {
    document.getElementById('messageOutput').innerHTML = stringData;
    setTimeout(() => {
        document.getElementById('messageOutput').innerHTML = '';
    }, 5000);
}

function GOnextStage() {
    backButton.style.visibility = '';
    saveCurrentData(); // process to save current data
    if (!checkRequirment()) {
        messageOutput("It is necessary to complete the requirement.");
        return null;
    }

    if (nextButton.innerHTML == 'Finish') {
        previewPath(true);
        messageOutput("Success is done");
        return null;
    }
    saveNextData(); // process to save next data for render later
    displayNextStage(); // hide current stage show next stage
    updateTitleAndDescription(); // update titleInfo && descriptionInfo
    if (isTheNextFinalForm()) nextButton.innerHTML = 'Finish';
    platformActiveNode = platformHolder[currentLevel]["next"]["platformNode"];
    showOrHideBackArrowButton();
    currentLevel++;
    previewPath();
    showOrHideBackArrowButton();

}



/////////////////// startline GoBackStage
function displayBackStage() {
    platformHolder[currentLevel]["current"]["platformNode"].style.display = '';
    platformHolder[currentLevel]["next"]["platformNode"].style.display = 'None';
}

function updateBackStageTitleAndDescription() {
    var titleInfo = document.getElementById('titleInfo');
    var descriptionInfo = document.getElementById('descriptionInfo');
    titleInfo.innerHTML = platformHolder[currentLevel]["current"]["titleInfo"];
    descriptionInfo.innerHTML = platformHolder[currentLevel]["current"]["descriptionInfo"];
}

function showOrHideBackArrowButton() {
    if (currentLevel == 0) {
        document.querySelectorAll('.fa-chevron-left-icon').forEach((item) => {
            try {
                item.classList.add('display-none-class');
            } catch (err) { dde("At least you tried.") }
        });
    } else {
        document.querySelectorAll('.fa-chevron-left-icon').forEach((item) => {
            try {
                item.classList.remove('display-none-class');
            } catch (err) { dde("At least you tried.") }
        });
    }
}
function GObackStage() {
    if (currentLevel < 1) return null;
    if (currentLevel == 1) {
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
function GOBackTo(level) {
    var backFrom = currentLevel - parseInt(level)
    for (var i = 0; i < backFrom; i++) {
        GObackStage();
    }
}
////////////////// endline GoBackStage

// startline Special Choice
function dropDownChoice(element_t, localForm, nameInput) {
    localForm.querySelector(`[name="${nameInput}"]`).value = element_t.value;
}
// endline Special choice

// startline Utils
function checkRequirment() {
    var allInputs = platformHolder[currentLevel]["current"]["formNode"].querySelectorAll('input:not(.search)[type="text"],textarea,input[type="checkbox"]');

    if (allInputs.length == 0) {
        return false;
    }
    for (var i = 0; i < allInputs.length; i++) {
        
        if (!allInputs[i].value || allInputs[i].value == "") {
            return false;
        }
    }
    return true;
}
// endline Utils

// startline peviewPath
function previewPath(isFinal = false) {
    var previewHolder = document.getElementById('previewHolder');
    previewHolder.innerHTML = '';
    var levelRender = currentLevel;
    if (isFinal) {
        levelRender++;
        currentLevel++;
    }

    for (var i = 0; i < levelRender; i++) {
        var tmpHolder = platformHolder[i]["current"]["titleInfo"];
        // parse Text from Action (Optional) --> Action 
        if (platformHolder[i]["current"]["titleInfo"].includes('(') &&
            platformHolder[i]["current"]["titleInfo"].includes(')') &&
            platformHolder[i]["current"]["titleInfo"].split('(', 2)[1].includes(')')) {
            platformHolder[i]["current"]["titleInfo"] = platformHolder[i]["current"]["titleInfo"].split('(')[0];
        }
        // render themself for preview
        if (platformHolder[i]["current"]["render"] == 'self') {
            normalBoxRender(i);
        } else if (platformHolder[i]["current"]["render"] == 'cat-space') {
            catSpaceRender(i);
        } else if (platformHolder[i]["current"]["render"] == 'SM-ITA') {
            subjectWithTextArea(i);
        } else if (platformHolder[i]["current"]["render"] == 'one-textarea') {
            oneTextArea(i);
        } else if (platformHolder[i]["current"]["render"] == 'dayOfWeek-r1'){
            dayOfWeekRender(i);
        } else if (platformHolder[i]["current"]["render"] == 'multiDecision'){
            multiDecisionRender(i);
        }



        platformHolder[i]["current"]["titleInfo"] = tmpHolder; // return to the orginal value

    }

    // if there is nothing selected or when back from start show this below
    if (previewHolder.innerHTML == '') {
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
    if (isFinal) {
        currentLevel--;
    }
}
// endline previewpath

// startline types of rendering
function multiDecisionRender(i){
    var inputsList = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
    var extraBorder = currentLevel - 1 != i ? 'border:2px solid #60cef500;' : 'border:2px solid rgb(96, 206, 245);';
    previewHolder.insertAdjacentHTML('beforeend', `
    <div>
        <h5 class="preview-main-title col-12">Decision message</h5>
        <div class="row justify-content-around line-to-bottom">
            <div style="display: flex;flex-direction: column;flex-wrap: wrap;align-content: flex-start;justify-content: flex-end;min-width: 50%;max-width: 50%;" class="canSelect simple-text-aligned">
                <pre>${inputsList[0].value}</pre>
            </div>
        </div>
        <h5 class="preview-main-title col-12">Decision answers</h5>
        <div id="ACDS-Holder" class="parentMultiDecision container row justify-content-around">
            
        </div>
    </div>
    `);
    var ACDSHolder = document.getElementById('ACDS-Holder');
    for(var j=1;j<inputsList.length;j++){
        ACDSHolder.insertAdjacentHTML('beforeend',`
        <div class="childMultiDecision_${i} canSelect-limited row col-3 line-to-bottom justify-content-center">
            <div class="row d-flex w-100 justify-content-center line-to-bottom">
                <div class="w-100  canSelect d-flex align-items-center justify-content-center">
                    ${inputsList[j].value}
                </div>
            </div>
            <!-- to be used later 
            <div class="row d-flex w-100 justify-content-center line-to-bottom">
                <h5 class="preview-main-title col-12">Decision message</h5>
                <div class="w-75 canSelect d-flex align-items-center justify-content-center">
                    SomeDAta
                </div>
            </div>
            -->
        </div>`);
        TMPDecisionData[j] = [];
        TMPDecisionData[j]["value"] = inputsList[j].value;
        
    }
          
}


function oneTextArea(i) {
    // render input 0 as div for just one
    var inputsList = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
    var inputsListValues = [];
    inputsList.forEach((item) => {
        inputsListValues.push(item.value);
    });
    if (currentLevel - 1 != i)
        var extraBorder = 'border:2px solid #60cef500;';
    else
        var extraBorder = 'border:2px solid rgb(96, 206, 245);';

    previewHolder.insertAdjacentHTML('beforeend', `
    <div>
        <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
        <div class="row justify-content-center ${currentLevel - 1 == i ? '' : 'line-to-bottom'}">
            <div style="${extraBorder}" onclick="GOBackTo(${i})" class="col-lg-3 col-12 canSelect simple-text-aligned">
                <div>
                <pre>${inputsListValues[0]}</pre>
                </div>
            </div>
        </div>
    </div>
    `);
}


function subjectWithTextArea(i) {
    // render input 0 as Subject and input 1 as TextArea
    var inputsList = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
    var inputsListValues = [];
    inputsList.forEach((item) => {
        inputsListValues.push(item.value);
    });
    if (currentLevel - 1 != i)
        var extraBorder = 'border:2px solid #60cef500;';
    else
        var extraBorder = 'border:2px solid rgb(96, 206, 245);';

    previewHolder.insertAdjacentHTML('beforeend', `
    <div>
        <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
        <div class="row justify-content-center ${currentLevel - 1 == i ? '' : 'line-to-bottom'}">
            <div style="${extraBorder} ;padding-right: 30px;
            padding-left: 30px;
            padding-top: 10px;padding-bottom: 10px;" onclick="GOBackTo(${i})" class="col-lg-4 col-12 text-start canSelect align-items-center  justify-content-center">
                <div class="form-text">Subject:</div>
                <div class="mb-2" style="font-weight: 600;">${inputsListValues[0]}</div>
                <div class="form-text">Message:</div>
                <div class="text-wrap">${inputsListValues[1]}</div>
            </div>
        </div>
    </div>
    `);
}


function normalBoxRender(i) {
    var randomIDGEN = 'preview_' + Math.floor(Math.random() * 999999999);
    var newCloneNode = platformHolder[i]["current"]["elementSelected"].cloneNode(true);
    newCloneNode.removeAttribute('onclick');
    newCloneNode.setAttribute('level', i);
    newCloneNode.setAttribute('onclick', `GOBackTo(${i});`);
    if (currentLevel - 1 != i)
        newCloneNode.style.border = '2px solid #60cef500';
    else
        newCloneNode.style.border = '2px solid rgb(96, 206, 245);';
    newCloneNode.classList.add('mb-0');
    previewHolder.insertAdjacentHTML('beforeend', `
    <div>
        <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
        <div class="row justify-content-center ${currentLevel - 1 == i ? '' : 'line-to-bottom'}">
            <div id="${randomIDGEN}" class=" col-lg-3 col-12">
            </div>
        </div>
    </div>
    `);
    document.getElementById(randomIDGEN).insertAdjacentElement('beforeend', newCloneNode);
}

function catSpaceRender(i) {
    // render as concatenated text [form value="t1"] and [form value="t2"] --> t1 t2
    var inputsList = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
    var inputsListValues = [];
    inputsList.forEach((item) => {
        inputsListValues.push(item.value);
    });
    extraBorder = currentLevel - 1 != i ? 'border:2px solid #60cef500;' : 'border:2px solid rgb(96, 206, 245);';
    previewHolder.insertAdjacentHTML('beforeend', `
    <div>
        <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
        <div class="row justify-content-center ${currentLevel - 1 == i ? '' : 'line-to-bottom'}">
            <div class="col-lg-3 col-12">
                <div class="box-format canSelect mb-0" style="${extraBorder}" level="${i}" onclick="GOBackTo(${i})">
                    <span class="box-select-content-text">${inputsListValues.join(' ')}</span>
                </div>
            </div>
        </div>
    </div>
    `);
}
// render day1,day2,day3 ---> day1-(dot)-day2-(dot)-day3
function dayOfWeekRender(i){
    var inputsList = platformHolder[i]["current"]["formNode"].querySelector('input').value;
    var parsedValues = inputsList.split(',') ? inputsList.split(',') : [inputsList];
    var extraBorder = currentLevel - 1 != i ? 'border:2px solid #60cef500;' : 'border:2px solid rgb(96, 206, 245);';
    previewHolder.insertAdjacentHTML('beforeend', `
    <div>
        <h5 class="preview-main-title col-12">${platformHolder[i]["current"]["titleInfo"]}</h5>
        <div class="row justify-content-center ${currentLevel - 1 == i ? '' : 'line-to-bottom'}">
            <div>
                <div class="d-flex justify-content-center">
                    <div class="box-format canSelect mb-0" style="${extraBorder} padding-right: 30px;
                    padding-left: 30px;" level="${i}" onclick="GOBackTo(${i})">
                        <span class="box-select-content-text">${parsedValues.join('<span class="small-dot"></span>')}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `);
}
// endline types of rendering

// startline for backend get the inputs choosen
function getAllInputs() {
    var formData = new FormData();
    for (var i = 0; i <= currentLevel; i++) {
        var Inputs = platformHolder[i]["current"]["formNode"].querySelectorAll('input:not(.search),textarea');
        for (var j = 0; j < Inputs.length; j++) {
            dd(Inputs[j].getAttribute('name'), Inputs[j].value);
            formData.append(Inputs[j].getAttribute('name'), Inputs[j].value);
        }
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            dd("response:", xhttp.responseText);
        }
    };
    xhttp.open("POST", "https://httpbin.org/anything", true);
    xhttp.send(formData);
}
// endline for backend get the inputs choosen


// startline checkBoxHandler
function checkBoxSetValue(parentElement,inputName,valueInput,localFormElement){
    var orderDayOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var onclickElementInput = parentElement.querySelector('input');
    var inputElement = localFormElement.querySelector(`[name="${inputName}"]`);
    
    // first element
    if(!inputElement.value && onclickElementInput.checked){
        inputElement.value = valueInput;
        return;
    }
    var parsedValue = inputElement?.value?.split(',') ? inputElement?.value?.split(',') : [inputElement.value];
    //push if not in list
    if(!parsedValue.includes(valueInput) && onclickElementInput.checked){
        parsedValue.push(valueInput);
        // order the week
        var tmpParsedValue = [];
        for(var i=0;i<orderDayOfWeek.length;i++){
            if(parsedValue.includes(orderDayOfWeek[i])){
                tmpParsedValue.push(orderDayOfWeek[i]);
            }
        }
        parsedValue = tmpParsedValue;

        inputElement.value = parsedValue.join(',');
    }
    // on unched remove from list
    if(!onclickElementInput.checked){
        const index = parsedValue.indexOf(valueInput);
        if (index > -1) {
            parsedValue.splice(index, 1);
        }
        inputElement.value = parsedValue.join(',')
    }
    
}
// endline checkBoxHandler


