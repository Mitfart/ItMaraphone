window.addEventListener('load', e => {
    const mainClass         = 'main';

    const tabClass          = mainClass + '__tab';
    const tabActiveClass    = tabClass  + '_active';

    const textSlideClass          = mainClass + '__text-slide';
    const pictureSlideClass       = mainClass + '__picture-slide';
    const textActiveSlideClass    = textSlideClass    + '_active';
    const pictureActiveSlideClass = pictureSlideClass + '_active';

    const counterClass      = mainClass + '__counter';


    const mains = document.querySelectorAll('.'+mainClass);
    mains.forEach(main => {
        const counter       = main.querySelector('.'+counterClass);

        const tabs          = main.querySelectorAll('.'+tabClass);
        const textSlides    = main.querySelectorAll('.'+textSlideClass);
        const pictureSlides = main.querySelectorAll('.'+pictureSlideClass);

        let activeTab          = main.querySelector('.'+tabActiveClass);

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


