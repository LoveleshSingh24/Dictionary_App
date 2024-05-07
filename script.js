const form=document.querySelector('form')
const resultDiv=document.querySelector('.result')
form.addEventListener('submit',(e)=>{
    //prevent reloading
    e.preventDefault();
    getWordInfo(form[0].value);
})

const getWordInfo = async (word)=>{
    try{

        
        const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data=await response.json();
        let definitions=data[0].meanings[0].definitions[0]
        console.log(data);
        resultDiv.innerHTML = `
        <div><h2><strong>Word:</strong>${data[0].word}</h2></div>
        <div>
            <p class="partOfSpeech">
            ${data[0].meanings[0].partOfSpeech}
            </p>
        </div>
        <div>
            <p>
            <strong>Meaning:</strong>
            ${definitions.definition=== undefined ? "Not Found" : definitions.definition}
            </p>
        </div>
        <div>
        <p>
        <strong>Example:</strong>
            ${definitions.example===undefined ? "Not Found" :definitions.example }
        </p>
        </div>
        <p><strong>Antonyms</strong></p>`;
        if(definitions.antonyms.length == 0){
            resultDiv.innerHTML +=`<span>Not Found</span>`;
        }else{
            for(let i=0;i<definitions.antonyms.length;i++){
                resultDiv.innerHTML +=`<li>${definitions.antonyms[i]}</li>`
            }
        }
        //Adding Read More Button
        resultDiv.innerHTML+=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More </a></div>`
    }
    catch(error){
        resultDiv.innerHTML=`<p>Sorry,The Word Could Not Be Found</p>`
    }

}