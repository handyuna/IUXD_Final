// src/useAnimations.js
import { useEffect } from 'react';
import { gsap } from 'gsap';

export const useIntroAnimation = (posterARef, posterBRef, titleImageRef, buttonRef) => {
  useEffect(() => {
    // 초기 상태 설정 (이미지들을 숨겨둠)
    gsap.set([posterARef.current, posterBRef.current, titleImageRef.current, buttonRef.current], {
      opacity: 0,
    });
    gsap.set([titleImageRef.current, buttonRef.current], { y: 20 }); // 살짝 아래에서 위로 올라오는 효과용

    const tl = gsap.timeline();

    // 1단계: 포스터A와 타이틀 이미지가 동시에 등장
    tl.to([posterARef.current, titleImageRef.current], {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out"
    })
    // 2단계: 잠시 멈췄다가(0.5초) 포스터A가 사라지며 포스터B가 나타남 (디졸브)
    .to(posterARef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power1.inOut"
    }, "+=0.5") // 0.5초 대기 후 시작
    .to(posterBRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power1.inOut"
    }, "<") // 바로 위 애니메이션(A 사라짐)과 동시에 시작하여 디졸브 효과 생성
    
    // 3단계: 포스터B가 완전히 나온 후 버튼 등장
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)"
    });

    return () => tl.kill(); // 컴포넌트 언마운트 시 애니메이션 정지
  }, [posterARef, posterBRef, titleImageRef, buttonRef]);
};