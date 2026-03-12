// Tener cuidado porque Omar borra codigo :< //
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const hero = document.querySelector('.hero');
    const logo = document.querySelector('.logo img');
    

    if (!header || !hero || !logo) {
        console.error('No se encontraron los elementos necesarios:', {
            header: header,
            hero: hero,
            logo: logo
        });
        return; 
    }
    
    function checkScroll() {
        const heroHeight = hero.offsetHeight;
        
        if (window.scrollY >= heroHeight - 100) {
            header.classList.add('scrolled');
            logo.src = "../IMAGENES/logo-easy.png";
        } else {
            header.classList.remove('scrolled');
            logo.src = "../IMAGENES/easy-systems.png";
        }
    }
    

    checkScroll();
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
});


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    

    if (!menuToggle || !navLinks) {
        console.error('No se encontraron los elementos del menú:', {
            menuToggle: menuToggle,
            navLinks: navLinks
        });
        return;
    }
    

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); 
        navLinks.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    

    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !menuToggle.contains(e.target) && 
            !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    

    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});