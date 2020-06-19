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
      <p style="word-break: break; word-wrap: break-word;">${escape(tweet['content']['text'])}</p>
      <footer>
        <span>${escape(timeSince(tweet['created_at']))}</span>
        <div>
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
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
    if (length === 0 || $.trim($inputs.val()).length === 0) {
      $('.errors')
        .attr('id', '')
        .attr('id', 'error')
        .html("<p><i class='fa fa-exclamation' aria-hidden='true'></i> ZEN BIRDY ERROR: Your tweet is blank!</p>");
      $('.errors').hide().slideDown('slow')
    } else if (length > 140) {
      $('.errors')
        .attr('id', '')
        .attr('id', 'error')
        .html("<p><i class='fa fa-exclamation' aria-hidden='true'></i> WORDY BIRDY ERROR: Your tweet is too long!</p>");
      $('.errors').hide().slideDown('slow');
    } else {
      $('.errors').slideUp('slow')
      $.post('/tweets', $(this).serialize())
        .then(function () {
          $('.counter').html('140');
          $('.errors').attr('id', '');
          $('.errors').html('');
          loadTweets();
          $inputs.val('');
      });
    }
  });
});