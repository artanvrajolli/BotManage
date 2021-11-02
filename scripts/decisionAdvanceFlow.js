

// is used to remove decision
function removeDecision(inputID){
    document.getElementById(inputID).parentNode.remove();
    if(document.getElementById('boxDecisionHolder').querySelectorAll('input').length < 3){
        document.getElementById('addDecisionButton').style.display = '';
    }
    updateFinalFromDecision();
}
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('addDecisionButton').addEventListener('click',(e)=>{
        var boxDecisionHolder = document.getElementById('boxDecisionHolder');
        var randomIdGen = 'decisionId_'+Math.floor(Math.random()*9999999999);
        boxDecisionHolder.insertAdjacentHTML('beforeend',`
            <div style="position:relative;">
                <span onclick="removeDecision('${randomIdGen}')" class="selected-decision-remove">
                    <i class="far fa-trash-alt"></i>
                </span>
                <input id="${randomIdGen}" name="decisionInputs" class="custom-form-control-rounded" placeholder="Type decision" type="text" />
            </div>
        `);
        
        updateFinalFromDecision();

        if(boxDecisionHolder.querySelectorAll('input').length >=3){
            document.getElementById('addDecisionButton').style.display = 'none';
        }
    });
});


function updateFinalFromDecision(){
    var jCol = document.querySelectorAll('[onclick*="removeDecision"]').length;
    var totalColudBeFinal = document.querySelectorAll('.couldBeFinal'); // min 3 max 6

    for(var i=0;i<totalColudBeFinal.length;i++){
        totalColudBeFinal[i].removeAttribute('final');
    }
    for(var i=jCol*2;i<totalColudBeFinal.length;i++){
        totalColudBeFinal[i].setAttribute('final','');
    }

}