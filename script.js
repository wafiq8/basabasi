console.log("Basabasitrip Engine Ready 🚀");

/**
 * 1. NAVBAR MOBILE LOGIC
 * Mengaktifkan menu hamburger
 */
const hamburger = document.querySelector(".hamburger");
const navRight = document.querySelector(".nav-right");

// Gunakan pengecekan 'if' agar tidak error di halaman yang tidak ada navbarnya
if (hamburger && navRight) {
    hamburger.addEventListener("click", () => {
        navRight.classList.toggle("active");
        hamburger.classList.toggle("active");
        
        // Mencegah scroll body saat menu mobile terbuka (opsional)
        document.body.style.overflow = navRight.classList.contains("active") ? "hidden" : "auto";
    });

    // Menutup menu jika user mengklik salah satu link di dalamnya
    const navLinks = document.querySelectorAll(".menu li a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navRight.classList.remove("active");
            hamburger.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });
}

/**
 * 2. SCROLL REVEAL ANIMATION
 * Menggunakan Intersection Observer (lebih modern & hemat baterai daripada window.scroll)
 */
const articleCards = document.querySelectorAll(".article-card");

if (articleCards.length > 0) {
    const observerOptions = {
        threshold: 0.1, // Muncul saat 10% bagian card terlihat
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Berhenti mengamati setelah animasi jalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    articleCards.forEach(card => {
        // Set state awal via JS agar jika JS mati, konten tetap terlihat
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease-out";
        
        observer.observe(card);
    });
}

/**
 * 3. SMOOTH SCROLL UNTUK ANCHOR LINKS (#)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});