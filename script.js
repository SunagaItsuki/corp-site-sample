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
const mobileMenu = document.querySelector('.mobile-menu');
const menuCloseBtn = document.querySelector('.menu-close');

// ハンバーガーボタンのクリックイベント
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // スクロール防止
});

// 閉じるボタンのクリックイベント
if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll'); // スクロール許可
    });
}

// サブメニューの開閉制御
document.addEventListener('DOMContentLoaded', () => {
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    
    hasSubmenuItems.forEach(item => {
        const toggleBtn = item.querySelector('.submenu-toggle');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 他のすべてのサブメニューを閉じる
                hasSubmenuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // クリックされた項目のサブメニューをトグル
                item.classList.toggle('active');
            });
        }
        
        // メインメニュー項目のクリックイベント（サブメニューがある場合）
        const mainLink = item.querySelector('a');
        if (mainLink) {
            mainLink.addEventListener('click', (e) => {
                // サブメニューがある場合は、リンクの通常の動作を防止してサブメニューを開く
                if (item.querySelector('.submenu')) {
                    e.preventDefault();
                    
                    // 他のすべてのサブメニューを閉じる
                    hasSubmenuItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // クリックされた項目のサブメニューをトグル
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    // 画面サイズ変更時の動作
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // PCサイズに戻った際にモバイルメニューを閉じる
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll'); // スクロール許可
            
            // すべてのサブメニューを閉じる
            hasSubmenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
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
if (contactForm) {
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
}

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
// 即時実行関数でテーマ設定を管理
(function setupThemeToggle() {
    // ID属性でテーマ切り替えボタンを取得
    const themeToggle = document.getElementById('theme-toggle-btn');
    const root = document.documentElement;

    // テーマを適用する関数
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        
        // アイコンの切り替え
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('theme', theme);
    }

    // ローカルストレージからテーマ設定を取得
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // システムのテーマ設定を確認
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // テーマ切り替え機能
    function handleThemeToggle() {
        console.log('テーマ切り替えボタンがクリックされました');
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        
        // スムーズな遷移のためのアニメーション
        document.body.style.transition = 'background-color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    if (themeToggle) {
        // インラインイベントを追加し、確実にクリックイベントが処理されるようにする
        themeToggle.onclick = handleThemeToggle;
        console.log('テーマ切り替えボタンのイベントを設定しました');
    } else {
        console.error('テーマ切り替えボタンが見つかりません');
        // DOMの読み込みが完了していない可能性があるため、DOMContentLoadedイベントでも試みる
        document.addEventListener('DOMContentLoaded', function() {
            const btn = document.getElementById('theme-toggle-btn');
            if (btn) {
                btn.onclick = handleThemeToggle;
                console.log('DOMContentLoaded後にテーマ切り替えボタンのイベントを設定しました');
            } else {
                console.error('DOMContentLoaded後もテーマ切り替えボタンが見つかりません');
            }
        });
    }

    // システムのテーマ変更を監視
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });
})();

// お問い合わせメール機能
document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.getElementById('contact-button');
    const inquiryTypeSelect = document.getElementById('inquiry-type');
    
    if (contactButton && inquiryTypeSelect) {
        contactButton.addEventListener('click', () => {
            const selectedType = inquiryTypeSelect.value;
            const mailtoData = generateMailtoData(selectedType);
            
            window.location.href = mailtoData;
        });
    }

    // フォールバックとして、ここでもテーマ切り替えボタンのイベントを設定する
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn && !themeToggleBtn.onclick) {
        themeToggleBtn.onclick = function() {
            console.log('DOMContentLoadedイベントからテーマを切り替えます');
            const root = document.documentElement;
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // テーマを適用
            root.setAttribute('data-theme', newTheme);
            
            // アイコンの切り替え
            this.innerHTML = newTheme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
            
            localStorage.setItem('theme', newTheme);
            
            // スムーズな遷移のためのアニメーション
            document.body.style.transition = 'background-color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        };
        console.log('バックアップのテーマ切り替えイベントを設定しました');
    }
});

// 選択したお問い合わせ項目に応じてメールテンプレートを生成
function generateMailtoData(inquiryType) {
    const email = 'info@sunasuna.co.jp';
    let subject = '';
    let body = '';
    
    switch (inquiryType) {
        case 'general':
            subject = '【一般的なお問い合わせ】';
            body = `スナスナ株式会社 ご担当者様\n\n一般的なお問い合わせをいたします。\n\n`;
            break;
        case 'service':
            subject = '【サービスに関するお問い合わせ】';
            body = `スナスナ株式会社 ご担当者様\n\n御社のサービスについて、以下の点についてお問い合わせいたします。\n\n`;
            break;
        case 'support':
            subject = '【サポートに関するお問い合わせ】';
            body = `スナスナ株式会社 ご担当者様\n\n現在利用中のサービスについて、サポートをお願いいたします。\n\n`;
            break;
        case 'business':
            subject = '【業務提携のご相談】';
            body = `スナスナ株式会社 ご担当者様\n\n業務提携について相談させていただきたく、ご連絡いたしました。\n\n`;
            break;
        case 'recruitment':
            subject = '【採用に関するお問い合わせ】';
            body = `スナスナ株式会社 採用ご担当者様\n\n採用について、以下のお問い合わせをいたします。\n\n`;
            break;
        default:
            subject = '【お問い合わせ】';
            body = `スナスナ株式会社 ご担当者様\n\nお問い合わせいたします。\n\n`;
    }
    
    body += `お名前：\nメールアドレス：\n電話番号：\n\n内容：\n\n`;
    body += `以上、よろしくお願いいたします。`;
    
    // URLエンコードしてmailtoリンクを作成
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
} 