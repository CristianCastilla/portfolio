import './style.css'

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in')
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll('section').forEach(section => {
  section.classList.add('reveal')
  observer.observe(section)
})

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const targetId = this.getAttribute('href')
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  })
})

// Load More Projects logic
const seeMoreBtn = document.getElementById('see-more-btn')
if (seeMoreBtn) {
  seeMoreBtn.addEventListener('click', function () {
    const hiddenProjects = document.querySelectorAll('.project-hidden')

    if (hiddenProjects.length > 0) {
      hiddenProjects.forEach(project => {
        project.classList.remove('project-hidden')
        // Re-observe if needed for animation
        if (typeof observer !== 'undefined') {
          observer.observe(project)
        }
      })

      // Change button text and style
      this.innerText = 'Ver todos los proyectos'
      this.classList.remove('btn-outline')
      this.classList.add('btn-primary')
    } else {
      // If no more hidden projects, go to the full list
      window.location.href = 'projects.html'
    }
  })
}
