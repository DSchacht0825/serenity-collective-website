// Serenity Collective Website JavaScript

// Simple Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, looking for mobile menu elements');
    
    const toggle = document.getElementById('mobileMenuToggle');
    const overlay = document.getElementById('mobileMenuOverlay');
    
    console.log('Toggle element:', toggle);
    console.log('Overlay element:', overlay);
    
    if (toggle && overlay) {
        console.log('Both elements found, adding click handler');
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Toggle clicked');
            
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                console.log('Menu closed');
            } else {
                overlay.classList.add('active');
                console.log('Menu opened');
            }
        });
        
        // Close when clicking on links
        const links = overlay.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                overlay.classList.remove('active');
                console.log('Menu closed via link click');
            });
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !overlay.contains(e.target)) {
                overlay.classList.remove('active');
            }
        });
        
    } else {
        console.log('Mobile menu elements not found!');
        console.log('Available elements with IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
    }
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

// Contact Form Handler - DISABLED FOR FORMSPREE
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form-DISABLED');
    
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
            
            // Submit to contact form handler
            submitContactForm(formObject, this);
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

// Mobile navigation styles are now in CSS file

// Team Bio Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Bio data for each team member
    const bioData = {
        marissa: {
            name: 'Marissa Cahill Ower',
            role: 'Recovery specialist, curriculum designer, and pilot facilitator',
            photo: '../Images/marissa.jpg',
            bio: `<p>Marissa Cahill Ower is a certified Substance Abuse Counselor with over 11 years of experience walking alongside individuals in recovery. She holds a B.A. in Psychology with a minor in Biblical Studies. Marissa has been co-leading Serenity groups for five years. She first encountered Jesus in a powerful and life-changing way at the age of 18, marking the beginning of her spiritual journey. Coming from a family with a long history of alcoholism and facing her own struggles with addiction and mental health, she later found deeper healing, growth, and restoration through working the 12 steps in recovery. Sober for 11 years, Marissa is passionate about helping others encounter the hope and wholeness in Christ that she has experienced, growing in truth, grace, and renewed identity.</p>
                  <p>As a core contributor to The Serenity Project, she leads curriculum development and training.</p>`
        },
        michael: {
            name: 'Michael Amodeo',
            role: 'Project manager and pilot facilitator',
            photo: '../Images/michael.jpg',
            bio: `<p>Michael Amodeo is the Executive pastor of Discovery church in Carlsbad and the Vice President of Straight Shooter Heating and Cooling. Michael is passionate about helping others achieve freedom from addictions, informed by his own 12-step experience. He co-facilitates weekly Serenity Groups, guiding people towards belief and trust in Jesus and true freedom. He has been sober from all mind-altering substances for over 20 years and claims a charmed life beyond his wildest dreams, which he attributes to God's grace, obedience to Christ, commitment to scripture, and an intimate relationship with the Holy Spirit. With a background in finance, accounting, and sales, he also mentors and coaches marketplace leaders to reflect kingdom values in their businesses. He has a Bachelor's degree in Finance/Accounting and a Master's degree in Ministry, and lives in Oceanside with his wife Stephanie.</p>
                  <p>As a core contributor to The Serenity Project, he leads project management and finance.</p>`
        },
        daniel: {
            name: 'Daniel Schacht',
            role: 'Communications manager and pilot facilitator',
            photo: '../Images/daniel.jpg',
            bio: `<p>Daniel Schacht serves as the Director of Outreach for North County at the San Diego Rescue Mission. He brings a unique combination of professional expertise and lived experience with homelessness and addiction, which deeply informs his compassionate and strategic approach to outreach. Over the past eight years, Daniel has served the Rescue Mission in various leadership roles, including as Director of the Mission Academy—a year-long, 300-bed residential recovery program supporting individuals experiencing homelessness and/or substance use disorders. In addition to his work at the Mission, Daniel is a certified life coach and has provided consulting services to several nonprofit organizations, offering guidance in program development, organizational strategy, and recovery support.</p>
                  <p>As a core contributor to The Serenity Project, he leads its technical development and builds meaningful partnerships to expand its impact.</p>`
        },
        chris: {
            name: 'Chris Kohlbry',
            role: 'Key initiator, team leader, fundraising manager, and facilitation trainer',
            photo: '../Images/chris.jpg',
            bio: `<p>Chris Kohlbry's expertise in developing small group communities, along with a dynamic commitment to seeing people healed by the grace of Jesus led to the first "Serenity" group over 25 years ago. Chris brings 48 years of personal sobriety to the project, along with extensive ministry experience dedicated to those seeking restoration and ongoing recovery from addiction. He is passionate about teaching Scripture and encouraging others to let Jesus love them. He has served and planted congregations with a variety of ministry expressions across the United States and around the world. He resides in Carlsbad, California, with his wife, Pam.</p>
                  <p>As a core contributor to The Serenity Project, he leads the team, manages fundraising, and provides theological mentoring and facilitation training.</p>`
        },
        steve: {
            name: 'Steve Cahill',
            role: 'Technical support and operations',
            photo: '../Images/steve.jpg',
            bio: `<p>Steve Cahill has spent over 30 years in the semiconductor industry as a Test Engineer, specializing in writing test programs and developing hardware for the Automated Test Equipment (ATE) sector. He holds Bachelor's and Master's degrees in Electrical Engineering. While Steve's professional path has been highly technical, his heart has been drawn towards walking alongside those who struggle with addiction. His life has been touched by close friends and loved ones who have battled substance abuse—and overcome it. Their journeys, especially those rooted in Christ-centered recovery, have deeply inspired him. Later in life, Steve renewed his faith as a follower of Jesus, a turning point that reshaped his priorities and deepened his compassion for others. Steve serves through his church and at Christian events across Southern California, seeking to support and uplift those on the path to healing.</p>
                  <p>As a core contributor to The Serenity Project, he provides technical and operational support and encouragement to the team.</p>`
        },
        mark: {
            name: 'Mark Scandrette',
            role: 'Design and curriculum consultant, writer, and facilitation trainer',
            photo: '../Images/mark-1.jpg',
            bio: `<p>Mark Scandrette is the executive director of ReIMAGINE: A Center for Living Wisdom. He is an internationally recognized specialist in practical spiritual formation. With a background in both psychology and theology, he leads practical discipleship groups, provides spiritual direction, and trains and coaches leaders to facilitate and create small group resources. Mark also teaches in the Doctoral Department at Fuller Seminary and is a Mental Health First Aid Instructor. He is the author of five books, including Practicing the Way of Jesus, The Ninefold Path of Jesus, FREE, and Belonging and Becoming: Creating a Thriving Family Culture. Mark is passionate about taking an honest and active approach to discipleship. He has experienced significant healing and growth through this process and supports others to apply the teachings of Jesus to the needs and challenges of everyday life.</p>
                  <p>As a core contributor to The Serenity Project, he guides curriculum development and facilitator training.</p>`
        }
    };

    // Get modal elements with safety checks
    const modal = document.getElementById('bio-modal');
    const bioPhoto = document.getElementById('bio-photo');
    const bioName = document.getElementById('bio-name');
    const bioRole = document.getElementById('bio-role');
    const bioContent = document.getElementById('bio-content');
    const closeBtn = document.querySelector('.bio-close');

    // Early return if modal elements don't exist
    if (!modal || !bioPhoto || !bioName || !bioRole || !bioContent || !closeBtn) {
        console.log('Bio modal elements not found on this page');
        return;
    }

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
                
                // Focus on modal for better accessibility
                modal.setAttribute('tabindex', '-1');
                modal.focus();
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

// Function to submit contact form data
async function submitContactForm(formData, form) {
    try {
        // Show loading state
        const submitBtn = form.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send data to Netlify function
        const response = await fetch('/.netlify/functions/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showNotification(result.message || 'Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
        } else {
            throw new Error(result.error || 'Failed to send message');
        }
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Something went wrong. Please try again or contact us directly at info@serenitycollective.org', 'error');
        
        // Reset button
        const submitBtn = form.querySelector('.submit-button');
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
}

// Pilot Group Notice Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('Looking for pilot group elements...');
    const pilotGroupCheckbox = document.getElementById('pilot-group');
    const pilotGroupNotice = document.getElementById('pilot-group-notice');
    
    console.log('Pilot checkbox found:', pilotGroupCheckbox);
    console.log('Pilot notice found:', pilotGroupNotice);
    
    if (pilotGroupCheckbox && pilotGroupNotice) {
        console.log('Both elements found, adding event listener');
        pilotGroupCheckbox.addEventListener('change', function() {
            console.log('Checkbox changed, checked:', this.checked);
            if (this.checked) {
                pilotGroupNotice.style.display = 'block';
                console.log('Notice shown');
                pilotGroupNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                pilotGroupNotice.style.display = 'none';
                console.log('Notice hidden');
            }
        });
    } else {
        console.log('Elements not found!');
    }
});

// Console welcome message
console.log(`
🕊️ Welcome to Serenity Collective
Jesus meets us exactly where we are, not where we think we should be.

For support or questions, contact us at:
📧 info@serenitycollective.org
📞 619-300-8337
`);