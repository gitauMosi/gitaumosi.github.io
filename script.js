// Portfolio Modal Functionality
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioModal = document.getElementById('portfolioModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');

// Project data for modal content
const projectData = {
    1: {
        title: "Flutter Dermatology App",
        description: "A comprehensive mobile application for dermatology consultations and skin health management. Features include AI-powered skin analysis, appointment scheduling, medication tracking, and telemedicine capabilities.",
        image: "assets/images/portfolio/1.png",
        technologies: ["Flutter", "Dart", "Firebase", "TensorFlow Lite", "REST API"],
        liveLink: "/dermatology-app",
        githubLink: "https://github.com/gitauMosi/health_app"
    },
    2: {
        title: "Maskani App",
        description: "Property management application connecting tenants and landlords. Features include rent payment processing, maintenance requests, document storage, and communication tools.",
        image: "assets/images/portfolio/2.png",
        technologies: ["Flutter", "Dart", "Node.js", "MongoDB", "Stripe API"],
        liveLink: "/maskani-app",
        githubLink: "https://github.com/gitauMosi/rentals_app"
    },
    3: {
        title: "E-commerce App (Mobx)",
        description: "Feature-rich shopping application with state management using Mobx. Includes product browsing, shopping cart, user authentication, and payment integration.",
        image: "assets/images/portfolio/4.png",
        technologies: ["Flutter", "Dart", "Mobx", "Firebase", "PayPal API"],
        liveLink: "/ecommerce-app",
        githubLink: "https://github.com/gitauMosi/mobx_eccommerce"
    },
    4: {
        title: "Social Media App",
        description: "Community platform with real-time messaging, post sharing, user profiles, and content moderation. Built with scalability in mind for large user bases.",
        image: "assets/images/portfolio/20.png",
        technologies: ["Kotlin", "Jetpack Compose", "Firebase", "WebSocket", "AWS"],
        liveLink: "/social-app",
        githubLink: "https://github.com/gitauMosi/thread_social_app"
    },
    5: {
        title: "Eventify App",
        description: "Real-time event management application for creating, discovering, and attending events. Features include ticket purchasing, event notifications, and attendee management.",
        image: "assets/images/portfolio/5.png",
        technologies: ["Flutter", "Dart", "Firebase", "Google Maps API", "Stripe"],
        liveLink: "/eventify-app",
        githubLink: "https://github.com/gitauMosi/event_palse_app"
    },
    6: {
        title: "Quoty App",
        description: "Digital bookstore application with reading features, book recommendations, and social sharing capabilities. Includes offline reading mode and progress tracking.",
        image: "assets/images/portfolio/3.png",
        technologies: ["Flutter", "Dart", "SQLite", "Firebase Auth", "PDF Reader"],
        liveLink: "/quoty-app",
        githubLink: "https://github.com/gitauMosi/quote_app"
    }
};

// Open modal when portfolio item is clicked
portfolioItems.forEach(item => {
    item.addEventListener('click', function (e) {
        // Don't open modal if clicking on the button specifically
        if (e.target.classList.contains('view-project-btn')) {
            e.stopPropagation();
            return;
        }

        const projectId = this.getAttribute('data-project');
        openModal(projectId);
    });

    // Also handle button clicks
    const button = item.querySelector('.view-project-btn');
    if (button) {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const projectId = this.closest('.portfolio-item').getAttribute('data-project');
            openModal(projectId);
        });
    }
});

// Open modal function
function openModal(projectId) {
    const project = projectData[projectId];

    if (!project) return;

    // Update modal content
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = project.title;
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectDescription').textContent = project.description;

    // Update technologies
    const techTagsContainer = document.getElementById('modalTechTags');
    techTagsContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techTagsContainer.appendChild(tag);
    });

    // Update links
    const liveLink = document.getElementById('modalLiveLink');
    const githubLink = document.getElementById('modalGithubLink');

    liveLink.href = project.liveLink;
    githubLink.href = project.githubLink;

    // Show modal
    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal functions
function closeModal() {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking close button or overlay
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
        closeModal();
    }
});



// PDF Viewer Functionality
const viewCvBtn = document.getElementById('viewCvBtn');
const pdfModal = document.getElementById('pdfModal');
const pdfModalClose = document.getElementById('pdfModalClose');
const pdfOverlay = document.querySelector('.pdf-modal .modal-overlay');

// Open PDF Modal
viewCvBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openPdfModal();
});

// Open PDF Modal function
function openPdfModal() {
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Add loading state
    const pdfContainer = document.querySelector('.pdf-viewer-container');
    if (pdfContainer) {
        const loadingHtml = `
            <div class="pdf-loading">
                <div class="pdf-loading-spinner"></div>
                <p>Loading Resume...</p>
            </div>
        `;
        pdfContainer.innerHTML = loadingHtml + pdfContainer.innerHTML;

        // Remove loading state after PDF loads
        const iframe = pdfContainer.querySelector('iframe');
        if (iframe) {
            iframe.onload = function () {
                const loadingElement = pdfContainer.querySelector('.pdf-loading');
                if (loadingElement) {
                    loadingElement.remove();
                }
            };
        }
    }
}

// Close PDF Modal
function closePdfModal() {
    pdfModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal events
pdfModalClose.addEventListener('click', closePdfModal);
pdfOverlay.addEventListener('click', closePdfModal);

// Close with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
        closePdfModal();
    }
});

// Optional: Check if PDF exists
function checkPdfExists() {
    fetch('/assets/Amos-Resume.pdf')
        .then(response => {
            if (!response.ok) {
                console.warn('PDF file not found or not accessible');
                // Optionally disable the view button or show an error
                viewCvBtn.disabled = true;
                viewCvBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> CV Not Available';
                viewCvBtn.style.opacity = '0.6';
            }
        })
        .catch(error => {
            console.error('Error checking PDF:', error);
        });
}

// Check on page load
document.addEventListener('DOMContentLoaded', checkPdfExists);

// Featured Projects Modal Functionality
const featuredProjectCards = document.querySelectorAll('.featured-project-card');
const featuredModal = document.getElementById('featuredProjectModal');
const featuredModalClose = document.getElementById('featuredModalClose');
const featuredModalBody = document.querySelector('.featured-modal-body');

// Featured Project Data
const featuredProjectsData = {
    'featured-1': {
        title: 'Flutter Dermatology App',
        description: 'A comprehensive medical application designed to revolutionize dermatology consultations. The app features AI-powered skin analysis using machine learning algorithms, telemedicine capabilities for remote consultations, appointment scheduling, medication tracking, and secure health record management.',
        longDescription: 'This app was developed to address the growing need for accessible dermatological care. Key challenges included implementing real-time skin analysis, ensuring HIPAA compliance for health data, and creating an intuitive user interface for patients of all ages.',
        image: 'assets/images/portfolio/1.png',
        category: 'Mobile App • Healthcare',
        year: '2024',
        techStack: ['Flutter', 'Dart', 'Firebase', 'TensorFlow Lite', 'Node.js', 'MongoDB', 'WebRTC', 'REST API'],
        features: [
            'AI-powered skin condition analysis',
            'Secure video consultations',
            'Medication reminder system',
            'Progress tracking with photos',
            'HIPAA compliant data storage',
            'Multi-language support'
        ],
        stats: {
            users: '5,000+',
            rating: '4.8',
            downloads: '10,000+',
            accuracy: '94%'
        },
        liveLink: '#',
        githubLink: 'https://github.com/gitauMosi/health_app',
        caseStudy: '#'
    },
    'featured-2': {
        title: 'BookShelf Mobile App',
        description: 'A modern Flutter application for discovering, managing, and reading digital books, provides interface for browsing books from digital libraries.',
        longDescription: 'Developed to revolutionize digital reading experience by providing a comprehensive platform for book discovery, management, and reading. Features include integration with multiple digital libraries, seamless reading interface, and personalized book recommendations.',
        image: 'assets/images/portfolio/bookshelf.png',
        category: 'Education • Digital Library',
        year: '2025',
        techStack: ['Flutter', 'API Integration', 'MongoDB', 'Stripe', 'Firebase', 'Cloud Storage'],
        features: [
            'Digital book discovery and browsing',
            'Multi-library integration',
            'Reading progress tracking',
            'Personalized recommendations',
            'Offline reading support',
            'Social sharing capabilities'
        ],
        stats: {
            books: '50,000+',
            users: '5,000+',
            downloads: '15,000+',
            rating: '4.7'
        },
        liveLink: '#',
        githubLink: 'https://github.com/gitauMosi/book_shelf',
        caseStudy: '#'
    },
    'featured-3': {
        title: 'KU University App',
        description: 'This application Kenyatta University is developed to provide students, staff, and visitors with convenient access to official university events, announcements, and news published on the university\'s main website.',
        longDescription: 'Designed specifically for Kenyatta University to bridge the communication gap between the institution and its community. The app provides seamless access to university content, event notifications, and announcements, ensuring students and staff stay updated with campus activities.',
        image: 'assets/images/portfolio/ku_app.png',
        category: 'Education • University',
        year: '2024',
        techStack: ['Flutter', 'WordPress', 'Firebase', 'REST API', 'Push Notifications', 'Cloud Functions'],
        features: [
            'University news and announcements',
            'Event calendar and notifications',
            'Staff and student directory',
            'Campus information and maps',
            'Push notifications for updates',
            'Offline content caching'
        ],
        stats: {
            users: '25,000+',
            events: '500+',
            news: '1,200+',
            uptime: '99.8%'
        },
        liveLink: '#',
        githubLink: '#',
        caseStudy: '#'
    }
};

// Open Featured Project Modal
featuredProjectCards.forEach(card => {
    card.addEventListener('click', function (e) {
        if (e.target.closest('.view-project-btn') || e.target.closest('.project-preview-btn')) {
            const projectId = this.getAttribute('data-project');
            openFeaturedModal(projectId);
        }
    });
});

function openFeaturedModal(projectId) {
    const project = featuredProjectsData[projectId];

    if (!project) return;

    // Generate modal content
    const modalContent = `
        <div class="featured-project-details">
            <div class="project-detail-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-detail-content">
                <h2>${project.title}</h2>
                <div class="project-meta">
                    <span><i class="far fa-folder"></i> ${project.category}</span>
                    <span><i class="far fa-calendar"></i> ${project.year}</span>
                </div>
                <p class="project-detail-description">${project.longDescription}</p>
                
                <div class="features-list">
                    <h4>Key Features</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-detail-tech">
                    <h4>Technology Stack</h4>
                    <div class="tech-stack-grid">
                        ${project.techStack.map(tech => `<div class="tech-stack-item">${tech}</div>`).join('')}
                    </div>
                </div>
                
                <div class="detail-actions">
                    <a href="${project.liveLink}" class="btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubLink}" class="btn btn-outline" target="_blank">
                        <i class="fab fa-github"></i> Source Code
                    </a>
                    <a href="${project.caseStudy}" class="btn btn-outline">
                        <i class="fas fa-file-alt"></i> Case Study
                    </a>
                </div>
            </div>
        </div>
    `;

    // Update modal content
    featuredModalBody.innerHTML = modalContent;

    // Show modal
    featuredModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Featured Project Modal
function closeFeaturedModal() {
    featuredModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal events
featuredModalClose.addEventListener('click', closeFeaturedModal);
featuredModal.querySelector('.modal-overlay').addEventListener('click', closeFeaturedModal);

// Close with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && featuredModal.classList.contains('active')) {
        closeFeaturedModal();
    }
});