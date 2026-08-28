/*
    GIVING INTERACTIVITY TO THE SPIDERMAN BASED PORTFOLIO ! <---- 
*/

/* ------- scroll spider + navbar ------- */
const spiderTrack = document.getElementById("scrollSpiderTrack");
const spiderWeb = document.getElementById("scrollSpiderWeb");
const scrollSpider = document.getElementById("scrollSpider");
const navbar = document.getElementById("navbar");
let scrollFrame;

// function for scroll effects <---- 
function updateScrollEffects ()
{
    const scrolled = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollRatio = height > 0 ? Math.min(scrolled / height, 1) : 0;
    const spiderTravel = spiderTrack.clientHeight - scrollSpider.clientHeight;

    spiderWeb.style.transform = `scaleY(${scrollRatio})`;
    scrollSpider.style.transform = `translate3d(0, ${scrollRatio * spiderTravel}px, 0)`;
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    scrollFrame = null;
}

window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
}, { passive: true });
window.addEventListener("resize", updateScrollEffects);
updateScrollEffects;

/* Mobile Menu */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
    })
})
/* ---------- Hero: rotating role text ---------- */
const roles = [
    "SOFTWARE ENGINEER",
    "POET",
    "BADMINTON PLAYER",
    "PROBLEM SOLVER",
    "CRICKET FAN AND PLAYER",
    "FOODIE",
    "MATH LOVER",
    "ELECTRICAL ENGINEER",
    "TECH ENTHUSIAST",
];
const roleEl = document.getElementById("hero-role");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
    const current = roles[roleIndex];
    if (!deleting) {
        roleEl.innerHTML = current.slice(0, ++charIndex) + '<span class="cursor-blink">_</span>';
        if (charIndex === current.length) {
            deleting = true;
            return setTimeout(typeRole, 1600);
        }
    } else {
        roleEl.innerHTML = current.slice(0, --charIndex) + '<span class="cursor-blink">_</span>';
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeRole, deleting ? 45 : 90);
}
setTimeout(typeRole, 1600);

/* -------------- About: typing paragraph ----------- */
const aboutText = 
    "I am a tech enthusiast from Jaipur, the Pink City, who enjoys connecting with new people and learning from diverse experiences. Currently, I am a software engineer at Microsoft, driven by the desire to explore my full potential while contributing positively to society and the nation. I have completed my degree in Electrical Engineering, aiming to make meaningful contributions through technology and innovation. Beyond academics, I have a passion for poetry, badminton, and mathematics — particularly numerical reasoning and inequalities — along with a deep love for cricket and exploring new cuisines. Above all, I believe in helping others and find purpose in offering support and solutions whenever possible.";

const aboutEl = document.getElementById("typing-text");
let aboutStarted = false;

function typeAbout () {
    let i = 0;
    const speed = 18;
    (function step () {
        if (i < aboutText.length) {
            aboutEl.textContent += aboutText.charAt(i++);
            setTimeout(step, speed);
        } else {
            aboutEl.classList.add("done");
        }
    })();
}

/* ---------------- scroll reveal + triggering for typing --------------- */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                if (entry.target.id === "about" && !aboutStarted){
                    aboutStarted = true;
                    typeAbout();
                }
            }
        });
    },
    { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ---------- web-shoot ripple on click ----------  */
document.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;
    const ripple = document.createElement("span");
    ripple.className = "web-ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650)
});
