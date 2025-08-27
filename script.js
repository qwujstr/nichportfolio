const galleryData = {
    uiux: [
        "img/TableJoJoLikeEmpty.png",
        "img/TableBookEmpty.png",
        "img/TableValentinesEmpty.png",
    ],
    pixelart: [
        "img/PixelSkeleton.gif",
        "img/PixelHorse.gif",
        "img/PixelSP.gif",
        "img/PixelClaw.gif",
        "img/PixelScythe.gif",
    ],
    productdesign: [
        "img/SpritePosterGreen.png",
        "img/WineRed.png",
    ],
    logo: [
        "img/LogoHypra.png",
        "img/LogoClover.png",
        "img/LogoSFLike.png",
        "img/vexsto.png",
        "img/MarlikkoWbg.png",
        "img/Kratos.png",
        "img/dotdot.png",
    ],
    conceptart: [
        "img/ForestBackgroundEmpty.png",
    ],
    threed: [
        "img/ringmasterrender.png",
        "img/qwurender.png",
    ],
    featuredworks: [
        "img/TableJoJoLikeEmpty.png",
        "img/LogoHypra.png",
        "img/LogoClover.png",
        "img/LogoSFLike.png",
        "img/ForestBackgroundEmpty.png",
    ],
};

let currentCategory = "";
let currentImageIndex = 0;

const galleryOverlay = document.getElementById("galleryOverlay");
const galleryPopup   = document.getElementById("galleryPopup");
const galleryImage   = document.getElementById("galleryImage");
const closeBtn       = document.getElementById("closeBtn");
const prevBtn        = document.getElementById("prevBtn");
const nextBtn        = document.getElementById("nextBtn");

// Select both portfolio and center buttons
const galleryBtns = document.querySelectorAll(".portfolio-btn, .center-btn");

galleryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        currentImageIndex = 0;
        openGallery();
    });
});

closeBtn.addEventListener("click", closeGallery);

galleryOverlay.addEventListener("click", (e) => {
    if (e.target === galleryOverlay) {
        closeGallery();
    }
});

prevBtn.addEventListener("click", () => navigateGallery(-1));
nextBtn.addEventListener("click", () => navigateGallery(1));

document.addEventListener("keydown", (e) => {
    if (galleryOverlay.style.display === "flex") {
        switch (e.key) {
            case "Escape":    closeGallery();       break;
            case "ArrowLeft": navigateGallery(-1);  break;
            case "ArrowRight":navigateGallery(1);   break;
        }
    }
});

const customCursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
    customCursor.style.top = e.clientY + "px";
    customCursor.style.left = e.clientX + "px";
});

// Enlarge cursor on hover over interactive elements
document.querySelectorAll(".center-images .small, .portfolio-btn, .center-btn").forEach(el => {
    el.addEventListener("mouseenter", () => customCursor.classList.add("active"));
    el.addEventListener("mouseleave", () => customCursor.classList.remove("active"));
});

document.querySelectorAll(".center-images .small").forEach(img => {
    let moveX = 0, moveY = 0;

    img.addEventListener("mousemove", (e) => {
        const rect = img.getBoundingClientRect();
        moveX = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // max tilt
        moveY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        img.style.transform = `scale(1.05) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });

    img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
    });

    // Open gallery when clicked, based on data-category attribute
    img.addEventListener("click", () => {
        currentCategory = img.dataset.category;
        currentImageIndex = 0;
        openGallery();
    });
});

function openGallery() {
    galleryOverlay.style.display = "flex";

    setTimeout(() => {
        galleryPopup.classList.add("active");
    }, 10);

    updateGalleryImage();
}

function closeGallery() {
    galleryPopup.classList.remove("active");

    setTimeout(() => {
        galleryOverlay.style.display = "none";
    }, 300);
}

function navigateGallery(direction) {
    const images = galleryData[currentCategory];
    if (!images) return;

    galleryImage.classList.add("fade");

    setTimeout(() => {
        currentImageIndex += direction;

        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }

        updateGalleryImage();

        setTimeout(() => {
            galleryImage.classList.remove("fade");
        }, 50);
    }, 150);
}

function updateGalleryImage() {
    const images = galleryData[currentCategory];
    if (images && images[currentImageIndex]) {
        galleryImage.src = images[currentImageIndex];
    }
}
