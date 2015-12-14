/**
 * Created by yuansc on 15/1/13.
 */
'use strict';
/*Menu-toggle*/
$("#home").click(function(e) {
    console.log('is realy in toggle 7');
  e.preventDefault();
  $("#wrapper").toggleClass("active");

  //$('#sidebar-wrapper').animate({left:"-250px"},5);
});


$("#home").mouseover(function(e) {
    e.target.style.backgroundImage="url('../images/obtn_c_o.png')";
});

$("#home").mouseout(function(e) {
    e.target.style.backgroundImage="url('../images/obtn_c_d.png')";
});
$("#home").mousedown(function(e) {
    e.target.style.backgroundImage="url('../images/obtn_c_c.png')";
});
$("#home").mouseup(function(e) {
    $("#show_sidebar_btn").show();
    e.target.style.backgroundImage="url('../images/obtn_c_d.png')";
});


$("#show_sidebar_btn").mouseover(function(e) {
    e.target.style.backgroundImage="url('../images/obtn_o_o.png')";
});

$("#show_sidebar_btn").mouseout(function(e) {
    e.target.style.backgroundImage="url('../images/obtn_o_d.png')";
});
$("#show_sidebar_btn").mousedown(function(e) {
    e.target.style.backgroundImage="url('../images/obtn_o_c.png')";
});
$("#show_sidebar_btn").mouseup(function(e) {
    $("#show_sidebar_btn").hide();
    e.target.style.backgroundImage="url('../images/obtn_o_d.png')";
});
$('#show_sidebar_btn').click(function () {
  $("#wrapper").toggleClass("active");
});


/*Scroll Spy*/
$('body').scrollspy({ target: '#spy', offset:80});

/*Smooth link animation*/
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});
