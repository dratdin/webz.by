var oswaldL = new FontFaceObserver('Oswald', {weight: 300});
var oswaldR = new FontFaceObserver('Oswald', {weight: 500});

Promise.all([oswaldL.load(), oswaldR.load()]).then(function () {
  $('body').css('font-family','Oswald');
});

var pL = new FontFaceObserver('Panton', {weight: 100});
var pB = new FontFaceObserver('Panton', {weight: 'bold'});

Promise.all([pL.load(), pB.load()]).then(function () {
  $('.title, .logo, .step__number, .form label').css('font-family','Panton');
});

$(document).ready(function() {

  $('.menu_mobile .menu__lnk').click(function(){
    $('.btn-menu').click();
  });

  $('.openForm').click(function(){
    $('#formPopup').fadeIn();
    $('body').css('overflow','hidden');
  });

  $('.modalContent__close').click(function() {
    $('.modalBg').fadeOut();
    $('body').css('overflow','visible');
  });

  $('.productCard__openInfo').click(function() {
    $(this).parent().find('.productCard__info').fadeIn();
    $('body').css('overflow','hidden');
  });

  $('.mosaicAlbum__Photo').click(function() {
    $(this).parent().find('.mosaicAlbum__Description').fadeIn();
    $('body').css('overflow','hidden');
  });

  $('input[name = phone]').mask('+375 (99) 999-99-99');

  function selectCategory(category) {
    if(category == null) {
      $('.mosaicAlbum__Photo').show();
    } else {
      $('.mosaicAlbum__Photo[data-info != ' + category +']').hide();
      $('.mosaicAlbum__Photo[data-info = ' + category +']').show();
    }
  }

  $('.picker__category').click(function() {
    $('.picker__category').removeClass('picker__category_selected');
    $( this ).addClass('picker__category_selected');
  });
  $('#album-all').click(function() {selectCategory();});
  $('#album-landings').click(function() {selectCategory('landing-page');});
  $('#album-vitit-cards').click(function() {selectCategory('visit-card');});
  $('#album-corporate').click(function() {selectCategory('corporate');});

  $('.owl-carousel').owlCarousel({
    loop:true,
    nav:true,
    dots: false,
    navText: ["<",">"],
    margin:10,
    items:1
  });

  Share = {
    vkontakte: function(purl, ptitle, pimg, text) {
      url  = 'http://vk.com/share.php?';
      url += 'url='          + encodeURIComponent(purl);
      url += '&title='       + encodeURIComponent(ptitle);
      url += '&image='       + encodeURIComponent(pimg);
      url += '&noparse=true';
      Share.popup(url);
    },
    facebook: function(purl, ptitle, pimg, text) {
      url  = 'http://www.facebook.com/sharer.php?s=100';
      url += '&p[title]='     + encodeURIComponent(ptitle);
      url += '&p[summary]='   + encodeURIComponent(text);
      url += '&p[url]='       + encodeURIComponent(purl);
      url += '&p[images][0]=' + encodeURIComponent(pimg);
      Share.popup(url);
    },
    twitter: function(purl, ptitle) {
      url  = 'http://twitter.com/share?';
      url += 'text='      + encodeURIComponent(ptitle);
      url += '&url='      + encodeURIComponent(purl);
      url += '&counturl=' + encodeURIComponent(purl);
      Share.popup(url);
    },
    popup: function(url) {
      window.open(url,'','toolbar=0,status=0,width=626,height=436');
    }
  };

  var shareTitle = 'Webz.by - Разработка и создание сайтов.',
  shareDescription = 'Исследование вашего рынка и конкурентов, уникальный дизайн и гарантия. Цены ниже рыночных, имеется система скидок, если хотите еще девешле!',
  shareImgPath = '../img/logoWebz.png',
  siteUrl = 'webz.by';
  $('.facebook').click(function() {Share.facebook(siteUrl,shareTitle,shareImgPath,shareDescription)});
  $('.tweeter').click(function() {Share.twitter(siteUrl,shareTitle)});

  $("form").submit(function() {
    var form = $(this);
    $.ajax({
      type: "GET",
      url: "mail.php",
      data: form.serialize(),
      success: function(msg) {
        var data = JSON.parse(msg);
        $('.modalBg').hide();
        $('#thanks .title').html(data.title);
        $('#thanks .text').html(data.text).append(data.errors);
        $('#thanks').fadeIn();
      }
    });
    return false;
  });
});
