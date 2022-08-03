window.addEventListener('load', e => {
    const slider         = 'slider';

    const tabClass       = slider   + '__tab';
    const tabActiveClass = tabClass + '_active';

    const textSlideClass          = slider + '__text-slide';
    const pictureSlideClass       = slider + '__picture-slide';
    const textActiveSlideClass    = textSlideClass    + '_active';
    const pictureActiveSlideClass = pictureSlideClass + '_active';

    const counterClass = slider + '__counter';


    const sliders = document.querySelectorAll('.'+slider);
    sliders.forEach(s => {
        const counter       = s.querySelector('.'+counterClass);

        const tabs          = s.querySelectorAll('.'+tabClass);
        const textSlides    = s.querySelectorAll('.'+textSlideClass);
        const pictureSlides = s.querySelectorAll('.'+pictureSlideClass);

        let activeTab       = s.querySelector('.'+tabActiveClass);

        for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[i];

            tab.addEventListener('click', e => {
                setActiveTab(e.target);
                goToSlide(i);
                setCounter(i);
            });

            if (tab === activeTab) {
                goToSlide(i);
                setCounter(i);
            }
        }

        function goToSlide(index) {
            textSlides.forEach   (slide => slide.classList.remove(textActiveSlideClass));
            pictureSlides.forEach(slide => slide.classList.remove(pictureActiveSlideClass));

            textSlides[index].classList.add(textActiveSlideClass);
            pictureSlides[index].classList.add(pictureActiveSlideClass);
        }

        function setActiveTab(tab) {
            if (tab === activeTab) return;
            activeTab.classList.remove(tabActiveClass);
            activeTab = tab;
            activeTab.classList.add(tabActiveClass);
        }

        function setCounter(index) {
            counter.innerHTML = `${index+1}/${tabs.length}`;
        }
    });
});


