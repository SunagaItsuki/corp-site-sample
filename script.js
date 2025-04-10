// AOSの初期化
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// GSAPアニメーション
gsap.registerPlugin(ScrollTrigger);

// ヒーローセクションのアニメーション
gsap.from(".hero-content", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out"
});

// サービスカードのアニメーション
gsap.utils.toArray('.service-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// 数値カウントアップアニメーション
const stats = document.querySelectorAll('.stat-item .number');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    gsap.to(stat, {
        scrollTrigger: {
            trigger: stat,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power1.inOut"
    });
});

// ハンバーガーメニューの制御
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if (hamburger.classList.contains('active')) {
        gsap.to('.nav-links', {
            duration: 0.5,
            height: 'auto',
            opacity: 1,
            ease: "power2.out"
        });
    } else {
        gsap.to('.nav-links', {
            duration: 0.5,
            height: 0,
            opacity: 0,
            ease: "power2.in"
        });
    }
});

// スクロールアニメーション
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// フォーム送信アニメーション
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '送信中...';
    
    // 送信アニメーション
    gsap.to(submitBtn, {
        duration: 0.5,
        scale: 0.95,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
    });
    
    // ここに実際のフォーム送信処理を追加
    setTimeout(() => {
        submitBtn.innerHTML = '送信完了！';
        gsap.to(submitBtn, {
            duration: 0.5,
            backgroundColor: '#4CAF50',
            color: 'white'
        });
    }, 1500);
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// スクロールアニメーション
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.querySelectorAll('.service-card, .news-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// テーマ設定の管理
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

// ローカルストレージからテーマ設定を取得
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
} else {
    // システムのテーマ設定を確認
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// テーマ切り替え機能
themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // アイコンの切り替え
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    
    // スムーズな遷移のためのアニメーション
    document.body.style.transition = 'background-color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
});

// システムのテーマ変更を監視
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        root.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
}); 