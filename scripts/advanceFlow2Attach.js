window.addEventListener('DOMContentLoaded', (event) => {
   


    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.target.innerHTML.includes(':')){
                var spliter = mutation.target.innerText.split(':',2)
                mutation.target.innerHTML = `<span class="form-text">${spliter[0]}:</span> ${spliter[1]}`
            }
            if(mutation.target.innerHTML.includes('(') 
            && mutation.target.innerHTML.includes(')') 
            && mutation.target.innerHTML?.split('(',2)[1].includes(')')){
                var spliter = mutation.target.innerText.split('(',2);
                var withOutParsed = mutation.target.innerHTML.split('(',2);
                var silter2 = spliter[1].split(')',2);
                mutation.target.innerHTML = `${withOutParsed[0]}
                <span class="form-text">(${silter2[0]})</span>
                ${silter2[1]}
                `;
            }           
        });   
        observer.disconnect();
        observer.observe(document.querySelector('#titleInfo'), { attributes: false, childList: true, characterData: true }); 
    });
    // pass in the target node, as well as the observer options
    observer.observe(document.querySelector('#titleInfo'), { attributes: false, childList: true, characterData: true });
    /////////////
    var observer2 = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.target.querySelectorAll('input').length <= 0){
                mutation.target.insertAdjacentHTML('beforeend',`
                <input type="text" value="" name="doNotAllowEmptyInput" hidden />
                `);
            }else{
                try{
                    mutation.target.querySelector(`[name="doNotAllowEmptyInput"]`).remove();
                }catch(err){}
            }
        });   
        observer2.disconnect();
        observer2.observe(document.querySelector('#boxDecisionHolder'), { attributes: true, childList: true, characterData: true }); 
       
    });
    observer2.observe(document.querySelector('#boxDecisionHolder'), { attributes: true, childList: true, characterData: true });
    ////////////



        function formatState (state) {
            if (!state.id) {
                return state.text;
            }
            var baseUrl = "imagesBot/Browsers";
            var $state = $(
                '<span><img height="16" src="' + baseUrl + '/' + state.element.value.toLowerCase() + '-icon.svg" class="img-flag" /> ' + state.text + '</span>'
            );
            return $state;
        };

        $(".select2-single-drowdown").select2({
            templateResult: formatState,
            width: '100%',
            placeholder:'Select Browser'
        });

        $('#browserBrowserSelect2').on("select2:select", function(e) { 
            dropDownChoice(document.getElementById('browserBrowserSelect2'),document.querySelector('#CB442'),'browserBrowser');
        });
     
        tinymce.init({
            selector: '#messageEmail',
            height: 400, 
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code',
            ],
            lineheight_formats: "7pt 8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt",
            toolbar: 'undo redo | styleselect | fontsizeselect | ' +
            'bold italic backcolor | lineheight | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            toolbar_location: 'bottom',
            branding: false,
            statusbar: false,
            placeholder: 'Enter message',
            mobile: {
                theme: 'mobile',
            },
            setup:function(editor) {
                editor.on('keyup', function(e) {
                    document.querySelector('[name="messageEmail"]').value = editor.getContent();
                });
                editor.on('change', function(e) {
                    document.querySelector('[name="messageEmail"]').value = editor.getContent();
                });
            }
        });

        tinymce.init({
            selector: '#messageEmailDecision_1',
            height: 400, 
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code',
            ],
            lineheight_formats: "7pt 8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt",
            toolbar: 'undo redo | styleselect | fontsizeselect | ' +
            'bold italic backcolor | lineheight | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            toolbar_location: 'bottom',
            branding: false,
            statusbar: false,
            placeholder: 'Enter message',
            mobile: {
                theme: 'mobile'
            },
            setup:function(editor) {
                editor.on('keyup', function(e) {
                    document.querySelector('[name="messageEmailDecision_1"]').value = editor.getContent();
                });
                editor.on('change', function(e) {
                    document.querySelector('[name="messageEmailDecision_1"]').value = editor.getContent();
                });
            }
        });
        tinymce.init({
            selector: '#messageEmailDecision_2',
            height: 400, 
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code',
            ],
            lineheight_formats: "7pt 8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt",
            toolbar: 'undo redo | styleselect | fontsizeselect | ' +
            'bold italic backcolor | lineheight | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            toolbar_location: 'bottom',
            branding: false,
            statusbar: false,
            placeholder: 'Enter message',
            mobile: {
                theme: 'mobile'
            },
            setup:function(editor) {
                editor.on('keyup', function(e) {
                    document.querySelector('[name="messageEmailDecision_2"]').value = editor.getContent();
                });
                editor.on('change', function(e) {
                    document.querySelector('[name="messageEmailDecision_2"]').value = editor.getContent();
                });
            }
        });
        tinymce.init({
            selector: '#messageEmailDecision_3',
            height: 400, 
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code',
            ],
            lineheight_formats: "7pt 8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt",
            toolbar: 'undo redo | styleselect | fontsizeselect | ' +
            'bold italic backcolor | lineheight | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            toolbar_location: 'bottom',
            branding: false,
            statusbar: false,
            placeholder: 'Enter message',
            mobile: {
                theme: 'mobile'
            },
            setup:function(editor) {
                editor.on('keyup', function(e) {
                    document.querySelector('[name="messageEmailDecision_3"]').value = editor.getContent();
                });
                editor.on('change', function(e) {
                    document.querySelector('[name="messageEmailDecision_3"]').value = editor.getContent();
                });
            }
        });
       
       


        
      var xInterval1 = setInterval(()=>{
        try{
            document.querySelector(".tox-button").click();
            // 3 for decision
            document.querySelector(".tox-button").click();
            document.querySelector(".tox-button").click();
            document.querySelector(".tox-button").click();
            clearInterval(xInterval1);
        }catch(error){}
      },1);

//       var activeCollapse = 0;
//       document.querySelector('.bar-collapse').addEventListener('click',()=>{
//         if(document.documentElement.clientWidth >= 990)
//         collapseSetHolder();
//         else
//         fullCollapseSetHolder();
//         activeCollapse = !activeCollapse;
//         });
      
//     const collapseSetHolder = ()=>{
//         if(activeCollapse == 0 ){;
// //hide set
// $(".set-path-holder-container")[0].style.display = 'None';
// $(".set-path-holder-container")[0].classList.remove('col-4');
// $(".set-path-holder-container")[0].classList.remove('col-12');

// // replace col-8 with col-12
// $(".preview-holder-content")[0].classList.remove('col-8');
// $(".preview-holder-content")[0].classList.add('col-12');
//         }else{
// // show set
// $(".set-path-holder-container")[0].style.display = '';
// $(".set-path-holder-container")[0].classList.add('col-4');

// // replace col-12 with col-8
// $(".preview-holder-content")[0].classList.add('col-8');
// $(".preview-holder-content")[0].classList.remove('col-12');
//         }
//     };

    
    
//     const fullCollapseSetHolder = ()=>{
//         if(activeCollapse == 0 ){
//             $(".set-path-holder-container")[0].style.display = 'None';
//             $(".set-path-holder-container")[0].classList.remove('col-12');


//             $(".preview-holder-content")[0].style.display = '';
//             $(".preview-holder-content")[0].classList.remove('col-8');
//             $(".preview-holder-content")[0].classList.add('col-12');
//         }else{
//             $(".set-path-holder-container")[0].style.display = '';
//             $(".set-path-holder-container")[0].classList.add('col-12');

//             $(".preview-holder-content")[0].style.display = 'None';

//         }
//     };

//     window.onresize = function(){
//         if(document.documentElement.clientWidth < 990 && activeCollapse == 0){
//             fullCollapseSetHolder();
//             activeCollapse = !activeCollapse;
//         }
//     }
//     if(document.documentElement.clientWidth < 990 && activeCollapse == 0){
//         fullCollapseSetHolder();
//         activeCollapse = !activeCollapse;
//     }


    $(".customTextArea").emojioneArea({
        searchPosition: "bottom",
        pickerPosition: "bottom"
    });




    setTimeout(()=>{
        document.querySelectorAll('[class*="emojionearea"]').forEach((item)=> item.style.setProperty('pointer-events','All'));
    },1500)

    
  

});

