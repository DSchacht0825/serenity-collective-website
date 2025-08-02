// Serenity Collective Website JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button if it doesn't exist
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    // Add mobile menu toggle functionality
    function createMobileToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-toggle';
        toggleButton.innerHTML = '☰';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
        
        toggleButton.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            toggleButton.innerHTML = navMenu.classList.contains('mobile-active') ? '✕' : '☰';
        });
        
        nav.appendChild(toggleButton);
    }
    
    // Only create mobile toggle on smaller screens
    if (window.innerWidth <= 768) {
        createMobileToggle();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const existingToggle = document.querySelector('.mobile-toggle');
        
        if (window.innerWidth <= 768 && !existingToggle) {
            createMobileToggle();
        } else if (window.innerWidth > 768 && existingToggle) {
            existingToggle.remove();
            navMenu.classList.remove('mobile-active');
        }
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Simple client-side validation
            if (!formObject.name || !formObject.email || !formObject.subject || !formObject.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '4px',
        color: 'white',
        fontSize: '0.9rem',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease',
        maxWidth: '400px'
    });
    
    // Set background color based on type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add fade-in animation for page elements
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const elementsToAnimate = document.querySelectorAll('.approach-item, .resource-item, .step, .contact-item');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Add CSS for mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .mobile-toggle {
                display: block;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: #2c3e50;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            
            .nav-menu.mobile-active {
                display: flex;
            }
            
            .nav-menu li {
                margin: 0.5rem 0;
            }
        }
    `;
    
    document.head.appendChild(style);
});

// Team Bio Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Bio data for each team member
    const bioData = {
        marissa: {
            name: 'Marissa Ower',
            role: 'Curriculum consultant, and pilot facilitator',
            photo: '../assets/images/marissa-ower.jpg',
            bio: `<p>Marissa brings extensive experience in curriculum development and group facilitation to the Serenity Collective team. Her heart for seeing people find healing and freedom through Jesus is evident in her thoughtful approach to creating resources that meet people where they are.</p>
                  <p>As both a curriculum consultant and pilot facilitator, Marissa helps shape the practical elements of our 12-step, Jesus-centered approach while also walking alongside participants in their journey toward wholeness.</p>
                  <p>Her background in educational design and pastoral care uniquely equips her to create materials that are both theologically sound and practically applicable for people from all walks of life.</p>`
        },
        michael: {
            name: 'Michael Amodeo',
            role: 'Project manager and pilot facilitator',
            photo: '../assets/images/michael-amodeo.jpg',
            bio: `<p>Michael serves as the organizational backbone of Serenity Collective, ensuring that our vision translates into effective, well-coordinated programs. His role as project manager involves overseeing the development and implementation of our Serenity Groups model.</p>
                  <p>As a pilot facilitator, Michael brings both administrative excellence and pastoral heart to his work with participants. He understands that true transformation happens in the details - the careful preparation, the thoughtful follow-up, and the consistent presence that creates safety for vulnerable people.</p>
                  <p>His commitment to excellence in project management serves the deeper purpose of creating space where people can encounter the healing presence of Jesus.</p>`
        },
        daniel: {
            name: 'Daniel Schacht',
            role: 'Communications manager and pilot facilitator',
            photo: '../assets/images/daniel-schacht.jpg',
            bio: `<p>Daniel is responsible for sharing the heart and vision of Serenity Collective with the broader community. As communications manager, he crafts the messaging that helps people understand what we're about and how they might connect with our mission.</p>
                  <p>His work as a pilot facilitator gives him firsthand experience of the transformation that happens in Serenity Groups, which informs his ability to communicate authentically about our approach.</p>
                  <p>Daniel's passion is helping people see that the Gospel really is good news - that Jesus meets us exactly where we are and invites us into a life of freedom, joy, and authentic community.</p>`
        },
        chris: {
            name: 'Chris Kohlbry',
            role: 'Key initiator, team leader, fundraising manager, and facilitation trainer',
            photo: '../assets/images/chris-kohlbry.jpg',
            bio: `<p>Chris is the visionary leader behind Serenity Collective, having initiated this work out of a deep conviction that the Church needs better resources for helping people find freedom and healing through Jesus.</p>
                  <p>As team leader, Chris provides strategic direction and pastoral oversight for our entire initiative. His role as fundraising manager involves securing the resources necessary to develop and sustain this ministry.</p>
                  <p>Perhaps most importantly, Chris serves as a facilitation trainer, equipping others to lead Serenity Groups with both competence and compassion. His heart is to see this approach spread to communities everywhere, creating networks of healing and hope centered on the person and work of Jesus Christ.</p>`
        },
        steve: {
            name: 'Steve Cahill',
            role: 'Technical support and ???',
            photo: '../assets/images/steve-cahill.jpg',
            bio: `<p>Steve provides essential technical support for Serenity Collective, ensuring that our digital infrastructure serves our mission effectively. His behind-the-scenes work makes it possible for us to connect with people, share resources, and coordinate our efforts.</p>
                  <p>While his role may seem less visible than others, Steve's contribution is vital to our ability to reach people who are seeking healing and community. He understands that technology should serve human connection, not replace it.</p>
                  <p>Steve's commitment to excellence in technical support reflects his heart for the mission - he wants to remove barriers that might prevent people from accessing the hope and healing available through Jesus.</p>`
        },
        mark: {
            name: 'Mark Scandrette',
            role: 'Design and curriculum consultant, writer, and facilitation trainer',
            photo: '../assets/images/mark-scandrette.jpg',
            bio: `<p>Mark brings decades of experience in spiritual formation, community building, and curriculum design to Serenity Collective. As a widely respected author and teacher, he provides theological depth and practical wisdom to our approach.</p>
                  <p>His role as design and curriculum consultant involves shaping the overall framework of our 12-step, Jesus-centered approach, ensuring that it remains both faithful to scripture and relevant to contemporary struggles.</p>
                  <p>As a writer and facilitation trainer, Mark helps create the resources that guide both participants and leaders through the journey of healing and transformation. His work is characterized by a rare combination of theological sophistication and practical accessibility.</p>`
        }
    };

    // Get modal elements
    const modal = document.getElementById('bio-modal');
    const bioPhoto = document.getElementById('bio-photo');
    const bioName = document.getElementById('bio-name');
    const bioRole = document.getElementById('bio-role');
    const bioContent = document.getElementById('bio-content');
    const closeBtn = document.querySelector('.bio-close');

    // Add click event listeners to all bio buttons
    document.querySelectorAll('.bio-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const teamMember = this.closest('.team-member');
            const bioKey = teamMember.getAttribute('data-bio');
            const bio = bioData[bioKey];

            if (bio) {
                // Populate modal with bio data
                bioPhoto.src = bio.photo;
                bioPhoto.alt = bio.name;
                bioName.textContent = bio.name;
                bioRole.textContent = bio.role;
                bioContent.innerHTML = bio.bio;

                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal when clicking the X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
});

// Brevo Email Signup Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const brevoForm = document.getElementById('serenity-signup');
    
    if (brevoForm) {
        brevoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const contactData = {
                email: formData.get('email'),
                attributes: {
                    FIRSTNAME: formData.get('firstName'),
                    LASTNAME: formData.get('lastName'),
                    CITY: formData.get('city') || '',
                    STATE: formData.get('state') || '',
                    PHONE: formData.get('phone') || ''
                },
                listIds: [1], // Replace with your actual Brevo list ID
                updateEnabled: true
            };
            
            // Get interests
            const interests = [];
            const checkboxes = this.querySelectorAll('input[name="interests"]:checked');
            checkboxes.forEach(checkbox => {
                interests.push(checkbox.value);
            });
            
            if (interests.length > 0) {
                contactData.attributes.INTERESTS = interests.join(', ');
            }
            
            // Basic validation
            if (!contactData.email || !contactData.attributes.FIRSTNAME || !contactData.attributes.LASTNAME) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Submit to Brevo (you'll need to replace this with your actual Brevo setup)
            submitToBrevo(contactData, this);
        });
    }
});

// Function to submit data to Brevo
async function submitToBrevo(contactData, form) {
    try {
        // Show loading state
        const submitBtn = form.querySelector('.signup-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Joining...';
        submitBtn.disabled = true;
        
        // Send data to Netlify function
        const response = await fetch('/.netlify/functions/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: contactData.email,
                firstName: contactData.attributes.FIRSTNAME,
                lastName: contactData.attributes.LASTNAME,
                city: contactData.attributes.CITY,
                state: contactData.attributes.STATE,
                phone: contactData.attributes.PHONE,
                interests: contactData.attributes.INTERESTS
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showNotification(result.message || 'Welcome to our community! Check your email for confirmation.', 'success');
            form.reset();
            
            // Optional: redirect to thank you page
            // setTimeout(() => {
            //     window.location.href = '/thank-you.html';
            // }, 2000);
            
        } else {
            throw new Error(result.error || 'Subscription failed');
        }
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    } catch (error) {
        console.error('Subscription error:', error);
        showNotification('Something went wrong. Please try again or contact us directly.', 'error');
        
        // Reset button
        const submitBtn = form.querySelector('.signup-submit-btn');
        submitBtn.textContent = 'Join Our Community';
        submitBtn.disabled = false;
    }
}

// Console welcome message
console.log(`
🕊️ Welcome to Serenity Collective
Jesus meets us exactly where we are, not where we think we should be.

For support or questions, contact us at:
📧 info@serenitycollective.org
📞 619-300-8337
`);