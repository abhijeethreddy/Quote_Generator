const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader')

let apiQuotes=[];

//loader functions
function load(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}
// Show Quote
function newQuote(){
    load();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    if(!quote.author){
        authorText.textContent='Unknown';
    }else{
        authorText.textContent=quote.author;
    }
    if(quote.text.length>120){
        quoteContainer.classList.add('long-quote');
    }
    else{
        quoteContainer.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    complete();
}

//  Get Quotes from api
async function getQuotes(){
    load();
    const apiurl='https://type.fit/api/quotes';
    try{
        const response=await fetch(apiurl);
        apiQuotes =await response.json();
        newQuote();
    }
    catch(error){
        //Catch Error Here
        alert(error);
    }
}
//TweetQuote
function TweetQuote(){
    const tweeterurl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweeterurl,'_blank');
}

//Event listners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',TweetQuote);
//On load
getQuotes();