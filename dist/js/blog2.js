"use strict";

// filter Js 
$(document).ready(function () {
  $('.filter-item').click(function () {
    var vaule = $(this).attr('data-filter');
    if (vaule == 'all') {
      $('.post-box').show('1000');
    } else {
      $(".post-box").not("." + vaule).hide("1000");
      $(".post-box").filter("." + vaule).show("1000");
    }
  });
  // Add active to btn 
  $(".filter-item").click(function () {
    $(this).addClass("active-filter").siblings().removeClass("active-filter");
  });
});

//let section = document.querySelector('section')

//window.addEventListener('scroll', () => {
//  section.classList.toggle('shadow', window.scrollY > 0);
//});