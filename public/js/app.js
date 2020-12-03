 const weatherSubmit = document.querySelector("form");
 const submitQuery = document.querySelector("input")
 const messageOne = document.querySelector("#message-1");
 const messageTwo = document.querySelector("#message-2");

 weatherSubmit.addEventListener('submit',(e)=>{
    messageOne.textContent = `Loading..`;
    messageTwo.textContent = 'Loading..';
    e.preventDefault();
    fetch(`http://localhost:3000/weather?location=${submitQuery.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageTwo.textContent = data.error;
            }else{
               messageOne.textContent = data.location;
               messageTwo.textContent = data.temperature;
            }
        })
    });       
 });