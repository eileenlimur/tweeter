/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  const createTweetElement = function(tweet) {
    const escape = function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
    }
    const $tweet = $(`<article class="tweet">
      <header>
        <section class="user-thumbnail">
          <img src=${escape(tweet['user']['avatars'])}>
          <span>${escape(tweet['user']['name'])}</span>
        </section>
        <span id="handle">${escape(tweet['user']['handle'])}</span>
      </header>
      <p>${escape(tweet['content']['text'])}</p>
      <footer>
        <span>${escape(timeSince(tweet['created_at']))}</span>
        <div>
          <input type="image" src="/images/profile-hex.png">
          <input type="image" src="/images/profile-hex.png">
          <input type="image" src="/images/profile-hex.png">
        </div>
      </footer>
    </article>`);
    return $tweet;
  }

  const timeSince = function(timeStamp) {
    const dateThen = moment(new Date(timeStamp)).format('YYYYMMDD');
    const elapsedTime = moment(dateThen, 'YYYYMMDD').fromNow();
    return elapsedTime;
  }

  const renderTweets = function(tweetsArray) {
    for (let tweetObj of tweetsArray) {
      const $tweet = createTweetElement(tweetObj);
      $('#tweets-container').prepend($tweet);
    }
  }

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      $('#tweets-container').empty();
      renderTweets(data);
    })
  }

  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault(); 
    const $inputs = $('form :input')
    const length = $inputs.val().length;
    if (length === 0) {
      alert("Your tweet is blank!");
    } else if (length > 140) {
      alert("Your tweet is too long!")
    } else {
      $.post('/tweets', $(this).serialize())
        .then(function () {
          loadTweets();
          $inputs.val('');
      });
    }
  });
});