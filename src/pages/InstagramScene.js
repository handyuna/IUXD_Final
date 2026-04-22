import React, { useState, useMemo } from 'react';
import './InstagramScene.css';

function InstagramScene({ onComplete }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  // 1. 메가 파티클 데이터 생성
  const particles = useMemo(() => 
    Array.from({ length: 200 }).map((_, i) => ({
      tx: (Math.random() - 0.5) * 1000 + "px", 
      ty: (Math.random() - 0.5) * 1000 + "px",
      size: Math.random() * 6 + 2 + "px",       
      duration: Math.random() * 2 + 1.0 + "s",  
      delay: Math.random() * 0.3 + "s",         
      color: [
        '#FF5E5E', '#FFD700', '#FF1493', '#00FF7F', '#FF69B4', '#FFFFFF',
        '#7efff5', '#3ae374', '#fff200', '#ff9f1a', '#fff', '#ff3838'
      ][i % 12]
    })), []
  );

  const handleLikeClick = () => {
    if (!isLiked) {
      setIsLiked(true);
      setShowFireworks(true);
      
      // 폭죽이 터지고 나서 약 1.5초 뒤에 자동으로 다음 섹션으로 스크롤
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);

      // 폭죽 애니메이션 레이어 제거
      setTimeout(() => {
        setShowFireworks(false);
      }, 4000);
    }
  };

  return (
    <div className="instagram-interaction-container">
      {/* 배경: PUBLIC_URL 적용 */}
      <img 
        src={process.env.PUBLIC_URL + "/assets/background.png"} 
        alt="배경" 
        className="interaction-bg" 
      />

      {/* 2층: 메가 폭죽 레이어 */}
      {showFireworks && (
        <div className="fireworks-layer">
          {particles.map((p, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{ 
                '--tx': p.tx, 
                '--ty': p.ty,
                '--duration': p.duration,
                '--delay': p.delay,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 15px ${p.color}, 0 0 5px white` 
              }} 
            />
          ))}
        </div>
      )}

      {/* 3층: 핸드폰 사진 레이어 (PUBLIC_URL 적용) */}
      <div className="instagram-overlay" onClick={handleLikeClick}>
        <img 
          src={
            isLiked 
              ? process.env.PUBLIC_URL + "/assets/insta_after.png" 
              : process.env.PUBLIC_URL + "/assets/insta_before.png"
          } 
          alt="인스타 콘텐츠" 
          className="insta-content-img"
        />
      </div>
    </div>
  );
}

export default InstagramScene;