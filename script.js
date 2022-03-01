const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');



let apiQuotes = [];

//Show new Quote
function newQuote() {
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    // To Check if Author field is blank and replace it with'Unknown'

    if(!quote.author){
        authorText.textContent = 'unknown';
    } else{
        authorText.textContent = quote.author;
    }

    // Check the quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

// Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);//The const will not be populated untill it has some data fetched from our api.
        apiQuotes = await response.json();
        newQuote();
    }catch (error) {
        //Catch Error Here
    }
}

//Tweet Quote 
function tweetQuote() {                 // The reason we are using template string is coz it allows us to pass in a variable amd will be converted into string
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
