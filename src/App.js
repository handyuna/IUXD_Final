import React, { useRef } from 'react';
import Intro from './pages/Intro';
import InstagramScene from './pages/InstagramScene'; 
import CatFeedingGame from './pages/CatFeedingGame';
import VideoScene from './pages/VideoScene';
import FinalSection from './pages/FinalSection';
import AutoTransitionSection from './pages/AutoTransitionSection';
import './App.css';

function App() {
  // 섹션 이동을 위한 Ref들
  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const about1Ref = useRef(null);
  const about2Ref = useRef(null); 
  const about3Ref = useRef(null); 


  const interactRef = useRef(null);
  const responseRef = useRef(null);
  const video1Ref = useRef(null);
  const response2Ref = useRef(null);
  const grumpyCatRef = useRef(null);
  const response3Ref = useRef(null);
  const video2Ref = useRef(null);
  const response4Ref = useRef(null);
  const video3Ref = useRef(null);
  const finalRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="main-scroll-container">
      {/* 01. 인트로 (자동 스크롤 적용 버전) */}
      <section ref={introRef} className="full-section">
        <Intro onStart={() => scrollTo(aboutRef)} />
      </section>

      {/* 01. 이미지 왼쪽 / 텍스트 오른쪽 섹션 */}
      <section 
        ref={aboutRef} 
        className="full-section about-section type-left"
      style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg-text.png)`,
          backgroundSize: 'cover',      /* 이미지를 화면 비율에 맞춰 꽉 채움 */
          backgroundPosition: 'center', /* 이미지의 중심을 화면 가운데에 맞춤 */
          backgroundRepeat: 'no-repeat',/* 이미지 반복 방지 */
          height: '100vh',              /* 세로 길이를 브라우저 높이에 맞춤 */
          width: '100vw'                /* 가로 길이를 브라우저 너비에 맞춤 */
        }}
      >
        <div className="about-content-wrapper">
          <div className="layout-row">
            <div className="image-side">
              <img 
                src={process.env.PUBLIC_URL + "/assets/your_animation.gif"} 
                className="content-gif" 
                alt="메인 애니메이션" 
              />
            </div>
            <div className="text-side">
              <img 
                src={process.env.PUBLIC_URL + "/assets/your_text_image11.png"} 
                className="text-image" 
                alt="설명글1" 
              />
              <button className="next-btn dark" onClick={() => scrollTo(about1Ref)}>Next</button>
            </div>
          </div>
        </div>
      </section>

      {/* 02. 글자 왼쪽 / 이미지 오른쪽 섹션 */}
      <section 
        ref={about1Ref} 
        className="full-section about-section type-right"
      style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg-text.png)`,
          backgroundSize: 'cover',      /* 이미지를 화면 비율에 맞춰 꽉 채움 */
          backgroundPosition: 'center', /* 이미지의 중심을 화면 가운데에 맞춤 */
          backgroundRepeat: 'no-repeat',/* 이미지 반복 방지 */
          height: '100vh',              /* 세로 길이를 브라우저 높이에 맞춤 */
          width: '100vw'                /* 가로 길이를 브라우저 너비에 맞춤 */
        }}
      >
        <div className="about-content-wrapper">
          <div className="layout-row">
            <div className="text-side">
              <img 
                src={process.env.PUBLIC_URL + "/assets/your_text_image12.png"} 
                className="text-image" 
                alt="설명글2" 
              />
              <button className="next-btn dark" onClick={() => scrollTo(about2Ref)}>Next</button>
            </div>
            <div className="image-side">
              <img 
                src={process.env.PUBLIC_URL + "/assets/your_animation3.gif"} 
                className="content-gif" 
                alt="메인 애니메이션" 
              />
            </div>
          </div>
        </div>
      </section>
<AutoTransitionSection 
  sectionRef={about2Ref} 
  nextSectionRef={about3Ref} // 다음 섹션은 about3Ref로 설정
  scrollTo={scrollTo}        // 함수만 전달
/>
{/* 사진만 있는 섹션 */}
<section 
  ref={about3Ref} 
  className="full-section about-only-section"
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/DM.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    position: 'relative'
  }}
>
  <div className="bottom-button-container">
    {/* white-style 클래스 추가 */}
    <button className="next-btn white-style" onClick={() => scrollTo(interactRef)}>
      Next
    </button>
  </div>
</section>

      {/* 03. 인스타그램 인터랙션 */}
      <section ref={interactRef} className="full-section bg-white border-top">

                <h1 className="white-text" style={{ position: 'absolute', top:0, width: '100%', textAlign: 'center', zIndex: 10 }}>
          화면을 클릭해 "좋아요"를 눌러보세요.
        </h1>
        <InstagramScene onComplete={() => scrollTo(responseRef)} />
      </section>

      {/* 04. 반응 이후 1 */}
<section 
  ref={responseRef} 
  className="full-section response-section" // bg-black 제거, 고유 클래스 추가
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/your_background_image.png)`, // 사용할 배경 이미지 경로
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative', // 검정 레이어 배치를 위해 필수
  }}
>
  {/* 검정 반투명 레이어 (Overlay) 추가 */}
  <div className="black-overlay"></div>

  {/* 기존 콘텐츠 (레이어보다 위에 오도록 z-index 조절 필요) */}
  <div className="scene-content" style={{ position: 'relative', zIndex: 2 }}>
    <p className="large-text">당신의 반응 이후, 한 사람의 일상이 이어집니다.</p>
    <p className="large-text strong">SNS에서 본 장면은 단순한 흥미를 넘어, 행동으로 이어지게 됩니다.</p>
    <button className="next-btn white-style" onClick={() => scrollTo(video1Ref)}>Next</button>
  </div>
</section>

      {/* 05. 영상 1 (video1.mp4) */}
      <section ref={video1Ref} className="full-section bg-white border-top">
        <VideoScene 
          videoSrc="/assets/video1.mp4" 
          onComplete={() => scrollTo(response2Ref)} 
        />
      </section>
      
      {/* 06. 반응 이후 2 */}
<section 
  ref={response2Ref} 
  className="full-section response-section" // bg-black 제거, 고유 클래스 추가
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/your_background_image2.png)`, // 사용할 배경 이미지 경로
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative', // 검정 레이어 배치를 위해 필수
  }}
>
  {/* 검정 반투명 레이어 (Overlay) 추가 */}
  <div className="black-overlay"></div>

  {/* 기존 콘텐츠 (레이어보다 위에 오도록 z-index 조절 필요) */}
  <div className="scene-content" style={{ position: 'relative', zIndex: 2 }}>
    <p className="large-text">이 날 이후, 고양이가 자꾸 눈에 밟힙니다.</p>
    <p className="large-text strong">그리고 이번에는 직접 다가가기로 합니다.</p>
    <button className="next-btn white-style" onClick={() => scrollTo(grumpyCatRef)}>Next</button>
  </div>
</section>


      {/* 07. 고양이 피딩 미니게임 */}
      <section ref={grumpyCatRef} className="full-section bg-white border-top">
        <h1 className="white-text" style={{ position: 'absolute', top: '0px', width: '100%', textAlign: 'center', zIndex: 10 }}>
          고양이에게 먹이를 주며 다가가 보세요.
        </h1>
        <CatFeedingGame onComplete={() => scrollTo(response3Ref)} />
      </section>

<section ref={response3Ref} className="full-section response-section split-layout">
  {/* 왼쪽: 이미지 영역 */}
  <div className="image-side">
    <img 
      src={process.env.PUBLIC_URL + "/assets/your_background_image3.png"} 
      alt="고양이 환경 배경" 
      className="split-image"
    />
  </div>

  {/* 오른쪽: 텍스트 및 버튼 영역 */}
  <div className="text-side">
    <div className="text-content">
      <p className="large-text">당신과 함께하는 순간에도, 고양이를 둘러싼 환경은 변하고 있습니다.</p>
      <p className="large-text strong">그리고 그 변화는 당신의 의지와는 다르게 흘러갑니다.</p>
      <button className="next-btn white-style" onClick={() => scrollTo(video2Ref)}>
        Next
      </button>
    </div>
  </div>
</section>

      {/* 09. 영상 2 (video2.mp4) */}
      <section ref={video2Ref} className="full-section bg-white border-top">
        <VideoScene 
          videoSrc="/assets/video2.mp4" 
          onComplete={() => scrollTo(response4Ref)} 
        />
      </section>

      {/* 10. 반응 이후 4 */}
<section 
  ref={response4Ref} 
  className="full-section response-section" // bg-black 제거, 고유 클래스 추가
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/your_background_image4.png)`, // 사용할 배경 이미지 경로
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative', // 검정 레이어 배치를 위해 필수
  }}
>
  {/* 검정 반투명 레이어 (Overlay) 추가 */}
  <div className="black-overlay"></div>

  {/* 기존 콘텐츠 (레이어보다 위에 오도록 z-index 조절 필요) */}
  <div className="scene-content" style={{ position: 'relative', zIndex: 2 }}>
    <p className="large-text">지켜주고 싶었던 존재를 당신은 끝까지 놓지 않습니다.</p>
    <p className="large-text strong">그 마지막은 비극이 아닌 하나의 애도입니다.</p>
    <button className="next-btn white-style" onClick={() => scrollTo(video3Ref)}>Next</button>
  </div>
</section>

      {/* 11. 영상 3 (video3.mp4) */}
      <section ref={video3Ref} className="full-section bg-white border-top">
        <VideoScene 
          videoSrc="/assets/video3.mp4" 
          onComplete={() => scrollTo(finalRef)} 
        />
      </section>

      {/* 12. 파이널 섹션 (애도 및 기록) */}
      <section ref={finalRef} className="full-section">
        <FinalSection />
      </section>
    </div>
  );
}

export default App;