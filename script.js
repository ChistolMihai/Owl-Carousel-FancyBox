$().fancybox({
  selector: '.main-owl .owl-item:not(.cloned) a',
  hash: false,
  toolbar: "auto",
  thumbs: {
    autoStart: true
  },
  buttons: [
    'zoom',
    'download',
    'close',
    'share',
    'slideShow',
    'fullScreen',
    'thumbs'
  ]
});

$(document).ready(function () {
  var mainOwl = $("#main-owl");
  var secondOwl = $("#second-owl");
  var slidesPerPage = 3;
  var syncedSecondary = true;

  mainOwl.owlCarousel({
    items: 1,
    lazyLoad: true,
    nav: true,
    autoplay: false,
    navigation: true,
    autoHeight: true,
    loop: true,
    responsiveRefreshRate: 200,
    navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
  }).on('changed.owl.carousel', syncPosition);

  secondOwl
    .on('initialized.owl.carousel', function () {
      secondOwl.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: slidesPerPage,
      lazyLoad: true,
      smartSpeed: 200,
      slideSpeed: 500,
      margin: 15,
      autoHeight: true,
      slideBy: slidesPerPage,
      responsiveRefreshRate: 100
    }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    secondOwl
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = secondOwl.find('.owl-item.active').length - 1;
    var start = secondOwl.find('.owl-item.active').first().index();
    var end = secondOwl.find('.owl-item.active').last().index();

    if (current > end) {
      secondOwl.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      secondOwl.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      mainOwl.data('owl.carousel').to(number, 100, true);
    }
  }

  secondOwl.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    mainOwl.data('owl.carousel').to(number, 300, true);
  });
});