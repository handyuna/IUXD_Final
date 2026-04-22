import React, { useState, useEffect } from 'react';
import styles from './AutoTransitionSection.module.css';

const AutoTransitionSection = ({ sectionRef, nextSectionRef, scrollTo }) => {
  const [showGif, setShowGif] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    // 섹션 감지 (Intersection Observer)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActivated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    if (!isActivated) return;

    // 1. 2.5초 뒤 배경 GIF를 서서히 실행 (이때 글자도 함께 사라지기 시작)
    const timer1 = setTimeout(() => {
      setShowGif(true);
    }, 2500);

    // 2. 6.0초 뒤 다음 섹션으로 자동 이동
    const timer2 = setTimeout(() => {
      if (nextSectionRef) scrollTo(nextSectionRef);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActivated, nextSectionRef, scrollTo]);

  return (
    <section ref={sectionRef} className={styles['auto-section']}>
      {/* 1. 디폴트 바탕 사진 (고정) */}
      <div 
        className={styles['bg-layer']} 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg-text2.png)`,
          zIndex: 0,
          opacity: 1 
        }} 
      />
      
      {/* 2. 디졸브로 나타날 GIF 레이어 */}
      <div 
        className={`${styles['bg-layer']} ${showGif ? styles['visible'] : ''}`} 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/your_animation4.gif)`,
          zIndex: 1 
        }} 
      />

      <div className={styles['content-wrapper']}>
        <div className={styles['layout-row']}>
          {/* 3. 글자 영역: showGif가 true가 되면 hide-text 클래스로 사라짐 */}
          <div className={`${styles['text-side']} ${showGif ? styles['hide-text'] : ''}`}>
            <img 
              src={process.env.PUBLIC_URL + "/assets/your_text_image13.png"} 
              className={styles['text-image']} 
              alt="전시 설명글" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoTransitionSection;