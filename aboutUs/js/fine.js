$(function(){
    //视频
    $(document).on("click", ".spans", function () {
        $('.videosowbm').css({
            "display": "block",
        }); 
        $('.videobrandm').addClass("animated bounceIn")
        $('.videobrandm')[0].play();

    });
    $(document).on("click", ".crossm", function () {
        $('.videosowbm').css({
            "display": "none",
        });

        $('.videobrandm')[0].pause();
    });
    $(document).on("mouseenter", ".crossm", function () {
        $('.crossm').css("color", "#cccccc")
    })
    $(document).on("mouseleave", ".crossm", function () {
        $('.crossm').css("color", "rgb(177, 175, 175)")
    })
})