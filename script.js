document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Scroll down button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active nav link on page load
    updateActiveNavLink();
    
    // Menu Tab Functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItemsContainer = document.querySelector('.menu-items');
    
    if (menuTabs.length && menuItemsContainer) {
        // Sample menu data (in a real app, this would come from an API)
        const menuData = [
            {
                id: 1,
                title: 'Truffle Arancini',
                price: '$12',
                description: 'Crispy risotto balls with black truffle and mozzarella',
                category: 'starters',
                image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            },
            {
                id: 2,
                title: 'Beef Carpaccio',
                price: '$16',
                description: 'Thinly sliced raw beef with arugula, parmesan and truffle oil',
                category: 'starters',
                image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            },
            {
                id: 3,
                title: 'Lobster Risotto',
                price: '$32',
                description: 'Creamy Arborio rice with fresh lobster and herbs',
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            },
            {
                id: 4,
                title: 'Filet Mignon',
                price: '$38',
                description: '8oz grass-fed beef with roasted vegetables and red wine reduction',
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            },
            {
                id: 5,
                title: 'Wild Mushroom Pasta',
                price: '$24',
                description: 'Handmade pappardelle with seasonal wild mushrooms and truffle',
                category: 'mains',
                image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            },
            {
                id: 6,
                title: 'Tiramisu',
                price: '$10',
                description: 'Classic Italian dessert with espresso-soaked ladyfingers',
                category: 'desserts',
                image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            },
            {
                id: 7,
                title: 'Chocolate Fondant',
                price: '$12',
                description: 'Warm chocolate cake with a molten center and vanilla ice cream',
                category: 'desserts',
                image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            },
            {
                id: 8,
                title: 'Signature Cocktails',
                price: '$14',
                description: 'Ask your server about our seasonal craft cocktail selection',
                category: 'drinks',
                image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
        ];
        
        // Function to render menu items
        function renderMenuItems(category = 'all') {
            menuItemsContainer.innerHTML = '';
            
            const filteredItems = category === 'all' 
                ? menuData 
                : menuData.filter(item => item.category === category);
            
            if (filteredItems.length === 0) {
                menuItemsContainer.innerHTML = '<p class="no-items">No items found in this category.</p>';
                return;
            }
            
            filteredItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item fade-in';
                menuItem.innerHTML = `
                    <div class="menu-item-img" style="background-image: url('${item.image}')"></div>
                    <div class="menu-item-content">
                        <div class="menu-item-title">
                            <h3>${item.title}</h3>
                            <span>${item.price}</span>
                        </div>
                        <p>${item.description}</p>
                    </div>
                `;
                menuItemsContainer.appendChild(menuItem);
            });
        }
        
        // Initial render
        renderMenuItems();
        
        // Tab click event
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                menuTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-category');
                renderMenuItems(category);
            });
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (testimonials.length && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonials[index].classList.add('active');
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }
        
        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        }
        
        // Auto-rotate testimonials
        let testimonialInterval = setInterval(nextTestimonial, 5000);
        
        // Pause on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
        
        // Navigation buttons
        nextBtn.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            nextTestimonial();
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
        
        prevBtn.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            prevTestimonial();
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
        
        // Initialize
        showTestimonial(currentIndex);
    }
    
    // Reservation Modal
    const reservationBtns = document.querySelectorAll('.reservation-btn, .hero-btns .btn-outline');
    const modal = document.getElementById('reservationModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal && closeModal) {
        reservationBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would send the form data to a server here
            if (this.id === 'reservationForm' || this.id === 'modalReservationForm') {
                alert('Thank you for your reservation! We will contact you shortly to confirm.');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
                this.reset();
            } else if (this.classList.contains('newsletter-form')) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section, .menu-item, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('slide-up');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});