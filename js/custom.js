/* 
                ------------------------------------------------------------------
                |     Author ::::::::::    BroCoders                              |
                |     Title :::::::::::    Super Eventawy                         |
                |     Tools Used ::::::    Bootstrap & SASS & jQuery & Firebase   |
                |     Date of Start :::    4-2-2019                               |
                |     Date of End :::::    18-2-2019                              |   
                ------------------------------------------------------------------

*/
$(".user-down").click(function() {
    $(".user-list").toggleClass("active");
}), "/index.html" != location.pathname && "/" != location.pathname || $(".reviews-slider").owlCarousel({
    rtl: !0,
    loop: !0,
    margin: 10,
    nav: !1,
    autoplay: !0,
    autoplayTimeout: 4e3,
    autoplayHoverPause: !0,
    smartSpeed: 900,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 2
        }
    }
}), "/control-panel.html" == location.pathname && ($(".bar button").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active");
}), $(".general-btn").click(function() {
    $(".general").show().siblings().hide();
}), $(".members-btn").click(function() {
    $(".members").show().siblings().hide();
}), $(".courses-btn").click(function() {
    $(".courses").show().siblings().hide();
}), $(".events-btn").click(function() {
    $(".events").show().siblings().hide();
}), $(".news-btn").click(function() {
    $(".news").show().siblings().hide();
}), $(".team-btn").click(function() {
    $(".team").show().siblings().hide();
}), $(".regs-btn").click(function() {
    $(".regs").show().siblings().hide();
}), $(".control-courses-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".control-courses-div").show(), 
    $(".edit-courses-div").hide(), $(".add-courses-div").hide();
}), $(".add-courses-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".add-courses-div").show(), 
    $(".edit-courses-div").hide(), $(".control-courses-div").hide();
}), $(".control-events-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".control-events-div").show(), 
    $(".edit-events-div").hide(), $(".add-events-div").hide();
}), $(".add-events-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".add-events-div").show(), 
    $(".edit-events-div").hide(), $(".control-events-div").hide();
}), $(".control-news-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".control-news-div").show(), 
    $(".edit-news-div").hide(), $(".add-news-div").hide();
}), $(".add-newsSection-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".add-news-div").show(), 
    $(".edit-news-div").hide(), $(".control-news-div").hide();
}), $(".control-members-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".control-members-div").show(), 
    $(".edit-members-div").hide(), $(".add-members-div").hide();
}), $(".add-members-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".add-members-div").show(), 
    $(".edit-members-div").hide(), $(".control-members-div").hide();
}), $(".background-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".background").show(), 
    $(".video").hide(), $(".stats").hide(), $(".sponsors").hide(), $(".gallery").hide();
}), $(".video-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".video").show(), 
    $(".background").hide(), $(".stats").hide(), $(".sponsors").hide(), $(".gallery").hide();
}), $(".stats-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".stats").show(), 
    $(".background").hide(), $(".video").hide(), $(".sponsors").hide(), $(".gallery").hide();
}), $(".sponsors-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".sponsors").show(), 
    $(".background").hide(), $(".stats").hide(), $(".video").hide(), $(".gallery").hide();
}), $(".gallery-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".gallery").show(), 
    $(".background").hide(), $(".stats").hide(), $(".video").hide(), $(".sponsors").hide();
})), "/registration.html" == location.pathname && ($(".reg-courses-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".courses-request-div").show(), 
    $(".events-request-div").hide(), $(".successful-join").hide();
}), $(".reg-events-btn").click(function() {
    $(this).addClass("active"), $(this).siblings().removeClass("active"), $(".events-request-div").show(), 
    $(".courses-request-div").hide(), $(".successful-join").hide();
})), "/about.html" != location.pathname && "/gallery.html" != location.pathname || ($(".ReciveImages").on("click", ".image-div", function() {
    var a = $(this).children(".image").children("img").attr("src");
    $("#myModal").css("display", "block"), $("#img01").attr("src", a), console.log("done");
}), $(".close").click(function() {
    $("#myModal").css("display", "none");
}));

// ENABLE DESGIN MODE
$(function() {
    editorBody.document.designMode = "On";
});

// Image Command
$(".E-image").click(function(){
    var img = prompt('Enter the image URL', 'http://');
    executeCommand('insertImage', img);
});

// Link Command
$(".E-link").click(function(){
    var linkURL = prompt('Enter a URL:', 'http://');
    executeCommand('createLink', linkURL);
});

// Unlink Command
$(".E-unlink").click(function(){
    executeCommand('unlink');
});

// Aligning Right Command
$(".E-right").click(function(){
    executeCommand('justifyRight');
});

// Aligning Center Command
$(".E-center").click(function(){
    executeCommand('justifyCenter');
});

// Aligning Left Command
$(".E-left").click(function(){
    executeCommand('justifyLeft');
});

// Making Bold Command
$(".E-bold").click(function(){
    executeCommand('bold');
});

// Making Italic Command
$(".E-italic").click(function(){
    executeCommand('italic');
});

// Making Underline Command
$(".E-underline").click(function(){
    executeCommand('underline');
});

// Making Strikethrough Command
$(".E-strikethrough").click(function(){
    executeCommand('strikeThrough');
});

// Making Unordered Command
$(".E-listu").click(function(){
    executeCommand('insertUnorderedList');
});

// Making Ordered Command
$(".E-listo").click(function(){
    executeCommand('insertOrderedList');
});

// Indent Command
$(".E-indent").click(function(){
    executeCommand('indent');
});

// Outdent Command
$(".E-outdent").click(function(){
    executeCommand('outdent');
});

// Making Line Command
$(".E-line").click(function(){
    executeCommand('insertHorizontalRule');
});

// Sub Script Command
$(".E-subscript").click(function(){
    executeCommand('subscript');
});

// Super Script Command
$(".E-superscript").click(function(){
    executeCommand('superscript');
});

// Select All Command
$(".E-select").click(function(){
    executeCommand('selectAll');
});

// Undo Command
$(".E-undo").click(function(){
    executeCommand('undo');
});

// Execute Buttons Commands On Our Typing Area
function executeCommand (command, arg) {
    if( arg == false ){
        editorBody.document.execCommand(command, false, null);
    } else {
        editorBody.document.execCommand(command, false, arg);
    }
}


// ENABLE DESGIN MODE
$(function() {
    editorBodyNewEvent.document.designMode = "On";
});

// Execute Buttons Commands On Our Typing Area
function executeCommandNE (command, arg) {
    if( arg == false ){
        editorBodyNewEvent.document.execCommand(command, false, null);
    } else {
        editorBodyNewEvent.document.execCommand(command, false, arg);
    }
}





// ENABLE DESGIN MODE
$(function() {
    editorBodyNewNews.document.designMode = "On";
});

// Execute Buttons Commands On Our Typing Area
function executeCommandNN (command, arg) {
    if( arg == false ){
        editorBodyNewNews.document.execCommand(command, false, null);
    } else {
        editorBodyNewNews.document.execCommand(command, false, arg);
    }
}





// ENABLE DESGIN MODE
$(function() {
    editorBodyEditNews.document.designMode = "On";
});

// Execute Buttons Commands On Our Typing Area
function executeCommandEN (command, arg) {
    if( arg == false ){
        editorBodyEditNews.document.execCommand(command, false, null);
    } else {
        editorBodyEditNews.document.execCommand(command, false, arg);
    }
}