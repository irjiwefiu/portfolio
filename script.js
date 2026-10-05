const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const cursor = $("#cursor");

if (cursor && matchMedia("(pointer:fine)").matches) {
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let cx = x;
    let cy = y;

    addEventListener("mousemove", (e) => {
        x = e.clientX;
        y = e.clientY;
    });

    const renderCursor = () => {
        cx += (x - cx) * 0.16;
        cy += (y - cy) * 0.16;

        cursor.style.left = `${cx}px`;
        cursor.style.top = `${cy}px`;

        requestAnimationFrame(renderCursor);
    };

    renderCursor();

    $$(
        "a, button, .project-card, .stack-card, .glass-chip"
    ).forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
        });

        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
        });
    });
}


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar = $(".navbar");

if (navbar) {
    addEventListener(
        "scroll",
        () => {
            navbar.classList.toggle("scrolled", scrollY > 20);
        },
        { passive: true }
    );
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuButton = $("#menuButton");
const mobileNav = $("#mobileNav");

if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
        mobileNav.classList.toggle("open");
        menuButton.classList.toggle("open");
    });

    $$(".mobile-nav-link", mobileNav).forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            menuButton.classList.remove("open");
        });
    });
}


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealElements = $$(
    ".reveal, .section-heading, .project-card, .stack-card, .experience-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* =========================================================
   MAGNETIC BUTTON EFFECT
   ========================================================= */

$$(".magnetic").forEach((button) => {
    button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "";
    });
});


/* =========================================================
   PROJECT LINKS
   ========================================================= */

const projectLinks = {
    langchain:
        "https://langchain-multi-agent-research-systemstre.onrender.com/",

    rag:
        "https://production-rag-5v7j.onrender.com/"
};

$$("[data-project-link]").forEach((link) => {
    const key = link.dataset.projectLink;

    if (projectLinks[key]) {
        link.href = projectLinks[key];
        link.hidden = false;

        const note = document.querySelector(
            `[data-link-note="${key}"]`
        );

        if (note) {
            note.hidden = true;
        }
    }
});


/* =========================================================
   HERO PARALLAX
   ========================================================= */

const heroOrb = $(".hero-orb");

if (heroOrb && matchMedia("(pointer:fine)").matches) {
    addEventListener(
        "mousemove",
        (event) => {
            const x =
                (event.clientX / innerWidth - 0.5) * 2;

            const y =
                (event.clientY / innerHeight - 0.5) * 2;

            heroOrb.style.transform =
                `translate(${x * 12}px, ${y * 12}px)`;
        },
        { passive: true }
    );
}


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
   ========================================================= */

$$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const yearElement = $("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   CONSOLE SIGNATURE
   ========================================================= */

console.log(
    "%cMuhammad Hasnain — AI/ML Engineer",
    "font-size:16px;font-weight:700;"
);

console.log(
    "%cBuilding intelligent systems that think.",
    "font-size:13px;"
);