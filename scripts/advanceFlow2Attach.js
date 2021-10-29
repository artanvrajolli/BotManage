window.addEventListener('DOMContentLoaded', (event) => {
   
      // configuration of the observer:
      var config = { attributes: true, childList: true, characterData: true };

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            
            if(mutation.target.innerHTML.includes(':')){
                var spliter = mutation.target.innerHTML.split(':',2)
                mutation.target.innerHTML = `<span class="form-text">${spliter[0]}:</span> ${spliter[1]}`
            }

            
            if(mutation.target.innerHTML.includes('(') 
            && mutation.target.innerHTML.includes(')') 
            && mutation.target.innerHTML?.split('(',2)[1].includes(')')){
                
                var spliter = mutation.target.innerHTML.split('(',2);
                var silter2 = spliter[1].split(')',2);
mutation.target.innerHTML = `${spliter[0]}
<span class="form-text">(${silter2[0]})</span>
${silter2[1]}
`;
            }
            
        });   
        observer.disconnect();
        observer.observe(document.querySelector('#titleInfo'), config); 
    });
    // pass in the target node, as well as the observer options
    observer.observe(document.querySelector('#titleInfo'), config);



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

        $('#test123test').on("select2:select", function(e) { 
            dropDownChoice(document.getElementById('test123test'),document.querySelector('#CB442'),'browserBrowser');
        });

        tinymce.init({
            selector: '#messageEmail',
            height: 400,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code'
            ],
            toolbar: 'undo redo | styleselect | fontsizeselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            toolbar_location: 'bottom',
            branding: false,
            statusbar: false,
            placeholder: 'Enter message',
            setup:function(editor) {
                editor.on('keyup', function(e) {
                    document.querySelector('[name="messageEmail"]').value = editor.getContent();
                });
                editor.on('change', function(e) {
                    document.querySelector('[name="messageEmail"]').value = editor.getContent();
                });
            }
        });

        
      var xInterval1 = setInterval(()=>{
        try{
            document.querySelector('.tox-notification__dismiss').click();
            clearInterval(xInterval1);
        }catch(error){}
      });

      var activeCollapse = 0;
      document.querySelector('.bar-collapse').addEventListener('click',()=>{
        if(document.documentElement.clientWidth >= 990)
        collapseSetHolder();
        else
        fullCollapseSetHolder();
        activeCollapse = !activeCollapse;
    });
      
    const collapseSetHolder = ()=>{
        if(activeCollapse == 0 ){;
//hide set
$(".set-path-holder-container")[0].style.display = 'None';
$(".set-path-holder-container")[0].classList.remove('col-4');
$(".set-path-holder-container")[0].classList.remove('col-12');

// replace col-8 with col-12
$(".preview-holder-content")[0].classList.remove('col-8');
$(".preview-holder-content")[0].classList.add('col-12');
        }else{
// show set
$(".set-path-holder-container")[0].style.display = '';
$(".set-path-holder-container")[0].classList.add('col-4');

// replace col-12 with col-8
$(".preview-holder-content")[0].classList.add('col-8');
$(".preview-holder-content")[0].classList.remove('col-12');
        }
    };

    
    
    const fullCollapseSetHolder = ()=>{
        if(activeCollapse == 0 ){
            $(".set-path-holder-container")[0].style.display = 'None';
            $(".set-path-holder-container")[0].classList.remove('col-12');


            $(".preview-holder-content")[0].style.display = '';
            $(".preview-holder-content")[0].classList.remove('col-8');
            $(".preview-holder-content")[0].classList.add('col-12');
        }else{
            $(".set-path-holder-container")[0].style.display = '';
            $(".set-path-holder-container")[0].classList.add('col-12');

            $(".preview-holder-content")[0].style.display = 'None';

        }
    };

    
    if(document.documentElement.clientWidth < 990){
        fullCollapseSetHolder();
        activeCollapse = !activeCollapse;
    }


});