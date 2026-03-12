// =====NO SE USA SOLO ERA UNA PRUEBA PERO ME GUSTO JAJAJAJAJ NO ES CHATGPT=====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENÚ MÓVIL =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // ===== ANIMACIÓN DE APARICIÓN (INTERSECTION OBSERVER) =====
    // Nota: En tu nuevo diseño ya no tienes .service-card con opacity 0 inicial
    // pero mantenemos la funcionalidad para elementos que quieras animar
    
    const animatedElements = document.querySelectorAll('.service-card, .case-item, .step');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2, rootMargin: '0px' });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }
    
    // ===== EFECTO PARALLAX PARA NUBES (CORREGIDO) =====
    // Verificamos que existan las nubes antes de aplicar el efecto
    const clouds = document.querySelectorAll('.cloud');
    
    if (clouds.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            clouds.forEach((cloud, index) => {
                const speed = 0.5 + (index * 0.2);
                cloud.style.transform = `translateY(${scrolled * speed * 0.15}px)`;
            });
        });
    }
    
    // ===== EFECTO HOVER 3D EN TARJETAS FLOTANTES =====
    const floatingCards = document.querySelectorAll('.floating-card, .hero-card');
    
    floatingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // ===== ANIMACIÓN DE CONTADORES (CORREGIDA) =====
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count')) || 0;
        let current = 0;
        const increment = target / 50; // 50 pasos
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.innerText = target;
                clearInterval(timer);
            } else {
                element.innerText = Math.floor(current);
            }
        }, 30);
    }
    
    // ===== MODAL DE SERVICIOS (SOLO SI EXISTE) =====
    const modal = document.getElementById('serviceModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    
    if (openBtn && modal) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Pequeña animación
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    function closeModal() {
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Cerrar modal al hacer clic fuera
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // ===== MODAL DE VIDEOS (SI EXISTE) =====
    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const videoCloseBtn = videoModal?.querySelector(".close");
    
    if (videoModal && modalVideo) {
        document.querySelectorAll(".portfolio-item, .case-item").forEach(item => {
            item.addEventListener("click", function() {
                const videoSrc = this.getAttribute("data-video");
                if (videoSrc) {
                    modalVideo.src = videoSrc;
                    videoModal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                }
            });
        });
        
        function closeVideoModal() {
            videoModal.style.display = "none";
            modalVideo.pause();
            modalVideo.src = "";
            document.body.style.overflow = "";
        }
        
        if (videoCloseBtn) {
            videoCloseBtn.onclick = closeVideoModal;
        }
        
        videoModal.onclick = (e) => {
            if (e.target === videoModal) closeVideoModal();
        };
        
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && videoModal.style.display === "flex") {
                closeVideoModal();
            }
        });
    }
    
    // ===== SMOOTH SCROLL PARA ENLACES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== FILTRO DE PORTFOLIO (SI EXISTE) =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ===== PARTICLES.JS (SI ESTÁ CARGADO) =====
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#00b4d8" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 2, random: true },
                line_linked: { enable: false },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    
});
