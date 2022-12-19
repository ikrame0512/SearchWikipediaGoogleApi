console.log("it works !");//for testing the js file
async function searchwiki(s){
    const endpoint=`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|url&utf8=&format=json&origin=*&srlimit=20&srsearch=${s}`;
    const response = await fetch(endpoint);
    if(!response.ok){
        throw Error(response.statusText)
    }
    const json=await response.json();
    return json;

}

async function submitSearch(event){
    event.preventDefault();
    const inputVal=document.querySelector('.search').value;
    const searchquery=inputVal.trim();
    const wordToSearch=document.querySelector('.results');
    wordToSearch.innerHTML=''
    try{
       const res=await searchwiki(searchquery);
       if(res.query.searchinfo.totalhits===0){
        alert('No results found')
        return
       }
       displayresult(res);
    }catch(error){
        console.log(error);
        alert('Failed to search the database')
    }

}
function displayresult(res){
    const wordToSearch=document.querySelector('.results');
    
    res.query.search.forEach(result=>{
        const url =`https://en.wikipedia.org/?curid=${result.pageid}`;
        const time=result.timestamp.substring(0,10);
        wordToSearch.insertAdjacentHTML(

            'beforeend',
            `<div class="mb3"
            <h3>
            <a href="${url}" class="" rel="noopener">${result.title}</a></h3>
            <br>
            <a href="${url}" class="" rel="noopener">${time}</a>
            <span class="text-secondary">${result.snippet}</span></div>
            `

        )
    })
}
const formsend=document.querySelector('.form1');
formsend.addEventListener('submit',submitSearch)