import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div style={styles.app}>

      <main style={styles.mainContent}>
        <section style={styles.aboutSection}>
          <h2 style={styles.sectionTitle}>About Us</h2>
          <p style={styles.text}>
            At EventCraft, we believe that every event is a story waiting to be told. Whether it's the elegance of a wedding, the excitement of a concert, or the professionalism of a business meeting, the right venue sets the stage for unforgettable experiences. That's why we created EventCraft—an innovative web application designed to make finding the perfect venue and managing your event as seamless and enjoyable as the event itself.
          </p>
        </section>

        <section style={styles.missionSection}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.text}>
            Our mission at EventCraft is to simplify the process of venue selection and event management, transforming your visions into reality. We strive to connect users with the best venues and provide the tools needed to plan and execute exceptional events effortlessly.
          </p>
        </section>

        <section style={styles.offerSection}>
          <h2 style={styles.sectionTitle}>What we offer</h2>
          <div style={styles.offerCardsContainer}>
            <div style={styles.offerCard}>
              <h3 style={styles.cardTitle}>Curated Venue Selection:</h3>
              <p style={styles.cardText}>
                Explore a diverse range of venues tailored to your event type. Whether it's a wedding, birthday party, corporate meeting, or concert, EventCraft offers a curated selection of spaces to suit every need and preference. Filter by location, capacity, amenities, and more to find the perfect match.
              </p>
            </div>
            <div style={styles.offerCard}>
              <h3 style={styles.cardTitle}>Booking & Management Tools:</h3>
              <p style={styles.cardText}>
                Simplify the booking process with our integrated tools. Check availability, get instant quotes, and make reservations directly through our platform. Manage all your bookings and venue interactions from a single dashboard.
              </p>
            </div>
            <div style={styles.offerCard}>
              <h3 style={styles.cardTitle}>Personalized Support:</h3>
              <p style={styles.cardText}>
                Receive dedicated support from our team of event experts. Whether you need help finding the right venue or managing event logistics, our support team is here to assist you every step of the way.
              </p>
            </div>
          </div>
        </section>
      </main>
    
    </div>
  );
};

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
    backgroundColor: '#660000',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url("/assets/images/bgg.jpg")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#660000', // Updated to match the button color
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '50px',
    marginRight: '10px' // Added margin to the right of the logo image
  },
  logoText: {
    fontSize: '1.25rem',
    color: '#fff',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    padding: '5px',
    borderRadius: '5px',
    border: 'none'
  },
  userActions: {
    display: 'flex',
    gap: '10px'
  },
  button: {
    backgroundColor: '#660000',
    border: '1px solid #660000',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  intro: {
    backgroundColor: '#660000',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    marginBottom: '20px'
  },
  mainContent: {
    flex: 1,
    padding: '2rem',
    textAlign: 'center',
  },
  aboutSection: {
    marginBottom: '2rem',
  },
  missionSection: {
    marginBottom: '2rem',
  },
  offerSection: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
    color: '#f5f5f5',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#d3d3d3',
    maxWidth: '700px',
    margin: '0 auto'
  },
  
  offerCardsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  offerCard: {
    backgroundColor: '#444',
    padding: '1rem',
    borderRadius: '8px',
    margin: '1rem',
    flexBasis: '30%',
    maxWidth: '300px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
  },
  cardTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: '#fff'
  },
  cardText: {
    fontSize: '1rem',
    color: '#ccc'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#660000' // Updated to match the header color
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none'
  },
};

export default AboutUs;

