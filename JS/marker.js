window.addEventListener('load', e => {
    const menuClass       = 'menu';
    const markerClass     = menuClass + '__marker';
    const itemClass       = menuClass + '__item';
    const activeItemClass = menuClass + '__item_active';


    document.querySelectorAll('.'+menuClass).forEach(menu => {
        const marker = menu.querySelector('.'+markerClass);
        if (marker == null) return;

        const items    = menu.querySelectorAll('.'+itemClass);
        let activeItem = menu.querySelector('.'+activeItemClass);

        let hoveredItem = activeItem;
        let setHoverTO = null;
        let setHoverToActiveTO = null;

        const time = parseFloat(window.getComputedStyle(marker).transitionDuration);
        const markerTransitionTime = time > 10 ? time : time * 1000;


        setStartIndicator(activeItem);
        window.addEventListener("resize", () => {
            setStartIndicator(activeItem);
        });


        items.forEach(item => {
            item.addEventListener('click', e => {
                setActiveItem(e.target)
            });
            item.addEventListener('mouseover', e => {
                clearTimeout(setHoverToActiveTO);
                setIndicator(e.target);

                setHoverTO = setTimeout(() => {
                    hoveredItem = e.target;
                    setIndicator(e.target);
                }, markerTransitionTime)
            });
            item.addEventListener("mouseout", e => {
                clearTimeout(setHoverTO);

                setHoverToActiveTO = setTimeout(() => {
                    hoveredItem = activeItem;
                    setIndicator(activeItem);
                }, markerTransitionTime)
            });
        });

        function setStartIndicator(item) {
            marker.style.transitionDuration = '0s';
            setIndicator(item);
            setTimeout(()=> {
                marker.style.transitionDuration = markerTransitionTime + 'ms';
            }, markerTransitionTime);
        }


        function setActiveItem(item) {
            activeItem.classList.remove(activeItemClass);
            item.classList.add(activeItemClass);
            activeItem = item;

            setIndicator();
        }

        function setIndicator(item) {
            const pos      = Math.min(item.offsetLeft, hoveredItem.offsetLeft);
            const deltaPos = Math.max(item.offsetLeft, hoveredItem.offsetLeft) - pos;
            const width    = item.offsetWidth + deltaPos;

            marker.style.left  = pos   + 'px';
            marker.style.width = width + 'px';
        }
    });
});