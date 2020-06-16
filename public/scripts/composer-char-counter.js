$(document).ready(function() {
  $('#tweet-text').on('keyup', function(event) {
    let remainingWords = 140 - this.value.length;
    let counter = $(this).closest('form').find('.counter');
    
    counter.html(remainingWords);
    
    if (remainingWords < 0) {
      $(counter).attr('id', 'out-of-words');
    }
    if (remainingWords > 0) {
      $(counter).attr('id', '');
    }

  });
});