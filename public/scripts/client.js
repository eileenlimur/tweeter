/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const createTweetElement = function(tweet) {
    const $tweet = $(`<article>
      <header class="tweet">
        <section class="user-thumbnail">
          <img src=${tweet['user']['avatars']}>
          <span>${tweet['user']['name']}</span>
        </section>
        <span id="handle">${tweet['user']['handle']}</span>
      </header>
      <p>${tweet['content']['text']}</p>
      <footer>
        <span>${timeSince(tweet['created_at'])}</span>
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

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweetsArray) {
    for (let tweetObj of tweetsArray) {
      const $tweet = createTweetElement(tweetObj);
      $('#tweets-container').append($tweet)
    }
  }

  renderTweets(tweetData);

});

$('document').ready(() => {
  $('button').on('click')
  $.ajax('more-posts.html', {
    method: 'GET' })
    .then(function (morePostsHtml) {
      console.log('Success: ', morePostsHtml);
      $button.replaceWith(morePostsHtml);
  });
});