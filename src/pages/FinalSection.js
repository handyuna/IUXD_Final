import React, { useState } from 'react';
import './FinalSection.css';

function FinalSection() {
  const [text, setText] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!agreed) {
      alert("활용 동의에 체크해주세요.");
      return;
    }
    // 실제 데이터 전송 로직 (예: Firebase, EmailJS 등)이 들어갈 자리입니다.
    alert("소중한 의견이 전달되었습니다.");
    setText("");
    setAgreed(false);
  };

  return (
    <section className="final-section-container bg-black">
      <div className="final-content-wrapper">
        {/* 상단 타이틀 이미지: PUBLIC_URL 적용 */}
        <img 
          src={process.env.PUBLIC_URL + "/assets/final_title.png"} 
          alt="당신의 단종을 적어주세요" 
          className="final-title-img"
        />

        <div className="input-group">
          <div className="input-header">
            <span>모든걸 바쳐 지켜주고 싶은/싶었던 대상이 있나요?</span>
            <span className="plus-icon">+</span>
          </div>
          
          <textarea 
            className="final-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="여기에 내용을 입력하세요..."
          />
        </div>

        <div className="agreement-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="checkmark"></span>
            이 내용을 사이트에서 활용하는 것에 동의합니다.
          </label>
        </div>

        <div className="submit-group">
          <button className="submit-btn" onClick={handleSubmit}>
            보내기
          </button>
        </div>
      </div>
    </section>
  );
}

export default FinalSection;