const quotes = document.getElementById("quotes");
const author = document.getElementById("author");
const newQuotes = document.getElementById("newQuotes");
const tweetme = document.getElementById("tweetme");
let objData = "";
let quotesData = "";

const tweetNow = () => {
    let tweetPost = `https://twitter.com/intent/tweet?text=${quotesData.text} `;
    window.open(tweetPost);
}

const getNewQuotes = () => {
    let randomQuotes = (Math.floor(Math.random() * 1000));
    quotesData = objData[randomQuotes];
    quotes.innerHTML = `${quotesData.text}`;
    (quotesData.author == null) ?
        author.innerHTML = `<span>unknown"</span>` :
        author.innerHTML = `By ${quotesData.author}`;
}

const getQuotes = async () => {
    const api = "https://type.fit/api/quotes";
    try {
        let data = await fetch(api);
        objData = await data.json();
        getNewQuotes();
    }
    catch (err) {
        console.log(err);
    }

};
newQuotes.addEventListener("click", getQuotes);
tweetme.addEventListener("click", tweetNow);
getQuotes();