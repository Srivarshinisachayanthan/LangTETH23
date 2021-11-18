var count;

firebase.database().ref('Count/').once('value', (Parentevent)=> {
    count = Parentevent.val().count;
    console.log(count);
})

firebase.database().ref('Lang/').once('value', (Parentevent)=> {

    console.log("This is once function");
    console.log(Parentevent.val());

    // get parent unique id from the user database : 
    let ParentEventValues =  (Object.keys(Parentevent.val())).toString().split(',');

    // // get all old message id's for one time retriewal from database : 
    for(let ParentEventIter = 0; ParentEventIter < ParentEventValues.length; ParentEventIter++){
        
        firebase.database().ref('Lang/').child(ParentEventValues[ParentEventIter]).once('value', (ChildEvent)=> {
            
            let P = ChildEvent.val();
            let a = P.Tamil;
            let b = P.English;
            let c = P.Telugu;
            let d = P.Hindi;

            $('#Appendable').append("<tr><td>" + a + "</td><td>"+ b + "</td><td>"+ c + "</td><td>"+ d + "</td>" );        
        }); 

    }

});



$('#sendBtn').on('click', (e)=> { 

    e.preventDefault();
    var TamilInput = $('#TamilInput').val();
    var EnglishInput = $('#EnglishInput').val();
    var TeluguInput = $('#TeluguInput').val();
    var HindiInput = $('#HindiInput').val();

    if(TamilInput == "" && EnglishInput =="" && TeluguInput=="" && HindiInput=="" ) 
    {    
        alert("Message content is NULL...\n please type some message or select files or photos before send");
    }
    else
    {            
        firebase.database().ref('Lang/'+count+'/').set({
            English         : EnglishInput,
            Tamil           : TamilInput,
            Telugu          : TeluguInput,
            Hindi           : HindiInput
        });
        count+=1
        firebase.database().ref('Count/').set({
            count : count
        })
    }
    $('#Appendable').append("<tr><td>" + TamilInput + "</td><td>"+ EnglishInput + "</td><td>"+ TeluguInput + "</td><td>"+ HindiInput + "</td>" );
});