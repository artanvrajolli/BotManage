

// is used to remove decision
function removeDecision(inputID){
    document.getElementById(inputID).parentNode.remove();
    if(document.getElementById('boxDecisionHolder').querySelectorAll('input').length < 3){
        document.getElementById('addDecisionButton').style.display = '';
    }
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
        
        if(boxDecisionHolder.querySelectorAll('input').length >=3){
            document.getElementById('addDecisionButton').style.display = 'none';
        }
    });
});

