import React, { useState, useEffect } from 'react';
import './lastNews.scss';

const newsData = [
  {
    title: 'New AI Breakthrough Announced',
    description:
      'Scientists have unveiled a groundbreaking AI model that promises to revolutionize data processing.',
    date: '2025-05-05',
    image: 'https://via.placeholder.com/1200x600?text=News+1',
  },
  {
    title: 'Global Tech Summit 2025',
    description:
      'The annual tech summit will feature discussions on the future of quantum computing and AI.',
    date: '2025-05-04',
    image: 'https://via.placeholder.com/1200x600?text=News+2',
  },
  {
    title: 'Sustainable Energy Innovations',
    description:
      'New advancements in solar energy could lead to more affordable and efficient solutions.',
    date: '2025-05-03',
    image: 'https://via.placeholder.com/1200x600?text=News+3',
  },
];

const LastNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  return (
    <div className="last-news-container">
      <div className="news-carousel">
        <div
          className="news-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {newsData.map((item, index) => (
            <div key={index} className="news-item">
              <img src={item.image} alt={item.title} className="news-image" />
              <div className="news-overlay">
                <div className="news-content">
                  <h2 className="news-title">{item.title}</h2>
                  <p className="news-description">{item.description}</p>
                  <span className="news-date">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-button prev" onClick={handlePrev}>
          ←
        </button>
        <button className="carousel-button next" onClick={handleNext}>
          →
        </button>
        <div className="carousel-indicators">
          {newsData.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LastNews;
