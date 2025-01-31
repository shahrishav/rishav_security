import React, { useState } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
  };

  const venues = [
    {
      id: 1,
      name: "The Dwarika's Hotel",
      description: "Dwarika's Hotel's elegant courtyards, buildings, and rooms aim to revive the stunning Newari architecture, capturing the beauty and spirit of ancient Kathmandu.",
      image:
        "../../assets/images/dwarika.jpg",
    },
    {
      id: 2,
      name: "Heritage Garden",
      description: "Heritage Garden is a conventional hall with different services flexible for any kind of event. We provide our hall as well as catering services.",
      image:
        "../../assets/images/heritage.jpg",
    },
    {
      id: 3,
      name: "Kathmandu Marriott Hotel",
      description: "Enjoy modern design, five-star service, and deluxe amenities when you book our spacious, well-appointed hotel rooms or suites with free Wi-Fi. Many rooms offer views of the Himalayan Mountains.",
      image:
        "../../assets/images/pic.jpeg",
    },
    {
      id: 4,
      name: "Hyatt Regency Kathmandu",
      description: "Immerse yourself in the world of Hyatt, where you can embrace the transformative power of travel and experience once-in-a-lifetime moments. ",
      image:
        "../../assets/images/hyatt.jpg",
    },
  ];

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="title">
            Make Your Event Unforgettable 
            </h1>
            <p className="subtitle">
            We provide top-notch event management 
            services to make your special day perfect.
            </p>
          </div>
          <div className="hero-image">
            <img
              src="../../assets/images/b1.jpeg"
              alt="Latest gadgets"
            />
          </div>
        </div>
      </section>

      <section className="featured-venues" id="venues">
        <div className="container">
          <h2 className="title">Featured Venues</h2>
          <p className="subtitle">
          Discover our latest and most sought-after venues that are transforming the event landscape.
          </p>
          <div className="venues">
            {venues.map((venue) => (
              <div key={venue.id} className="venue-item">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="venue-image"
                />
                <div className="venue-info">
                  <h3 className="venue-title">{venue.name}</h3>
                  <p className="venue-description">{venue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="title">Our Services</h2>
          <p className="subtitle">
            We offer more than just venues. Experience the difference with our
            unique features and services.
          </p>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🤵🏼‍♂️👰🏼‍♀️</div>
              <h3 className="feature-title">Wedding</h3>
              <p className="feature-description">
              We take care of every detail to make your wedding day perfect.
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎂</div>
              <h3 className="feature-title">Birthday</h3>
              <p className="feature-description">
              Expert event management tailored for your unforgettable birthday celebrations.
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👩🏼‍💻</div>
              <h3 className="feature-title">Meetings</h3>
              <p className="feature-description">
              Professional event management crafted for your successful business meetings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial">
        <div className="container">
          <h2 className="title">What Our Clients Say</h2>
          <div className="testimonial-content">
            <p className="testimonial-text">
              "The best event management service we've ever used. Our wedding was perfect!"
            </p>
            <p className="testimonial-author">- John and Jane</p>
          </div>

          <div className="testimonial-content">
            <p className="testimonial-text">
              "Professional and attentive. Our corporate event was a great success."
            </p>
            <p className="testimonial-author">- ACME Corp.</p>
          </div>

          <div className="testimonial-content">
            <p className="testimonial-text">
              "Amazing service! Our party was a blast thanks to your team."
            </p>
            <p className="testimonial-author">- The Smiths</p>
          </div>
       
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Get In Touch</h2>
          <p className="cta-description">
          Join countless happy clients and let us bring your event 
          vision to life with our expert management services.
          </p>
          <a href="#venues" className="btn btn-secondary">
            Shop Now
          </a>
        </div>
      </section>

      {videoModalOpen && (
        <div className="video-modal">
          <div className="video-modal-content">
            <button className="close-modal" onClick={closeVideoModal}>
              &times;
            </button>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Venue Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
