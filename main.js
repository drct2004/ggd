const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cardWidth = 345; // ширина карточки
const gap = 50; // расстояние между карточками
const visibleCards = 4; // количество видимых карточек
const totalCards = 8; // общее количество карточек

let currentPosition = 0;

prevButton.addEventListener('click', () => {
    if (currentPosition > 0) {
        currentPosition--;
    } else {
        currentPosition = totalCards - visibleCards;
    }
    updateCarouselPosition();
});

nextButton.addEventListener('click', () => {
    if (currentPosition < totalCards - visibleCards) {
        currentPosition++;
    } else {
        currentPosition = 0;
    }
    updateCarouselPosition();
});

function updateCarouselPosition() {
    const offset = (cardWidth + gap) * currentPosition;
    carousel.style.transform = `translateX(-${offset}px)`;
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("JS загружен!");

    let burger = document.querySelector(".burger");
    let menu = document.querySelector(".mobile-menu");

    if (!burger || !menu) {
        console.error("Ошибка: бургер или меню не найдены!");
        return;
    }

    console.log("Бургер найден!", burger); // Проверка

    burger.addEventListener("click", function () {
        console.log("Бургер кликнут!");
        menu.classList.toggle("active");
    });
});
