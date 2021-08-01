let scoreboardStingerTriggered = false;
WsSubscribers.subscribe("game", "match_created", function() {
    scoreboardStingerTriggered = false;
    $('.nameboard').addClass('hidden');
});
WsSubscribers.subscribe("game", "post_countdown_begin", function() {
    if (!scoreboardStingerTriggered) {
        let $goalStingerVideo = $(".stinger-container .scoreboard-reveal-stinger video");
        $goalStingerVideo.attr('currentTime', 0);
        $(".stinger-container .scoreboard-reveal-stinger").removeClass("hidden");
        scoreboardStingerTriggered = true;
        setTimeout(function () {
            $goalStingerVideo[0].play();

            setTimeout(function () {
                $('.nameboard').removeClass('hidden');
            }, 500);

            //Set video to hidden after playing just to be safe
            setTimeout(function () {
                $(".stinger-container .scoreboard-reveal-stinger").addClass("hidden");
            }, 2100);
        }, 4000);
    }
});


$("body").click(function() {
   $('.interaction-notice').remove();
});