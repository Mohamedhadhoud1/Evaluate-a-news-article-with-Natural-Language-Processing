const get = async(url = '', data = {}) => {
    console.log(data);
    url = `http://localhost:8080/add?target=${data.formUrl}`;
 
    console.log('url' , url)
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },

    });


    try {
       let data = await response.json();
        console.log("response at get", data);
        return data;
      } catch (err) {
        console.log("Error", err);
      }
}


const content =(data)=>{
  document.getElementById('1').innerHTML=`text:     ${data.text}`
  document.getElementById('2').innerHTML=`agreement :     ${data.agreement}`
  document.getElementById('3').innerHTML=`subjectivity :    ${data.subjectivity}`
  document.getElementById('4').innerHTML=`confidence :     ${data.confidence}`
  document.getElementById('4').innerHTML=`irony :     ${data.irony}`
  document.getElementById('6').innerHTML=`score_tag :    ${data.score_tag}`

}

  function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formUrl = document.getElementById('name').value
   if(Client.checkForUrl(formUrl)){
         get("http://localhost:8080/add",{formUrl}).then(data=>{
        content(data)
        })
   }else{
       alert("Not a Valid URL")
   }
}

export { handleSubmit,get }
