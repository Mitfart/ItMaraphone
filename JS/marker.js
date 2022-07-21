window.onload = function(){
    const menuMarkerSelector = '#manu__marker';
    const itemClass          = 'menu__item';
    const activeItemClass    = 'menu__item_active';

    const marker   = document.querySelector(menuMarkerSelector);
    const items    = document.querySelectorAll('.' + itemClass);
    let activeItem = document.querySelector('.' + activeItemClass);


    let hoveredItem = activeItem;
    let setHoverTO = null;
    let setHoverToActiveTO = null;

    const markerTransitionTime = window
        .getComputedStyle(marker).transitionDuration
        .replace('s', '') * 1000;


    function setIndicator(item) {
        const pos      = Math.min(item.offsetLeft, hoveredItem.offsetLeft);
        const deltaPos = Math.max(item.offsetLeft, hoveredItem.offsetLeft) - pos;
        const width    = item.offsetWidth + deltaPos;

        marker.style.left  = pos   + 'px';
        marker.style.width = width + 'px';
    }

    function setActiveItem(item) {
        activeItem.classList.remove(activeItemClass);
        item.classList.add(activeItemClass);
        activeItem = item;

        setIndicator();
    }

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

    setIndicator(activeItem);
}