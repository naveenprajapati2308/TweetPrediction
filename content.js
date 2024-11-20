document.addEventListener("DOMContentLoaded", () => {
    const tweets = document.querySelectorAll("article");
    tweets.forEach((tweet) => {
      if (!tweet.querySelector(".predict-button")) {
        const button = document.createElement("button");
        button.innerText = "Predict";
        button.className = "predict-button";
        button.style = "margin: 10px; padding: 5px 10px; background: #1da1f2; color: white; border: none; border-radius: 5px; cursor: pointer;";
        button.onclick = () => {
          const tweetId = tweet.getAttribute("data-tweet-id");
          alert(`Predicting virality for tweet ID: ${tweetId}`);
        };
        tweet.appendChild(button);
      }
    });
  });
  