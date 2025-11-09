// ====================================
// Initialize on DOM Load
// ====================================
$(document).ready(function () {
  // Initialize AOS
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease',
  });

  // Ensure first typo is active on load
  $('.main_typo_1').addClass('active');

  // Initialize FullPage
  initFullPage();

  // Initialize Main Slider
  initMainSlider();

  // Initialize Header
  initHeader();

  // Initialize Mobile Menu
  initMobileMenu();

  // Initialize Smooth Scroll
  initSmoothScroll();

  // Initialize Language Toggle
  initLanguageToggle();

  // Refresh AOS after everything loads
  setTimeout(function () {
    AOS.refresh();
  }, 100);
});

// ====================================
// FullPage.js Initialization
// ====================================
function initFullPage() {
  if ($('#fullpage').length) {
    $('#fullpage').fullpage({
      paddingTop: '0',
      scrollingSpeed: 800,
      easingcss3: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      css3: true,
      anchors: ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6'],
      verticalCentered: false,
      scrollHorizontally: true,
      menu: '#fullpageMenu',
      autoScrolling: true,
      scrollBar: true,
      scrollOverflow: false,
      responsiveWidth: 1280,
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      credits: { enabled: false },

      onLeave: function (origin, destination, direction) {
        // Update body classes based on section
        if (destination.index == 0 || destination.index == 3) {
          $('body').removeClass('color');
        } else {
          $('body').addClass('color');
        }

        // Add scrolled class
        if (destination.index == 0) {
          $('body').removeClass('scrolled');
        } else {
          $('body').addClass('scrolled');
        }
      },
    });
  }
}

// ====================================
// Main Visual Slider
// ====================================
function initMainSlider() {
  if ($('#main_vis_slider').length) {
    var $slider = $('#main_vis_slider');
    var autoplaySpeed = 5000;
    var isPlaying = true;

    $slider.slick({
      dots: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: autoplaySpeed,
      pauseOnHover: false,
      arrows: false,
    });

    // Update pagination
    $slider.on(
      'beforeChange',
      function (event, slick, currentSlide, nextSlide) {
        $('.pagingInfo').text(nextSlide + 1);

        // Update main typo text
        $('.main_typo').removeClass('active');
        $('.main_typo_' + (nextSlide + 1)).addClass('active');

        // Add class for slide 4 to adjust position
        if (nextSlide === 3) {
          $('#main_vis').addClass('slide4_active');
        } else {
          $('#main_vis').removeClass('slide4_active');
        }

        // Reset progress bar
        $('.progress_bar').removeClass('progress_bar_active');
        setTimeout(function () {
          $('.progress_bar').addClass('progress_bar_active');
        }, 50);
      }
    );

    // Check initial slide
    var initialSlide = $slider.slick('slickCurrentSlide');
    if (initialSlide === 3) {
      $('#main_vis').addClass('slide4_active');
    }

    // Progress bar animation
    $('.progress_bar').addClass('progress_bar_active');

    // Prev button
    $('.prev').on('click', function () {
      $slider.slick('slickPrev');
    });

    // Next button
    $('.next').on('click', function () {
      $slider.slick('slickNext');
    });

    // Play/Pause button
    $('.play').on('click', function () {
      if (isPlaying) {
        $slider.slick('slickPause');
        $(this).hide();
        $('.pause').show();
        $('.cir_progress_value').removeClass('active');
        isPlaying = false;
      }
    });

    $('.pause').on('click', function () {
      if (!isPlaying) {
        $slider.slick('slickPlay');
        $(this).hide();
        $('.play').show();
        $('.cir_progress_value').addClass('active');
        isPlaying = true;
      }
    });
  }
}

// ====================================
// Header Scroll Effects
// ====================================
function initHeader() {
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('body').addClass('scrolled');
    } else {
      $('body').removeClass('scrolled');
    }
  });

  // Submenu hover
  var menuTimer;

  // 개별 메뉴 항목 호버
  $('.gnb .lm').hover(
    function () {
      clearTimeout(menuTimer);
      var $this = $(this);

      // 가로 배치이므로 고정 높이 사용
      var bgHeight = 80;

      // 헤더 상태에 따라 배경색 설정
      var isWhiteHeader =
        $('body').hasClass('scrolled') ||
        $('body').hasClass('color') ||
        $('#header_wrap').hasClass('sub');

      $('.snb_bg')
        .stop()
        .css({
          display: 'block',
          height: bgHeight + 'px',
          padding: '30px 100px',
          background: isWhiteHeader
            ? 'rgba(255, 255, 255, 0.75)'
            : 'rgba(0, 0, 0, 0.75)',
          borderTopColor: isWhiteHeader
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.2)',
        });

      // 헤더에 menu-open 클래스 추가
      $('.header-inner').addClass('menu-open');

      // 먼저 모든 세부메뉴에서 active 클래스 제거
      $('.snb').removeClass('active');
      // 현재 메뉴의 세부메뉴에만 active 클래스 추가
      $this.find('.snb').addClass('active');
    },
    function () {
      var $this = $(this);
      menuTimer = setTimeout(function () {
        $('.snb_bg').stop().css({
          height: '0',
          display: 'none',
          padding: '0',
        });
        // 헤더에서 menu-open 클래스 제거
        $('.header-inner').removeClass('menu-open');
        // 모든 세부메뉴에서 active 클래스 제거
        $('.snb').removeClass('active');
      }, 1000);
    }
  );

  // 배경 영역 호버 시 메뉴 유지
  $('.snb_bg').hover(
    function () {
      clearTimeout(menuTimer);
      $('.header-inner').addClass('menu-open');
    },
    function () {
      menuTimer = setTimeout(function () {
        $('.snb_bg').stop().css({
          height: '0',
          display: 'none',
          padding: '0',
        });
        // 헤더에서 menu-open 클래스 제거
        $('.header-inner').removeClass('menu-open');
        // 모든 세부메뉴에서 active 클래스 제거
        $('.snb').removeClass('active');
      }, 1000);
    }
  );
}

// ====================================
// Mobile Menu Toggle
// ====================================
function initMobileMenu() {
  // Open mobile menu
  $('.menu_slider_btn').on('click', function () {
    $('.hidden_nav').addClass('active');
    $('.hidden_nav_box').addClass('active');
    $('body').css('overflow', 'hidden');
  });

  // Close mobile menu
  $('.menu_slider_btn2, .hidden_nav_box').on('click', function () {
    $('.hidden_nav').removeClass('active');
    $('.hidden_nav_box').removeClass('active');
    $('body').css('overflow', '');
  });

  // Mobile submenu toggle
  $('.h_lm > a').on('click', function (e) {
    if ($(window).width() <= 768) {
      e.preventDefault();
      $(this).next('.h_snb').slideToggle(300);
      $(this).parent().siblings().find('.h_snb').slideUp(300);
    }
  });

  // Close menu on link click
  $('.h_snb a').on('click', function () {
    setTimeout(function () {
      $('.hidden_nav').removeClass('active');
      $('.hidden_nav_box').removeClass('active');
      $('body').css('overflow', '');
    }, 300);
  });
}

// ====================================
// Smooth Scroll
// ====================================
function initSmoothScroll() {
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this).attr('href');

    if (target === '#' || target === '') {
      return;
    }

    // Check if fullpage is active
    if (typeof fullpage_api !== 'undefined' && $(target).hasClass('section')) {
      e.preventDefault();
      var anchorLink = $(target).data('anchor');
      if (anchorLink) {
        fullpage_api.moveTo(anchorLink);
      }
    }
  });
}

// ====================================
// Language Toggle
// ====================================
// Translation data
var translations = {
  ko: {
    // Navigation
    'nav.company': '회사소개',
    'nav.business': '사업영역',
    'nav.rnd': '연구개발',
    'nav.support': '고객지원',
    'nav.overview': '회사개요',
    'nav.history': '회사연혁',
    'nav.certification': '인증현황',
    'nav.location': '오시는길',
    'nav.compressor': '압축기',
    'nav.edge_server': '초대규모 IoT 네트워크',
    'nav.rtk': 'RTK',
    'nav.monitoring': '모니터링시스템',
    'nav.hydrogen': '수소저장합금',
    'nav.rnd_center': '연구소',
    'nav.rnd_field': '연구분야',
    'nav.notice': '공지사항',
    'nav.inquiry': '문의하기',

    // Main Visual
    'main.typo1.title': '산업의 동력을 이끄는<br />정밀 압축 기술의 선도기업',
    'main.typo1.desc':
      '석유화학, 발전소부터 수소플랜트까지<br />산업 현장에 최적화된 압축 솔루션을 제공합니다.',
    'main.typo2.title': '스마트시티의 초대규모 IoT 네트워크',
    'main.typo2.desc':
      'IoT 디바이스가 도심 곳곳에서 실시간 데이터를 수집하고,<br />Massive IoT 표준 기반의 무선 네트워크를 통해<br />도시를 안전하고 효율적으로 연결합니다.',
    'main.typo3.title': '실시간 데이터로 산업의 안전과 효율을 모니터링하다.',
    'main.typo3.desc':
      '설비에 설치된 다양한 센서로부터 데이터를 수집·분석하여<br />이상 징후를 실시간으로 감지하고,<br />산업 현장의 안전과 운영 효율을 극대화합니다.',
    'main.typo4.title': '센티미터 단위의 정밀함, RTK로 완성하다.',
    'main.typo4.desc':
      'RTK 기술은 위성 신호를 실시간 보정하여 센티미터급 위치 정밀도를 구현하고,<br />자율주행과 드론, 농업 자동화 등 정밀 제어 산업의 기반이 됩니다.',

    // Overview Section
    'overview.title': '회사개요',
    'overview.desc':
      '㈜슬레노는 산업용 압축기, RTK 정밀 위치 시스템, IoT 모니터링 솔루션,<br />그리고 수소저장합금 기술을 기반으로 한 산업·에너지 융합 기술기업입니다.<br />정밀한 기술과 혁신적인 데이터 솔루션으로 산업의 안전, 효율,<br />그리고 지속가능한 미래를 만들어갑니다.',
    'overview.btn': '더보기',
    'overview.company': '회사명',
    'overview.ceo': '대표이사',
    'overview.established': '설립연도',

    // Business Area
    'business.compressor': '압축기',
    'business.edge_server': '초대규모 IoT 네트워크',
    'business.rtk': 'RTK',
    'business.monitoring': '모니터링시스템',
    'business.hydrogen': '수소저장합금',
    'business.more_view': '더보기',

    // R&D Section
    'rnd.title': '연구개발',
    'rnd.desc':
      '산업용 압축기, RTK 정밀 위치 시스템, IoT 모니터링 솔루션,<br />그리고 수소저장합금 기술을 기반으로 한 혁신적인 연구개발을 통해<br />산업의 안전과 효율, 지속가능한 미래를 만들어갑니다.',
    'rnd.btn': '더보기',

    // Notice Section
    'notice.title': '공지사항',
    'notice.btn': '더보기',
    'notice.label': '공지사항.',
    'notice.content.title': 'SLENO 홈페이지를 방문해주셔서 감사합니다',
    'notice.content.desc': 'SLENO 홈페이지를 방문해주셔서 감사합니다.',

    // Sub Pages
    'sub.overview.title': '회사개요',
    'sub.overview.desc':
      '㈜슬레노는 산업용 압축기, RTK 정밀 위치 시스템, IoT 모니터링 솔루션,<br />그리고 수소저장합금 기술을 기반으로 한 산업·에너지 융합 기술기업입니다.<br />정밀한 기술과 혁신적인 데이터 솔루션으로 산업의 안전, 효율,<br />그리고 지속가능한 미래를 만들어갑니다.',
    'sub.overview.intro': '회사 소개',
    'sub.overview.intro.desc':
      '㈜슬레노는 산업용 압축기, RTK 정밀 위치 시스템, IoT 모니터링 솔루션,<br />그리고 수소저장합금 기술을 기반으로 한 산업·에너지 융합 기술기업입니다.<br />정밀한 기술과 혁신적인 데이터 솔루션으로 산업의 안전, 효율,<br />그리고 지속가능한 미래를 만들어갑니다.',
    'sub.overview.mission': '우리의 사명',
    'sub.overview.mission.desc':
      '일반 IoT 고객에게 기술적으로 접근 가능하고 비용 효율적인 카메라 모듈 솔루션을 제공하여 덜 주목받는 비모바일 및 비자동차 시장 부문의 비전 기능 통합을 가속화합니다.',
    'sub.overview.location': '위치',
    'sub.overview.location.value': '경기도 광명시',
    'sub.overview.company.name': '주식회사 슬레노',
    'sub.overview.ceo.name': '신동휘',

    'sub.compressor.title': '압축기',
    'sub.compressor.desc': '산업의 동력을 이끄는 정밀 압축 기술',
    'sub.compressor.intro': '산업용 압축기 솔루션',
    'sub.compressor.intro.desc':
      '석유화학 및 발전소부터 수소 플랜트까지, 모든 산업 현장에 맞춤형 압축 솔루션을 제공합니다. 우리의 압축기는 신뢰성, 효율성을 보장 합니다.',
    'sub.compressor.efficiency': '고효율',
    'sub.compressor.efficiency.desc': '최대 에너지 효율을 위한 최적화된 설계',
    'sub.compressor.reliability': '신뢰성',
    'sub.compressor.reliability.desc': '가혹한 산업 환경을 견딜 수 있도록 제작',
    'sub.compressor.customization': '맞춤화',
    'sub.compressor.customization.desc': '특정 응용 분야를 위한 맞춤 솔루션',
    'sub.compressor.performance': '성능',
    'sub.compressor.performance.desc': '우수한 성능 지표 및 사양',

    'sub.notice.title': '공지사항',
    'sub.notice.desc': '최신 뉴스 및 공지사항',
    'sub.notice.greeting.title': 'SLENO 홈페이지를 방문해주셔서 감사합니다',
    'sub.notice.greeting.desc': 'SLENO 홈페이지를 방문해주셔서 감사합니다.',

    'sub.history.title': '회사연혁',
    'sub.history.desc': '혁신과 성장의 여정',
    'sub.history.2024_2027.title': 'AI기반수소산업Platform',
    'sub.history.2024_2027.desc': 'AI기반수소산업Platform 구축 및 운영',
    'sub.history.2024_2025.title': '수소기업R&D Hub 구축사업',
    'sub.history.2024_2025.desc':
      '수소기업R&D Hub 구축사업(액화수소안전모니터링시스템개발)<br />액화수소관련특허출원 (2건)<br />수소설비관련특허출원 (2건)',
    'sub.history.2024.title': '주요 성과',
    'sub.history.2024.desc':
      'ISO45001 인증획득<br />기업부설 연구소 설립<br />벤처기업 인증 (제 20240702030068호)<br />수소 전문기업 인증 (제 2024-0011호)<br />H2AI 인수합병',
    'sub.history.2023.title': '인증 및 사업 확장',
    'sub.history.2023.desc':
      'ISO14001 인증획득<br />㈜지이 사명변경<br />에너지신산업(수소) 안전모니터링시스템개발및실증',
    'sub.history.2022.title': 'ISO9001 인증획득',
    'sub.history.2022.desc': 'ISO9001 인증획득',
    'sub.history.2021.title': '연구개발 및 협약',
    'sub.history.2021.desc':
      '연구개발전담부서 설립<br />H2 Comp Packaging 협약채결',
    'sub.history.2020.title': '특허 및 기술개발',
    'sub.history.2020.desc':
      '수소압축기Packaging용특수공구특허등록<br />LNG BOG 압축기부품국산화개발',
    'sub.history.2019.title': '법인 설립',
    'sub.history.2019.desc': '지티씨 엔지니어링 ㈜ 법인 설립',

    'sub.edge_server.title': '초대규모 IoT 네트워크',
    'sub.edge_server.desc': '스마트시티를 위한 초대규모 IoT 네트워크 솔루션',
    'sub.edge_server.intro': '초대규모 IoT 네트워크',
    'sub.edge_server.intro.desc':
      'IoT 디바이스가 도심 곳곳에서 실시간 데이터를 수집하고, Massive IoT 표준 기반의 무선 네트워크를 통해 도시를 안전하고 효율적으로 연결합니다.',
    'sub.edge_server.performance': '대규모 연결',
    'sub.edge_server.performance.desc':
      '수많은 IoT 디바이스를 동시에 연결하고 관리',
    'sub.edge_server.latency': '실시간 데이터 수집',
    'sub.edge_server.latency.desc': '도심 곳곳에서 실시간 데이터 수집 및 전송',
    'sub.edge_server.connectivity': 'Massive IoT 표준',
    'sub.edge_server.connectivity.desc':
      '표준 기반의 무선 네트워크로 안정적인 연결',
    'sub.edge_server.security': '스마트시티 통합',
    'sub.edge_server.security.desc':
      '도시 인프라와 효율적으로 통합되는 네트워크',

    'sub.rnd_center.title': '연구소',
    'sub.rnd_center.desc': '차세대 기술을 위한 혁신 허브',
    'sub.rnd_center.intro': '연구개발',
    'sub.rnd_center.intro.desc':
      '우리의 연구소는 최첨단 기술 및 솔루션 개발에 전념하고 있습니다. 최첨단 시설과 전문 연구진으로 구성된 팀을 통해 지속적으로 혁신의 경계를 넓혀가고 있습니다.',
    'sub.rnd_center.labs': '고급 연구실',
    'sub.rnd_center.labs.desc': '최첨단 연구 시설',
    'sub.rnd_center.team': '전문 팀',
    'sub.rnd_center.team.desc': '경험이 풍부한 연구원 및 엔지니어',
    'sub.rnd_center.innovation': '혁신',
    'sub.rnd_center.innovation.desc': '최첨단 기술 개발',
    'sub.rnd_center.collaboration': '협력',
    'sub.rnd_center.collaboration.desc': '선도 기관과의 파트너십',

    'sub.inquiry.title': '문의하기',
    'sub.inquiry.desc': '더 많은 정보를 위해 문의해 주세요',
    'sub.inquiry.name': '이름',
    'sub.inquiry.company': '회사',
    'sub.inquiry.email': '이메일',
    'sub.inquiry.phone': '전화번호',
    'sub.inquiry.subject': '제목',
    'sub.inquiry.message': '메시지',
    'sub.inquiry.send': '문의 보내기',
    'sub.inquiry.contact': '연락처 정보',

    'sub.certification.title': '인증현황',
    'sub.certification.desc': '품질 인증 및 특허',

    'sub.location.title': '오시는길',
    'sub.location.desc': '본사를 방문해 주세요',
    'sub.location.headquarters': '본사',
    'sub.location.address': '주소',
    'sub.location.address.ko':
      '경기도 광명시 덕안로104번길 17, 13층 1306~7호<br />(일직동, 광명역엠클러스터)',
    'sub.location.address.en':
      '1307, 17 Deokan-ro 104beon-gil, Gwangmyeong-si,<br />Gyeonggi-do, Republic of Korea<br />(M-Cluster Gwangmyeong Station)',
    'sub.location.tel': '전화',
    'sub.location.fax': '팩스',
    'sub.location.email': '이메일',
    'sub.location.map': '지도가 여기에 표시됩니다',

    'footer.address.ko':
      '경기도 광명시 덕안로104번길 17, 13층 1306~7호 (일직동, 광명역엠클러스터)',
    'footer.address.en':
      '1307, 17 Deokan-ro 104beon-gil, Gwangmyeong-si, Gyeonggi-do, Republic of Korea (M-Cluster Gwangmyeong Station)',
    'footer.ceo': '신동휘',
    'footer.business_registration': '등록번호',

    'sub.rtk.title': 'RTK',
    'sub.rtk.desc': '정밀 응용 분야를 위한 실시간 키네마틱 포지셔닝 솔루션',
    'sub.rtk.intro': 'RTK 포지셔닝 기술',
    'sub.rtk.intro.desc':
      '우리의 RTK(실시간 키네마틱) 솔루션은 고정밀도가 필요한 응용 분야를 위해 센티미터 수준의 포지셔닝 정확도를 제공합니다. 측량, 건설, 농업 및 자율주행 차량 내비게이션에 이상적입니다.',
    'sub.rtk.accuracy': '고정밀도',
    'sub.rtk.accuracy.desc': '센티미터 수준의 포지셔닝 정확도',
    'sub.rtk.realtime': '실시간',
    'sub.rtk.realtime.desc': '즉각적인 포지셔닝 업데이트',
    'sub.rtk.multignss': '다중 GNSS',
    'sub.rtk.multignss.desc': '다중 위성 시스템 지원',
    'sub.rtk.portable': '휴대용',
    'sub.rtk.portable.desc': '소형 및 쉬운 배치',

    'sub.monitoring.title': '모니터링시스템',
    'sub.monitoring.desc': '산업 설비 운영, 관리를 위한 포괄적인 모니터링 솔루션',
    'sub.monitoring.intro': '산업용 모니터링 솔루션',
    'sub.monitoring.intro.desc':
      '우리의 모니터링 시스템은 산업 프로세스를 위한 실시간 데이터 수집 및 분석을 제공하며, 운영을 최적화하고 장비 고장을 예방하는 데 도움을 줍니다.',
    'sub.monitoring.realtime': '실시간 모니터링',
    'sub.monitoring.realtime.desc': '중요 매개변수의 지속적인 모니터링',
    'sub.monitoring.alert': '알림 시스템',
    'sub.monitoring.alert.desc': '이상에 대한 즉각적인 알림',
    'sub.monitoring.analytics': '데이터 분석',
    'sub.monitoring.analytics.desc': '고급 분석 및 보고',
    'sub.monitoring.cloud': '클라우드 통합',
    'sub.monitoring.cloud.desc': '원활한 클라우드 연결',

    'sub.hydrogen.title': '수소저장합금',
    'sub.hydrogen.desc': '안정성과 효율성이 향상된 수소 저장, 운반 솔루션',
    'sub.hydrogen.intro': '수소 저장 기술',
    'sub.hydrogen.intro.desc':
      '우리의 수소 저장 합금 솔루션은 연료전지 응용 분야를 위한 효율적이고 안전한 수소 저장을 제공합니다. 높은 용량과 빠른 충전/방전을 갖춘 소형 저장 시스템을 가능하게 합니다.',
    'sub.hydrogen.capacity': '고용량',
    'sub.hydrogen.capacity.desc': '우수한 수소 저장 밀도',
    'sub.hydrogen.safety': '안전성',
    'sub.hydrogen.safety.desc': '안전하고 신뢰할 수 있는 저장 솔루션',
    'sub.hydrogen.charging': '빠른 충전',
    'sub.hydrogen.charging.desc': '빠른 수소 흡수 및 방출',
    'sub.hydrogen.clean': '청정 에너지',
    'sub.hydrogen.clean.desc': '청정 에너지 전환 지원',

    'sub.rnd_field.title': '연구분야',
    'sub.rnd_field.desc': '우리의 연구 영역 및 전문성',
    'sub.rnd_field.intro': '연구 영역',
    'sub.rnd_field.intro.desc':
      '슬레노는 산업과 에너지를 잇는 융합 기술 연구를 통해<br /><br />정밀 제어, 데이터 분석, 소재 혁신 분야의 새로운 가능성을 열고 있습니다.<br /><br /><br />산업용 압축기, RTK 정밀 위치 시스템, IoT 모니터링,<br />수소저장합금, PCB 하드웨어 개발까지 —<br /><br />산업의 안전과 효율, 그리고 지속가능한 미래를 위한 기술을 연구합니다.',
    'sub.rnd_field.compressor': '산업용 압축기',
    'sub.rnd_field.compressor.desc': '산업용 압축 솔루션',
    'sub.rnd_field.iot': '초대규모 IoT 네트워크',
    'sub.rnd_field.iot.desc': '대규모 IoT 네트워크 솔루션',
    'sub.rnd_field.energy': '청정 에너지',
    'sub.rnd_field.energy.desc': '수소 저장 및 재생 가능 에너지 기술',

    // Company Info Table
    'company_info.ceo': '대표',
    'company_info.ceo.value': '신동휘',
    'company_info.established': '설립 연도',
    'company_info.established.value': '2019년 4월',
    'company_info.headquarters': '본사',
    'company_info.headquarters.value':
      '경기도 광명시 덕안로 104번길 17, 엠클러스터 1307호',
    'company_info.samcheok': '삼척 지사',
    'company_info.samcheok.value':
      '강원특별자치도 삼척시 언장1길 27 에너지방재지원센터 208호',
    'company_info.donghae': '동해 공장',
    'company_info.donghae.value': '강원특별자치도 동해시 공단7로 41',

    // Revenue Chart
    'revenue.title': '매출 현황',
    'revenue.2022': '19억',
    'revenue.2023': '45억',
    'revenue.2024': '58억',
    'revenue.2025': '75억',
  },
  en: {
    // Navigation
    'nav.company': 'COMPANY',
    'nav.business': 'BUSINESS AREA',
    'nav.rnd': 'R&D',
    'nav.support': 'SUPPORT',
    'nav.overview': 'Overview',
    'nav.history': 'History',
    'nav.certification': 'Certification',
    'nav.location': 'Location',
    'nav.compressor': 'Compressor',
    'nav.edge_server': 'Massive IoT Network',
    'nav.rtk': 'RTK',
    'nav.monitoring': 'Monitoring System',
    'nav.hydrogen': 'Hydrogen Storage Alloy',
    'nav.rnd_center': 'R&D Center',
    'nav.rnd_field': 'R&D Field',
    'nav.notice': 'Notice',
    'nav.inquiry': 'Inquiry',

    // Main Visual
    'main.typo1.title':
      'Driving Industrial Power,<br />Through Precision,<br />Compression Technology',
    'main.typo1.desc':
      'From petrochemical and power generation to hydrogen plants<br />customized compression solutions for every industrial site.',
    'main.typo2.title': 'Massive IoT Network for Smart Cities',
    'main.typo2.desc':
      'IoT devices collect real-time data throughout the city,<br />connecting urban areas safely and efficiently<br />through Massive IoT standard-based wireless networks.',
    'main.typo3.title':
      'Monitoring industrial safety and efficiency<br />with real-time data.',
    'main.typo3.desc':
      'We collect and analyze data from various sensors installed in facilities<br />to detect anomalies in real-time,<br />maximizing safety and operational efficiency in industrial sites.',
    'main.typo4.title': 'Precision to the Centimeter, Achieved with RTK.',
    'main.typo4.desc':
      'RTK technology corrects satellite signals in real-time to achieve centimeter-level positioning accuracy,<br />serving as the foundation for precision control industries such as autonomous driving, drones, and agricultural automation.',

    // Overview Section
    'overview.title': 'Overview',
    'overview.desc':
      'SLENO CO., LTD. is an industrial-energy convergence technology company based on industrial compressors, RTK precision positioning systems, IoT monitoring solutions, and hydrogen storage alloy technology. We create a safe, efficient, and sustainable future for industry through precision technology and innovative data solutions.',
    'overview.btn': 'MORE VIEW',
    'overview.company': 'COMPANY',
    'overview.ceo': 'CEO',
    'overview.established': 'Established year',

    // Business Area
    'business.compressor': 'Compressor',
    'business.edge_server': 'Massive IoT Network',
    'business.rtk': 'RTK',
    'business.monitoring': 'Monitoring System',
    'business.hydrogen': 'Hydrogen Storage Alloy',
    'business.more_view': 'MORE VIEW',

    // R&D Section
    'rnd.title': 'R&D',
    'rnd.desc':
      'Through innovative research and development based on industrial compressors,<br />RTK precision positioning systems, IoT monitoring solutions,<br />and hydrogen storage alloy technology, we create a safe, efficient,<br />and sustainable future for industry.',
    'rnd.btn': 'MORE VIEW',

    // Notice Section
    'notice.title': 'Notice',
    'notice.btn': 'MORE VIEW',
    'notice.label': 'Notice.',
    'notice.content.title': 'Thank you for visiting the SLENO homepage',
    'notice.content.desc': 'Thank you for visiting the SLENO homepage.',

    // Sub Pages
    'sub.overview.title': 'Overview',
    'sub.overview.desc':
      'SLENO CO., LTD. is an industrial-energy convergence technology company<br />based on industrial compressors, RTK precision positioning systems, IoT monitoring solutions,<br />and hydrogen storage alloy technology. We create a safe, efficient,<br />and sustainable future for industry through precision technology and innovative data solutions.',
    'sub.overview.intro': 'Company Introduction',
    'sub.overview.intro.desc':
      'SLENO CO., LTD. is an industrial-energy convergence technology company based on industrial compressors, RTK precision positioning systems, IoT monitoring solutions, and hydrogen storage alloy technology. We create a safe, efficient, and sustainable future for industry through precision technology and innovative data solutions.',
    'sub.overview.mission': 'Our Mission',
    'sub.overview.mission.desc':
      'To furnish general IoT customers with a technically affordable and cost-effective camera module solution to expedite integration of vision capability for less spotlighted non-mobile & non-automotive market segment.',
    'sub.overview.location': 'Location',
    'sub.overview.location.value': 'Gwangmyeong-si, Gyeonggi-do',
    'sub.overview.company.name': 'SLENO CO., LTD.',
    'sub.overview.ceo.name': 'Scott Shin',

    'sub.compressor.title': 'Compressor',
    'sub.compressor.desc':
      'Driving Industrial Power, Through Precision, Compression Technology',
    'sub.compressor.intro': 'Industrial Compressor Solutions',
    'sub.compressor.intro.desc':
      'From petrochemical and power generation to hydrogen plants, we provide customized compression solutions for every industrial site. Our compressors ensure reliability and efficiency.',
    'sub.compressor.efficiency': 'High Efficiency',
    'sub.compressor.efficiency.desc':
      'Optimized design for maximum energy efficiency',
    'sub.compressor.reliability': 'Reliability',
    'sub.compressor.reliability.desc':
      'Built to withstand harsh industrial environments',
    'sub.compressor.customization': 'Customization',
    'sub.compressor.customization.desc':
      'Tailored solutions for specific applications',
    'sub.compressor.performance': 'Performance',
    'sub.compressor.performance.desc':
      'Superior performance metrics and specifications',

    'sub.notice.title': 'Notice',
    'sub.notice.desc': 'Latest news and announcements',
    'sub.notice.greeting.title': 'Thank you for visiting the SLENO homepage',
    'sub.notice.greeting.desc': 'Thank you for visiting the SLENO homepage.',

    'sub.history.title': 'History',
    'sub.history.desc': 'Our journey of innovation and growth',
    'sub.history.2024_2027.title': 'AI-based Hydrogen Industry Platform',
    'sub.history.2024_2027.desc':
      'Construction and operation of AI-based Hydrogen Industry Platform',
    'sub.history.2024_2025.title':
      'Hydrogen Enterprise R&D Hub Construction Project',
    'sub.history.2024_2025.desc':
      'Hydrogen Enterprise R&D Hub Construction Project (Liquefied Hydrogen Safety Monitoring System Development)<br />Patent applications related to liquefied hydrogen (2 cases)<br />Patent applications related to hydrogen facilities (2 cases)',
    'sub.history.2024.title': 'Major Achievements',
    'sub.history.2024.desc':
      'ISO45001 Certification<br />Corporate Research Institute Establishment<br />Venture Business Certification (No. 20240702030068)<br />Hydrogen Specialized Company Certification (No. 2024-0011)<br />H2AI Merger & Acquisition',
    'sub.history.2023.title': 'Certification & Business Expansion',
    'sub.history.2023.desc':
      'ISO14001 Certification<br />Company Name Change to ㈜지이<br />Energy New Industry (Hydrogen) Safety Monitoring System Development and Demonstration',
    'sub.history.2022.title': 'ISO9001 Certification',
    'sub.history.2022.desc': 'ISO9001 Certification',
    'sub.history.2021.title': 'R&D & Partnership',
    'sub.history.2021.desc':
      'Dedicated R&D Department Establishment<br />H2 Comp Packaging Partnership Agreement',
    'sub.history.2020.title': 'Patent & Technology Development',
    'sub.history.2020.desc':
      'Patent Registration for Special Tools for Hydrogen Compressor Packaging<br />LNG BOG Compressor Parts Localization Development',
    'sub.history.2019.title': 'Company Incorporation',
    'sub.history.2019.desc': 'GTC Engineering Co., Ltd. Incorporation',

    'sub.edge_server.title': 'Massive IoT Network',
    'sub.edge_server.desc': 'Massive IoT Network solutions for smart cities',
    'sub.edge_server.intro': 'Massive IoT Network',
    'sub.edge_server.intro.desc':
      'IoT devices collect real-time data throughout the city, connecting urban areas safely and efficiently through Massive IoT standard-based wireless networks.',
    'sub.edge_server.performance': 'Massive Connectivity',
    'sub.edge_server.performance.desc':
      'Connect and manage numerous IoT devices simultaneously',
    'sub.edge_server.latency': 'Real-time Data Collection',
    'sub.edge_server.latency.desc':
      'Collect and transmit real-time data throughout the city',
    'sub.edge_server.connectivity': 'Massive IoT Standard',
    'sub.edge_server.connectivity.desc':
      'Stable connectivity through standard-based wireless networks',
    'sub.edge_server.security': 'Smart City Integration',
    'sub.edge_server.security.desc':
      'Network that efficiently integrates with urban infrastructure',

    'sub.rnd_center.title': 'R&D Center',
    'sub.rnd_center.desc': 'Innovation hub for next-generation technologies',
    'sub.rnd_center.intro': 'Research & Development',
    'sub.rnd_center.intro.desc':
      'Our R&D Center is dedicated to developing cutting-edge technologies and solutions. With state-of-the-art facilities and a team of expert researchers, we continuously push the boundaries of innovation.',
    'sub.rnd_center.labs': 'Advanced Labs',
    'sub.rnd_center.labs.desc': 'State-of-the-art research facilities',
    'sub.rnd_center.team': 'Expert Team',
    'sub.rnd_center.team.desc': 'Experienced researchers and engineers',
    'sub.rnd_center.innovation': 'Innovation',
    'sub.rnd_center.innovation.desc': 'Cutting-edge technology development',
    'sub.rnd_center.collaboration': 'Collaboration',
    'sub.rnd_center.collaboration.desc':
      'Partnerships with leading institutions',

    'sub.inquiry.title': 'Inquiry',
    'sub.inquiry.desc': 'Contact us for more information',
    'sub.inquiry.name': 'Name',
    'sub.inquiry.company': 'Company',
    'sub.inquiry.email': 'E-mail',
    'sub.inquiry.phone': 'Phone',
    'sub.inquiry.subject': 'Subject',
    'sub.inquiry.message': 'Message',
    'sub.inquiry.send': 'Send Inquiry',
    'sub.inquiry.contact': 'Contact Information',

    'sub.certification.title': 'Certification',
    'sub.certification.desc':
      'Quality certifications and standards we maintain',

    'sub.location.title': 'Location',
    'sub.location.desc': 'Visit us at our headquarters',
    'sub.location.headquarters': 'Headquarters',
    'sub.location.address': 'Address',
    'sub.location.address.ko':
      '경기도 광명시 덕안로104번길 17, 13층 1306~7호<br />(일직동, 광명역엠클러스터)',
    'sub.location.address.en':
      '1307, 17 Deokan-ro 104beon-gil, Gwangmyeong-si,<br />Gyeonggi-do, Republic of Korea<br />(M-Cluster Gwangmyeong Station)',
    'sub.location.tel': 'Tel',
    'sub.location.fax': 'Fax',
    'sub.location.email': 'E-mail',
    'sub.location.map': 'Map will be displayed here',

    'footer.address.ko':
      '경기도 광명시 덕안로104번길 17, 13층 1306~7호 (일직동, 광명역엠클러스터)',
    'footer.address.en':
      '1307, 17 Deokan-ro 104beon-gil, Gwangmyeong-si, Gyeonggi-do, Republic of Korea (M-Cluster Gwangmyeong Station)',
    'footer.ceo': 'scott.shin',
    'footer.business_registration': 'Business Registration No.',

    'sub.rtk.title': 'RTK',
    'sub.rtk.desc':
      'Real-Time Kinematic positioning solutions for precision applications',
    'sub.rtk.intro': 'RTK Positioning Technology',
    'sub.rtk.intro.desc':
      'Our RTK (Real-Time Kinematic) solutions provide centimeter-level positioning accuracy for applications requiring high precision. Ideal for surveying, construction, agriculture, and autonomous vehicle navigation.',
    'sub.rtk.accuracy': 'High Accuracy',
    'sub.rtk.accuracy.desc': 'Centimeter-level positioning precision',
    'sub.rtk.realtime': 'Real-Time',
    'sub.rtk.realtime.desc': 'Instant positioning updates',
    'sub.rtk.multignss': 'Multi-GNSS',
    'sub.rtk.multignss.desc': 'Support for multiple satellite systems',
    'sub.rtk.portable': 'Portable',
    'sub.rtk.portable.desc': 'Compact and easy to deploy',

    'sub.monitoring.title': 'Monitoring System',
    'sub.monitoring.desc':
      'Comprehensive monitoring solutions for industrial facility operation and management',
    'sub.monitoring.intro': 'Industrial Monitoring Solutions',
    'sub.monitoring.intro.desc':
      'Our monitoring systems provide real-time data collection and analysis for industrial processes, helping optimize operations and prevent equipment failures.',
    'sub.monitoring.realtime': 'Real-Time Monitoring',
    'sub.monitoring.realtime.desc':
      'Continuous monitoring of critical parameters',
    'sub.monitoring.alert': 'Alert System',
    'sub.monitoring.alert.desc': 'Instant notifications for anomalies',
    'sub.monitoring.analytics': 'Data Analytics',
    'sub.monitoring.analytics.desc': 'Advanced analytics and reporting',
    'sub.monitoring.cloud': 'Cloud Integration',
    'sub.monitoring.cloud.desc': 'Seamless cloud connectivity',

    'sub.hydrogen.title': 'Hydrogen Storage Alloy',
    'sub.hydrogen.desc':
      'Hydrogen storage and transport solutions with enhanced stability and efficiency',
    'sub.hydrogen.intro': 'Hydrogen Storage Technology',
    'sub.hydrogen.intro.desc':
      'Our hydrogen storage alloy solutions provide efficient and safe hydrogen storage for fuel cell applications. They enable compact storage systems with high capacity and fast charging/discharging.',
    'sub.hydrogen.capacity': 'High Capacity',
    'sub.hydrogen.capacity.desc': 'Superior hydrogen storage density',
    'sub.hydrogen.safety': 'Safety',
    'sub.hydrogen.safety.desc': 'Safe and reliable storage solutions',
    'sub.hydrogen.charging': 'Fast Charging',
    'sub.hydrogen.charging.desc': 'Rapid hydrogen absorption and release',
    'sub.hydrogen.clean': 'Clean Energy',
    'sub.hydrogen.clean.desc': 'Supporting the transition to clean energy',

    'sub.rnd_field.title': 'R&D Field',
    'sub.rnd_field.desc': 'Our research areas and expertise',
    'sub.rnd_field.intro': 'Research Areas',
    'sub.rnd_field.intro.desc':
      'SLENO opens new possibilities in precision control, data analytics, and materials innovation through convergence technology research connecting industry and energy.<br /><br /><br />From industrial compressors, RTK precision positioning systems, IoT monitoring,<br />hydrogen storage alloys, to PCB hardware development —<br /><br />we research technologies for industrial safety, efficiency, and a sustainable future.',
    'sub.rnd_field.compressor': 'Industrial Compressor',
    'sub.rnd_field.compressor.desc': 'Industrial compression solutions',
    'sub.rnd_field.iot': 'Massive IoT Network',
    'sub.rnd_field.iot.desc': 'Large-scale IoT network solutions',
    'sub.rnd_field.energy': 'Clean Energy',
    'sub.rnd_field.energy.desc':
      'Hydrogen storage and renewable energy technologies',

    // Company Info Table
    'company_info.ceo': 'CEO',
    'company_info.ceo.value': 'Scott Shin',
    'company_info.established': 'Established',
    'company_info.established.value': 'April 2019',
    'company_info.headquarters': 'Headquarters',
    'company_info.headquarters.value':
      '1307, 17 Deokan-ro 104beon-gil, Gwangmyeong-si, Gyeonggi-do (M-Cluster)',
    'company_info.samcheok': 'Samcheok Branch',
    'company_info.samcheok.value':
      '208, 27 Eonjang 1-gil, Samcheok-si, Gangwon State',
    'company_info.donghae': 'Donghae Factory',
    'company_info.donghae.value': 'Gongdan 7-ro 41, Donghae-si, Gangwon State',

    // Revenue Chart
    'revenue.title': 'Revenue Status',
    'revenue.2022': '1.9B',
    'revenue.2023': '4.5B',
    'revenue.2024': '5.8B',
    'revenue.2025': '7.5B',
  },
};

function initLanguageToggle() {
  // Get saved language from localStorage or default to English (since HTML is in English)
  var currentLang = localStorage.getItem('language') || 'en';

  // Set initial language
  setLanguage(currentLang);

  // Toggle dropdown on button click
  $('.lang_current').on('click', function (e) {
    e.stopPropagation();
    $(this).closest('.language_toggle').toggleClass('active');
  });

  // Close dropdown when clicking outside
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.language_toggle').length) {
      $('.language_toggle').removeClass('active');
    }
  });

  // Language option click handler
  $('.lang_option').on('click', function (e) {
    e.preventDefault();
    var lang = $(this).data('lang');
    setLanguage(lang);
    localStorage.setItem('language', lang);
    $('.language_toggle').removeClass('active');
  });
}

function setLanguage(lang) {
  var langText = lang === 'ko' ? '한국어' : 'English';
  var t = translations[lang];

  // Update current button text
  $('.lang_text').text(langText);

  // Update active option
  $('.lang_option').removeClass('active');
  $('.lang_option[data-lang="' + lang + '"]').addClass('active');

  // Update HTML lang attribute
  $('html').attr('lang', lang);

  // Add language class to body for CSS targeting
  $('body')
    .removeClass('lang-ko lang-en')
    .addClass('lang-' + lang);

  // Translate navigation menu
  $('[data-translate="nav.company"]').text(t['nav.company']);
  $('[data-translate="nav.business"]').text(t['nav.business']);
  $('[data-translate="nav.rnd"]').text(t['nav.rnd']);
  $('[data-translate="nav.support"]').text(t['nav.support']);
  $('[data-translate="nav.overview"]').text(t['nav.overview']);
  $('[data-translate="nav.history"]').text(t['nav.history']);
  $('[data-translate="nav.certification"]').text(t['nav.certification']);
  $('[data-translate="nav.location"]').text(t['nav.location']);
  $('[data-translate="nav.compressor"]').text(t['nav.compressor']);
  $('[data-translate="nav.edge_server"]').text(t['nav.edge_server']);
  $('[data-translate="nav.rtk"]').text(t['nav.rtk']);
  $('[data-translate="nav.monitoring"]').text(t['nav.monitoring']);
  $('[data-translate="nav.hydrogen"]').text(t['nav.hydrogen']);
  $('[data-translate="nav.rnd_center"]').text(t['nav.rnd_center']);
  $('[data-translate="nav.rnd_field"]').text(t['nav.rnd_field']);
  $('[data-translate="nav.notice"]').text(t['nav.notice']);
  $('[data-translate="nav.inquiry"]').text(t['nav.inquiry']);

  // Translate main visual
  // Save current slide index before updating text
  var currentSlideIndex = 0;
  if (
    $('#main_vis_slider').length &&
    $('#main_vis_slider').hasClass('slick-initialized')
  ) {
    currentSlideIndex = $('#main_vis_slider').slick('slickCurrentSlide');
  }

  $('[data-translate="main.typo1.title"]').html(t['main.typo1.title']);
  $('[data-translate="main.typo1.desc"]').html(t['main.typo1.desc']);
  $('[data-translate="main.typo2.title"]').html(t['main.typo2.title']);
  $('[data-translate="main.typo2.desc"]').html(t['main.typo2.desc']);
  $('[data-translate="main.typo3.title"]').html(t['main.typo3.title']);
  $('[data-translate="main.typo3.desc"]').html(t['main.typo3.desc']);
  $('[data-translate="main.typo4.title"]').html(t['main.typo4.title']);
  $('[data-translate="main.typo4.desc"]').html(t['main.typo4.desc']);

  // Reinitialize slider if it exists and is on the current page
  if ($('#main_vis_slider').length) {
    if ($('#main_vis_slider').hasClass('slick-initialized')) {
      // Destroy existing slider
      $('#main_vis_slider').slick('unslick');
    }
    // Reinitialize slider
    setTimeout(function () {
      initMainSlider();
      // Restore slide position
      if (currentSlideIndex >= 0) {
        $('#main_vis_slider').slick('slickGoTo', currentSlideIndex);
        // Restore active typo
        $('.main_typo').removeClass('active');
        $('.main_typo_' + (currentSlideIndex + 1)).addClass('active');
      }
      // Refresh AOS animations
      AOS.refresh();
    }, 100);
  }

  // Translate overview section
  $('[data-translate="overview.title"]').text(t['overview.title']);
  $('[data-translate="overview.desc"]').html(t['overview.desc']);
  $('[data-translate="overview.btn"]').each(function () {
    $(this).text(t['overview.btn']);
  });
  $('[data-translate="overview.company"]').text(t['overview.company']);
  $('[data-translate="overview.ceo"]').text(t['overview.ceo']);
  $('[data-translate="overview.established"]').text(t['overview.established']);

  // Translate business area
  $('[data-translate="business.compressor"]').html(t['business.compressor']);
  $('[data-translate="business.edge_server"]').html(t['business.edge_server']);
  $('[data-translate="business.rtk"]').html(t['business.rtk']);
  $('[data-translate="business.monitoring"]').html(t['business.monitoring']);
  $('[data-translate="business.hydrogen"]').html(t['business.hydrogen']);
  $('[data-translate="business.more_view"]').each(function () {
    var $this = $(this);
    var icon = $this.find('i').detach();
    $this.text(t['business.more_view']);
    $this.append(icon);
  });

  // Translate R&D section
  $('[data-translate="rnd.title"]').text(t['rnd.title']);
  $('[data-translate="rnd.desc"]').html(t['rnd.desc']);
  $('[data-translate="rnd.btn"]').each(function () {
    $(this).text(t['rnd.btn']);
  });

  // Translate notice section
  $('[data-translate="notice.title"]').text(t['notice.title']);
  $('[data-translate="notice.btn"]').each(function () {
    $(this).text(t['notice.btn']);
  });
  $('[data-translate="notice.label"]').text(t['notice.label']);
  $('[data-translate="notice.content.title"]').text(t['notice.content.title']);
  $('[data-translate="notice.content.desc"]').text(t['notice.content.desc']);

  // Translate sub pages
  $('[data-translate="sub.overview.title"]').text(t['sub.overview.title']);
  $('[data-translate="sub.overview.desc"]').html(t['sub.overview.desc']);
  $('[data-translate="sub.overview.intro"]').text(t['sub.overview.intro']);
  $('[data-translate="sub.overview.intro.desc"]').text(
    t['sub.overview.intro.desc']
  );
  $('[data-translate="sub.overview.mission"]').text(t['sub.overview.mission']);
  $('[data-translate="sub.overview.mission.desc"]').text(
    t['sub.overview.mission.desc']
  );
  $('[data-translate="sub.overview.location"]').text(
    t['sub.overview.location']
  );
  $('[data-translate="sub.overview.location.value"]').text(
    t['sub.overview.location.value']
  );
  $('[data-translate="sub.overview.company.name"]').text(
    t['sub.overview.company.name']
  );
  $('[data-translate="sub.overview.ceo.name"]').text(
    t['sub.overview.ceo.name']
  );

  // Translate company info table
  $('[data-translate="company_info.ceo"]').text(t['company_info.ceo']);
  $('[data-translate="company_info.ceo.value"]').text(
    t['company_info.ceo.value']
  );
  $('[data-translate="company_info.established"]').text(
    t['company_info.established']
  );
  $('[data-translate="company_info.established.value"]').text(
    t['company_info.established.value']
  );
  $('[data-translate="company_info.headquarters"]').text(
    t['company_info.headquarters']
  );
  $('[data-translate="company_info.headquarters.value"]').text(
    t['company_info.headquarters.value']
  );
  $('[data-translate="company_info.samcheok"]').text(
    t['company_info.samcheok']
  );
  $('[data-translate="company_info.samcheok.value"]').text(
    t['company_info.samcheok.value']
  );
  $('[data-translate="company_info.donghae"]').text(t['company_info.donghae']);
  $('[data-translate="company_info.donghae.value"]').text(
    t['company_info.donghae.value']
  );

  // Translate revenue chart
  $('[data-translate="revenue.title"]').text(t['revenue.title']);
  $('[data-translate="revenue.2022"]').text(t['revenue.2022']);
  $('[data-translate="revenue.2023"]').text(t['revenue.2023']);
  $('[data-translate="revenue.2024"]').text(t['revenue.2024']);
  $('[data-translate="revenue.2025"]').text(t['revenue.2025']);

  $('[data-translate="sub.compressor.title"]').text(t['sub.compressor.title']);
  $('[data-translate="sub.compressor.desc"]').text(t['sub.compressor.desc']);
  $('[data-translate="sub.compressor.intro"]').text(t['sub.compressor.intro']);
  $('[data-translate="sub.compressor.intro.desc"]').text(
    t['sub.compressor.intro.desc']
  );
  $('[data-translate="sub.compressor.efficiency"]').text(
    t['sub.compressor.efficiency']
  );
  $('[data-translate="sub.compressor.efficiency.desc"]').text(
    t['sub.compressor.efficiency.desc']
  );
  $('[data-translate="sub.compressor.reliability"]').text(
    t['sub.compressor.reliability']
  );
  $('[data-translate="sub.compressor.reliability.desc"]').text(
    t['sub.compressor.reliability.desc']
  );
  $('[data-translate="sub.compressor.customization"]').text(
    t['sub.compressor.customization']
  );
  $('[data-translate="sub.compressor.customization.desc"]').text(
    t['sub.compressor.customization.desc']
  );
  $('[data-translate="sub.compressor.performance"]').text(
    t['sub.compressor.performance']
  );
  $('[data-translate="sub.compressor.performance.desc"]').text(
    t['sub.compressor.performance.desc']
  );

  $('[data-translate="sub.notice.title"]').text(t['sub.notice.title']);
  $('[data-translate="sub.notice.desc"]').text(t['sub.notice.desc']);
  $('[data-translate="sub.notice.greeting.title"]').text(
    t['sub.notice.greeting.title']
  );
  $('[data-translate="sub.notice.greeting.desc"]').text(
    t['sub.notice.greeting.desc']
  );

  // Translate history page
  $('[data-translate="sub.history.title"]').text(t['sub.history.title']);
  $('[data-translate="sub.history.desc"]').text(t['sub.history.desc']);
  $('[data-translate="sub.history.2024_2027.title"]').text(
    t['sub.history.2024_2027.title']
  );
  $('[data-translate="sub.history.2024_2027.desc"]').html(
    t['sub.history.2024_2027.desc']
  );
  $('[data-translate="sub.history.2024_2025.title"]').text(
    t['sub.history.2024_2025.title']
  );
  $('[data-translate="sub.history.2024_2025.desc"]').html(
    t['sub.history.2024_2025.desc']
  );
  $('[data-translate="sub.history.2024.title"]').text(
    t['sub.history.2024.title']
  );
  $('[data-translate="sub.history.2024.desc"]').html(
    t['sub.history.2024.desc']
  );
  $('[data-translate="sub.history.2023.title"]').text(
    t['sub.history.2023.title']
  );
  $('[data-translate="sub.history.2023.desc"]').html(
    t['sub.history.2023.desc']
  );
  $('[data-translate="sub.history.2022.title"]').text(
    t['sub.history.2022.title']
  );
  $('[data-translate="sub.history.2022.desc"]').text(
    t['sub.history.2022.desc']
  );
  $('[data-translate="sub.history.2021.title"]').text(
    t['sub.history.2021.title']
  );
  $('[data-translate="sub.history.2021.desc"]').html(
    t['sub.history.2021.desc']
  );
  $('[data-translate="sub.history.2020.title"]').text(
    t['sub.history.2020.title']
  );
  $('[data-translate="sub.history.2020.desc"]').html(
    t['sub.history.2020.desc']
  );
  $('[data-translate="sub.history.2019.title"]').text(
    t['sub.history.2019.title']
  );
  $('[data-translate="sub.history.2019.desc"]').text(
    t['sub.history.2019.desc']
  );

  // Translate edge server page
  $('[data-translate="sub.edge_server.title"]').text(
    t['sub.edge_server.title']
  );
  $('[data-translate="sub.edge_server.desc"]').text(t['sub.edge_server.desc']);
  $('[data-translate="sub.edge_server.intro"]').text(
    t['sub.edge_server.intro']
  );
  $('[data-translate="sub.edge_server.intro.desc"]').text(
    t['sub.edge_server.intro.desc']
  );
  $('[data-translate="sub.edge_server.performance"]').text(
    t['sub.edge_server.performance']
  );
  $('[data-translate="sub.edge_server.performance.desc"]').text(
    t['sub.edge_server.performance.desc']
  );
  $('[data-translate="sub.edge_server.latency"]').text(
    t['sub.edge_server.latency']
  );
  $('[data-translate="sub.edge_server.latency.desc"]').text(
    t['sub.edge_server.latency.desc']
  );
  $('[data-translate="sub.edge_server.connectivity"]').text(
    t['sub.edge_server.connectivity']
  );
  $('[data-translate="sub.edge_server.connectivity.desc"]').text(
    t['sub.edge_server.connectivity.desc']
  );
  $('[data-translate="sub.edge_server.security"]').text(
    t['sub.edge_server.security']
  );
  $('[data-translate="sub.edge_server.security.desc"]').text(
    t['sub.edge_server.security.desc']
  );

  // Translate R&D center page
  $('[data-translate="sub.rnd_center.title"]').text(t['sub.rnd_center.title']);
  $('[data-translate="sub.rnd_center.desc"]').text(t['sub.rnd_center.desc']);
  $('[data-translate="sub.rnd_center.intro"]').text(t['sub.rnd_center.intro']);
  $('[data-translate="sub.rnd_center.intro.desc"]').text(
    t['sub.rnd_center.intro.desc']
  );
  $('[data-translate="sub.rnd_center.labs"]').text(t['sub.rnd_center.labs']);
  $('[data-translate="sub.rnd_center.labs.desc"]').text(
    t['sub.rnd_center.labs.desc']
  );
  $('[data-translate="sub.rnd_center.team"]').text(t['sub.rnd_center.team']);
  $('[data-translate="sub.rnd_center.team.desc"]').text(
    t['sub.rnd_center.team.desc']
  );
  $('[data-translate="sub.rnd_center.innovation"]').text(
    t['sub.rnd_center.innovation']
  );
  $('[data-translate="sub.rnd_center.innovation.desc"]').text(
    t['sub.rnd_center.innovation.desc']
  );
  $('[data-translate="sub.rnd_center.collaboration"]').text(
    t['sub.rnd_center.collaboration']
  );
  $('[data-translate="sub.rnd_center.collaboration.desc"]').text(
    t['sub.rnd_center.collaboration.desc']
  );

  // Translate inquiry page
  $('[data-translate="sub.inquiry.title"]').text(t['sub.inquiry.title']);
  $('[data-translate="sub.inquiry.desc"]').text(t['sub.inquiry.desc']);
  $('[data-translate="sub.inquiry.name"]').text(t['sub.inquiry.name']);
  $('[data-translate="sub.inquiry.company"]').text(t['sub.inquiry.company']);
  $('[data-translate="sub.inquiry.email"]').text(t['sub.inquiry.email']);
  $('[data-translate="sub.inquiry.phone"]').text(t['sub.inquiry.phone']);
  $('[data-translate="sub.inquiry.subject"]').text(t['sub.inquiry.subject']);
  $('[data-translate="sub.inquiry.message"]').text(t['sub.inquiry.message']);
  $('[data-translate="sub.inquiry.send"]').text(t['sub.inquiry.send']);
  $('[data-translate="sub.inquiry.contact"]').text(t['sub.inquiry.contact']);

  // Translate certification page
  $('[data-translate="sub.certification.title"]').text(
    t['sub.certification.title']
  );
  $('[data-translate="sub.certification.desc"]').text(
    t['sub.certification.desc']
  );

  // Translate location page
  $('[data-translate="sub.location.title"]').text(t['sub.location.title']);
  $('[data-translate="sub.location.desc"]').text(t['sub.location.desc']);
  $('[data-translate="sub.location.headquarters"]').text(
    t['sub.location.headquarters']
  );
  $('[data-translate="sub.location.address"]').text(t['sub.location.address']);
  if (lang === 'ko') {
    $('[data-translate="sub.location.address.ko"]')
      .show()
      .html(t['sub.location.address.ko']);
    $('[data-translate="sub.location.address.en"]').hide();
  } else {
    $('[data-translate="sub.location.address.ko"]').hide();
    $('[data-translate="sub.location.address.en"]')
      .show()
      .html(t['sub.location.address.en']);
  }
  $('[data-translate="sub.location.tel"]').text(t['sub.location.tel']);
  $('[data-translate="sub.location.fax"]').text(t['sub.location.fax']);
  $('[data-translate="sub.location.email"]').text(t['sub.location.email']);
  $('[data-translate="sub.location.map"]').text(t['sub.location.map']);

  // Translate footer address
  $('[data-translate="footer.address.ko"]').text(t['footer.address.ko']);
  $('[data-translate="footer.address.en"]').text(
    lang === 'ko' ? t['footer.address.ko'] : t['footer.address.en']
  );

  // Translate footer CEO
  $('[data-translate="footer.ceo"]').text(t['footer.ceo']);

  // Translate footer Business Registration No
  $('[data-translate="footer.business_registration"]').text(
    t['footer.business_registration']
  );

  // Translate RTK page
  $('[data-translate="sub.rtk.title"]').text(t['sub.rtk.title']);
  $('[data-translate="sub.rtk.desc"]').text(t['sub.rtk.desc']);
  $('[data-translate="sub.rtk.intro"]').text(t['sub.rtk.intro']);
  $('[data-translate="sub.rtk.intro.desc"]').text(t['sub.rtk.intro.desc']);
  $('[data-translate="sub.rtk.accuracy"]').text(t['sub.rtk.accuracy']);
  $('[data-translate="sub.rtk.accuracy.desc"]').text(
    t['sub.rtk.accuracy.desc']
  );
  $('[data-translate="sub.rtk.realtime"]').text(t['sub.rtk.realtime']);
  $('[data-translate="sub.rtk.realtime.desc"]').text(
    t['sub.rtk.realtime.desc']
  );
  $('[data-translate="sub.rtk.multignss"]').text(t['sub.rtk.multignss']);
  $('[data-translate="sub.rtk.multignss.desc"]').text(
    t['sub.rtk.multignss.desc']
  );
  $('[data-translate="sub.rtk.portable"]').text(t['sub.rtk.portable']);
  $('[data-translate="sub.rtk.portable.desc"]').text(
    t['sub.rtk.portable.desc']
  );

  // Translate monitoring page
  $('[data-translate="sub.monitoring.title"]').text(t['sub.monitoring.title']);
  $('[data-translate="sub.monitoring.desc"]').text(t['sub.monitoring.desc']);
  $('[data-translate="sub.monitoring.intro"]').text(t['sub.monitoring.intro']);
  $('[data-translate="sub.monitoring.intro.desc"]').text(
    t['sub.monitoring.intro.desc']
  );
  $('[data-translate="sub.monitoring.realtime"]').text(
    t['sub.monitoring.realtime']
  );
  $('[data-translate="sub.monitoring.realtime.desc"]').text(
    t['sub.monitoring.realtime.desc']
  );
  $('[data-translate="sub.monitoring.alert"]').text(t['sub.monitoring.alert']);
  $('[data-translate="sub.monitoring.alert.desc"]').text(
    t['sub.monitoring.alert.desc']
  );
  $('[data-translate="sub.monitoring.analytics"]').text(
    t['sub.monitoring.analytics']
  );
  $('[data-translate="sub.monitoring.analytics.desc"]').text(
    t['sub.monitoring.analytics.desc']
  );
  $('[data-translate="sub.monitoring.cloud"]').text(t['sub.monitoring.cloud']);
  $('[data-translate="sub.monitoring.cloud.desc"]').text(
    t['sub.monitoring.cloud.desc']
  );

  // Translate hydrogen page
  $('[data-translate="sub.hydrogen.title"]').text(t['sub.hydrogen.title']);
  $('[data-translate="sub.hydrogen.desc"]').text(t['sub.hydrogen.desc']);
  $('[data-translate="sub.hydrogen.intro"]').text(t['sub.hydrogen.intro']);
  $('[data-translate="sub.hydrogen.intro.desc"]').text(
    t['sub.hydrogen.intro.desc']
  );
  $('[data-translate="sub.hydrogen.capacity"]').text(
    t['sub.hydrogen.capacity']
  );
  $('[data-translate="sub.hydrogen.capacity.desc"]').text(
    t['sub.hydrogen.capacity.desc']
  );
  $('[data-translate="sub.hydrogen.safety"]').text(t['sub.hydrogen.safety']);
  $('[data-translate="sub.hydrogen.safety.desc"]').text(
    t['sub.hydrogen.safety.desc']
  );
  $('[data-translate="sub.hydrogen.charging"]').text(
    t['sub.hydrogen.charging']
  );
  $('[data-translate="sub.hydrogen.charging.desc"]').text(
    t['sub.hydrogen.charging.desc']
  );
  $('[data-translate="sub.hydrogen.clean"]').text(t['sub.hydrogen.clean']);
  $('[data-translate="sub.hydrogen.clean.desc"]').text(
    t['sub.hydrogen.clean.desc']
  );

  // Translate R&D field page
  $('[data-translate="sub.rnd_field.title"]').text(t['sub.rnd_field.title']);
  $('[data-translate="sub.rnd_field.desc"]').text(t['sub.rnd_field.desc']);
  $('[data-translate="sub.rnd_field.intro"]').text(t['sub.rnd_field.intro']);
  $('[data-translate="sub.rnd_field.intro.desc"]').html(
    t['sub.rnd_field.intro.desc']
  );
  $('[data-translate="sub.rnd_field.compressor"]').text(t['sub.rnd_field.compressor']);
  $('[data-translate="sub.rnd_field.compressor.desc"]').text(
    t['sub.rnd_field.compressor.desc']
  );
  $('[data-translate="sub.rnd_field.iot"]').text(t['sub.rnd_field.iot']);
  $('[data-translate="sub.rnd_field.iot.desc"]').text(
    t['sub.rnd_field.iot.desc']
  );
  $('[data-translate="sub.rnd_field.energy"]').text(t['sub.rnd_field.energy']);
  $('[data-translate="sub.rnd_field.energy.desc"]').text(
    t['sub.rnd_field.energy.desc']
  );

  console.log('Language changed to: ' + lang);
}

// ====================================
// Window Resize Handler
// ====================================
$(window).on('resize', function () {
  // Update fullpage on resize
  if (typeof fullpage_api !== 'undefined') {
    fullpage_api.reBuild();
  }

  // Close mobile menu on resize to desktop
  if ($(window).width() > 768) {
    $('.hidden_nav').removeClass('active');
    $('.hidden_nav_box').removeClass('active');
    $('body').css('overflow', '');
  }
});

// ====================================
// Prevent Default for Empty Links
// ====================================
$(document).on('click', 'a[href="#"]', function (e) {
  e.preventDefault();
});

// ====================================
// Add active class to current menu item
// ====================================
function updateActiveMenu() {
  var currentSection = $('.section.active').data('anchor');

  $('#fullpageMenu li').removeClass('active');
  $('#fullpageMenu li[data-menuanchor="' + currentSection + '"]').addClass(
    'active'
  );
}

// Update on section change
if (typeof fullpage_api !== 'undefined') {
  $(document).on('click', '#fullpageMenu a', function () {
    setTimeout(updateActiveMenu, 100);
  });
}

// ====================================
// Timeline Animation Effects
// ====================================
function initTimelineAnimation() {
  var $timeline = $('.timeline');
  if ($timeline.length === 0) return;

  var $timelineItems = $timeline.find('.timeline_item');
  var timelineAnimated = false;

  function animateTimeline() {
    if (timelineAnimated) return;

    var timelineTop = $timeline.offset().top;
    var timelineBottom = timelineTop + $timeline.outerHeight();
    var windowTop = $(window).scrollTop();
    var windowBottom = windowTop + $(window).height();

    // 타임라인이 뷰포트에 들어왔는지 확인 (약간의 여유 공간 추가)
    if (timelineBottom > windowTop - 200 && timelineTop < windowBottom + 200) {
      timelineAnimated = true;

      // 타임라인 라인 애니메이션
      setTimeout(function () {
        $timeline.addClass('animate');
      }, 300);

      // 각 항목을 순차적으로 나타나게 함 (AOS와 함께 작동)
      $timelineItems.each(function (index) {
        var $item = $(this);
        setTimeout(function () {
          $item.addClass('visible');
        }, 500 + index * 150);
      });
    }
  }

  // 초기 체크
  setTimeout(function () {
    animateTimeline();
  }, 100);

  // 스크롤 이벤트 (throttle 적용)
  var scrollTimeout;
  $(window).on('scroll', function () {
    if (!timelineAnimated) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        animateTimeline();
      }, 50);
    }
  });

  // 각 항목에 호버 효과 추가
  $timelineItems
    .on('mouseenter', function () {
      $(this).css('z-index', '10');
    })
    .on('mouseleave', function () {
      $(this).css('z-index', '');
    });
}

// DOM 로드 시 타임라인 애니메이션 초기화
$(document).ready(function () {
  // AOS 초기화 후 타임라인 애니메이션 실행
  setTimeout(function () {
    initTimelineAnimation();
  }, 300);

  // AOS 리프레시 후에도 타임라인 애니메이션 재실행
  setTimeout(function () {
    initTimelineAnimation();
  }, 1000);
});
