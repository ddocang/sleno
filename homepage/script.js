// AOS 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});

// fullPage.js 초기화
function initFullPage() {
    if (typeof fullpage === 'undefined') {
        setTimeout(initFullPage, 100);
        return;
    }
    
    if (typeof fullpage_api !== 'undefined') {
        return;
    }
    
    new fullpage('#fullpage', {
        licenseKey: 'gplv3-license',
        anchors: ['slide1', 'slide2', 'slide3', 'slide4'],
        navigation: false,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: false,
        easing: 'easeInOutCubic',
        css3: true,
        onLeave: function(origin, destination, direction) {
            // 섹션 전환 시 AOS 재초기화
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        },
        afterLoad: function(origin, destination, direction) {
            // 섹션 로드 후 AOS 재초기화
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFullPage();
});

// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// 네비게이션 링크 클릭 시 fullPage.js 이동
document.querySelectorAll('a[href^="#slide"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (typeof fullpage_api !== 'undefined') {
            fullpage_api.moveTo(target.replace('#', ''));
        }
        // 모바일 메뉴 닫기
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// 폼 제출 처리
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('문의가 전송되었습니다. 감사합니다!');
        contactForm.reset();
    });
}

// 비즈니스 섹션 이미지 로드 확인
document.addEventListener('DOMContentLoaded', () => {
    const businessImages = document.querySelectorAll('#c2_wrap .list li img');
    businessImages.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});

