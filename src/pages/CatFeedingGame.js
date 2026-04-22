import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './CatFeedingGame.css';

function CatFeedingGame({ onComplete }) {
  const [feedLevel, setFeedLevel] = useState(0); 
  const [activeBowlImg, setActiveBowlImg] = useState(null); 
  const [isEating, setIsEating] = useState(false); 
  const maxLevel = 4;

  // 1. 고양이 에셋 경로에 PUBLIC_URL 적용
  const catAssets = {
    nervous: process.env.PUBLIC_URL + '/assets/cat_nervous.png',
    angry: process.env.PUBLIC_URL + '/assets/cat_angry.png',
    friendly: process.env.PUBLIC_URL + '/assets/cat_friendly.png',
    walking: process.env.PUBLIC_URL + '/assets/cat_walking.png',
    happy: process.env.PUBLIC_URL + '/assets/cat_happy.gif' 
  };

  // 2. 배경 이미지 경로에 PUBLIC_URL 적용
  const getBgImage = () => {
    if (feedLevel <= 1) return process.env.PUBLIC_URL + '/assets/time_bg_0.png';
    if (feedLevel === 2) return process.env.PUBLIC_URL + '/assets/time_bg_1.png';
    return process.env.PUBLIC_URL + '/assets/time_bg_2.png';
  };

  const getDayCount = () => {
    const days = [1, 2, 7, 20, 20];
    return days[feedLevel];
  };

  const getCatImage = () => {
    if (feedLevel === 4) return catAssets.happy;
    if (isEating) {
      if (feedLevel === 0 || feedLevel === 1) return catAssets.angry;
      if (feedLevel === 2) return catAssets.friendly;
      if (feedLevel === 3) return catAssets.walking;
    }
    return catAssets.nervous;
  };

  // 3. 사료 아이템 리스트 경로에 PUBLIC_URL 적용
  const [foodItems, setFoodItems] = useState([
    { 
      id: 'snack-1', 
      bagImg: process.env.PUBLIC_URL + '/assets/food_snack_1.png', 
      bowlImg: process.env.PUBLIC_URL + '/assets/food_bowl_1.png' 
    },
    { 
      id: 'snack-2', 
      bagImg: process.env.PUBLIC_URL + '/assets/food_snack_2.png', 
      bowlImg: process.env.PUBLIC_URL + '/assets/food_bowl_2.png' 
    },
    { 
      id: 'snack-3', 
      bagImg: process.env.PUBLIC_URL + '/assets/food_snack_3.png', 
      bowlImg: process.env.PUBLIC_URL + '/assets/food_bowl_3.png' 
    },
    { 
      id: 'snack-4', 
      bagImg: process.env.PUBLIC_URL + '/assets/food_snack_4.png', 
      bowlImg: process.env.PUBLIC_URL + '/assets/food_bowl_4.png' 
    },
  ]);

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === 'bowl-droppable' && !activeBowlImg) {
      const draggedItem = foodItems.find(item => item.id === draggableId);
      
      if (draggedItem && feedLevel < maxLevel) {
        setFoodItems(foodItems.filter(item => item.id !== draggableId));
        setActiveBowlImg(draggedItem.bowlImg);
        setIsEating(true);

        setTimeout(() => {
          setActiveBowlImg(null); 
          setIsEating(false);
          const nextLevel = feedLevel + 1;
          setFeedLevel(nextLevel);

          if (nextLevel === maxLevel) {
            setTimeout(() => onComplete(), 4000); 
          }
        }, 1500); 
      }
    }
  };

  return (
    <div 
      className={`cat-feeding-container ${feedLevel === 4 ? 'final-stage' : ''}`} 
      style={{ backgroundImage: `url(${getBgImage()})` }}
    >
      <div className="day-counter">
        <span className="day-label">DAY</span>
        <span className="day-number">{getDayCount()}</span>
      </div>

      {feedLevel === 4 ? (
        <div className="final-happy-gif-container">
          <img src={catAssets.happy} alt="happy-cat" className="final-gif" />
        </div>
      ) : (
        <div className="cat-character-layer">
          <img src={getCatImage()} alt="cat" className="cat-sprite" />
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        {feedLevel < maxLevel && (
          <div className="game-screen">
            <Droppable droppableId="bowl-droppable">
              {(provided, snapshot) => (
                <div 
                  className={`drop-zone ${snapshot.isDraggingOver ? 'active' : ''}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {activeBowlImg && (
                    <img src={activeBowlImg} className="placed-bowl-snack" alt="bowl" />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="inventory" direction="horizontal">
              {(provided) => (
                <div className="inventory-bar" ref={provided.innerRef} {...provided.droppableProps}>
                  {foodItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div 
                          className="food-card" 
                          ref={provided.innerRef} 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps}
                        >
                          <img src={item.bagImg} alt="snack-bag" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </DragDropContext>
    </div>
  );
}

export default CatFeedingGame;