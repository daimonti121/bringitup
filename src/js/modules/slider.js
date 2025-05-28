export default class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
        this.adBlock = document.querySelector('.hanson');
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = 'none';
            this.slides[i].classList.remove('animated', 'fadeIn');
        }

        this.slides[this.slideIndex - 1].style.display = 'block';
        this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');

        if(this.slideIndex === 3) {
            setTimeout(() => this.showAdd(this.adBlock), 3000);
        } else {
            this.adBlock.style.display = 'none';
            this.adBlock.classList.add('animated', 'fadeInUp');
        }
    }

    showAdd(ad) {
        ad.style.display = 'block';
    }


    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });


            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex = 1);
            });
        });

        this.showSlides(this.slideIndex);
    }
}