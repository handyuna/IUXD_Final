// src/pages/VideoScene.js
import React, { useEffect, useRef } from 'react';

function VideoScene({ videoSrc, onComplete }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // 1. muted를 false로 설정 (소리 켜기)
      videoRef.current.muted = false;
      
      // 2. 재생 시도
      videoRef.current.play().catch(error => {
        console.log("자동 재생이 차단되었습니다. 사용자의 클릭이 필요합니다.", error);
      });
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>
      <video 
        ref={videoRef}
        autoPlay 
        controls 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onEnded={onComplete}
      >
        <source src={process.env.PUBLIC_URL + videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoScene;