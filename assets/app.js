$(document).ready(function() {

  $('.owl-carousel').owlCarousel({
    loop:true,
    nav:true,
    dots: false,
    navText: ["<",">"],
    margin:10,
    items:1
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

  Share = {
    vkontakte: function(purl, ptitle, pimg, text) {
      url  = 'http://vkontakte.ru/share.php?';
      url += 'url='          + encodeURIComponent(purl);
      url += '&title='       + encodeURIComponent(ptitle);
      url += '&description=' + encodeURIComponent(text);
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
  shareImgPath = '../img/five-icon.png',
  siteUrl = 'webz.by';
  $('.vk').click(function() {Share.vkontakte(siteUrl,shareTitle,shareImgPath,shareDescription)});
  $('.f').click(function() {Share.facebook(siteUrl,shareTitle,shareImgPath,shareDescription)});
  $('.t').click(function() {Share.twitter(siteUrl,shareTitle)});

  $("form").submit(function() {
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: $("form").serialize()
    }).done(function() {
      $('.modalBg').hide();
      $('#thanks').fadeIn();
    });
    return false;
  });
});
