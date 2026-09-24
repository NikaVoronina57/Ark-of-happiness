import React, { useEffect, useRef } from 'react';
import './ScrollableCardList.css';

function ScrollableCardList({ items, CardComponent }) {
  const wrapperRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!wrapper || !prevBtn || !nextBtn) return;

    const STEP = 240; // подбери под ширину карточки

    const updateButtons = () => {
      const canScrollLeft = wrapper.scrollLeft > 0;
      const canScrollRight =
        wrapper.scrollLeft + wrapper.clientWidth < wrapper.scrollWidth - 1;

      prevBtn.style.visibility = canScrollLeft ? 'visible' : 'hidden';
      nextBtn.style.visibility = canScrollRight ? 'visible' : 'hidden';
    };

    const handlePrev = () => {
      wrapper.scrollBy({ left: -STEP, behavior: 'smooth' });
    };

    const handleNext = () => {
      wrapper.scrollBy({ left: STEP, behavior: 'smooth' });
    };

    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);
    wrapper.addEventListener('scroll', updateButtons);

    updateButtons();

    return () => {
      prevBtn.removeEventListener('click', handlePrev);
      nextBtn.removeEventListener('click', handleNext);
      wrapper.removeEventListener('scroll', updateButtons);
    };
  }, []);

  return (
    <div className="scroll-list-container">
      <button
        ref={prevBtnRef}
        type="button"
        className="scroll-btn scroll-btn-prev"
        aria-label="Назад"
      >
        <span className="scroll-btn-icon">←</span>
      </button>

      <div className="scroll-wrapper" ref={wrapperRef}>
        {items.map((item) => (
          <div key={item.id} className="card-item">
            <CardComponent {...item} />
          </div>
        ))}
      </div>

      <button
        ref={nextBtnRef}
        type="button"
        className="scroll-btn scroll-btn-next"
        aria-label="Вперёд"
      >
        <span className="scroll-btn-icon">→</span>
      </button>
    </div>
  );
}

export default ScrollableCardList;
