import React, { useEffect, useRef } from 'react';
import { useIntroAnimation } from '../useAnimations'; 
import './Intro.css';

function Intro({ onStart }) {
  const posterARef = useRef(null);
  const posterBRef = useRef(null);
  const titleImageRef = useRef(null); 
  // 훅 내부에서 버튼을 참조하고 있을 경우를 대비해 빈 Ref를 하나 생성합니다.
  const dummyButtonRef = useRef(null); 

  // 기존 훅이 4개의 인자를 받으므로, 마지막에 dummyButtonRef를 추가해서 보냅니다.
  useIntroAnimation(posterARef, posterBRef, titleImageRef, dummyButtonRef);

  useEffect(() => {
    // 애니메이션이 흐르고 약 4.5초 뒤에 다음 섹션(About)으로 자동 이동합니다.
    const timer = setTimeout(() => {
      if (onStart) {
        onStart();
      }
    }, 4500); 

    return () => clearTimeout(timer); 
  }, [onStart]);

  return (
    <div className="intro-container">
      {/* 배경 이미지 A */}
      <img 
        ref={posterARef} 
        src={process.env.PUBLIC_URL + "/assets/posterA.png"} 
        className="poster-bg poster-a" 
        alt="배경 A" 
      />
      
      {/* 배경 이미지 B (확장자가 .jpg인지 .png인지 꼭 확인하세요!) */}
      <img 
        ref={posterBRef} 
        src={process.env.PUBLIC_URL + "/assets/posterB.jpg"} 
        className="poster-bg poster-b" 
        alt="배경 B" 
      />
      
      <div className="content-wrapper">
        {/* 중앙 타이틀 이미지 */}
        <img 
          ref={titleImageRef} 
          src={process.env.PUBLIC_URL + "/assets/intro_title.png"} 
          alt="당신의 단종은 누구인가요?" 
          className="intro-title-img" 
        />
      </div>

      {/* 실제 버튼은 없지만, 훅에서 에러가 나지 않도록 
        화면에 보이지 않는 빈 요소를 Ref와 연결해둡니다. 
      */}
      <div ref={dummyButtonRef} style={{ display: 'none' }} />
    </div>
  );
}

export default Intro;