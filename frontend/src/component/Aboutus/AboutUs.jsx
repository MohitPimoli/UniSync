import React from 'react';
import Draggable from 'react-draggable';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <section style={styles.infoSection}>
        <p style={styles.text}>
          <strong>We are Unisync</strong>
        </p>
      </section>
      <section style={styles.teamSection}>
        <h2 style={styles.subtitle}>Our Team</h2>
        <div style={styles.teamCards}>
          {teamMembers.map(member => (
            <Draggable key={member.name}>
              <div style={styles.card}>
                <img src={member.photo} alt={member.name} style={styles.photo} />
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{member.name}</h3>
                </div>
                <p style={styles.cardRole}>{member.role}</p>
                <p style={styles.cardDescription}>{member.description}</p>
              </div>
            </Draggable>
          ))}
        </div>
      </section>
    </div>
  );
};

// Example team members with local image paths
const teamMembers = [
  { name: 'Nikhil Singh Bisht', role: 'Lead Developer', description: 'Expert in backend technologies with a passion for solving complex problems.', photo: '/images/nikhil.jpg' },
  { name: 'Hardik Pant', role: 'Backend Developer', description: 'Specializes in building scalable backend systems and ensuring smooth integrations.', photo: '/images/hardik.jpg' },
  { name: 'Mohit Pimoli', role: 'Frontend Developer', description: 'Focused on creating intuitive and user-friendly interfaces for a seamless user experience.', photo: '/images/mohit.jpg' },
  { name: 'Yash Garg', role: 'UI/UX Designer', description: 'Dedicated to designing visually appealing and functional user interfaces with a strong focus on user experience.', photo: '/images/yash.jpg' }
];

const styles = {
  container: {
    padding: '40px',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#ffebee', // Light red color
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '3rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#34495e',
    marginBottom: '20px',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  text: {
    color: '#7f8c8d',
    fontSize: '18px',
    lineHeight: '1.8',
    marginBottom: '30px',
    textAlign: 'center',
  },
  teamSection: {
    marginTop: '20px',
  },
  teamCards: {
    display: 'flex',
    flexDirection: 'row', // Ensure cards are in a single row
    gap: '20px',
    justifyContent: 'space-between', // Evenly space cards in the row
    padding: '10px',
    overflowX: 'auto', // Allow horizontal scrolling if needed
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    width: '220px', // Adjusted width
    height: '350px', // Adjusted height
    textAlign: 'center',
    padding: '20px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'move',
    border: '1px solid #ddd',
    position: 'relative',
    flexShrink: 0, // Prevent cards from shrinking
  },
  photo: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: '4px solid #3498db',
  },
  cardHeader: {
    backgroundColor: '#3498db',
    color: '#ffffff',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  cardRole: {
    color: '#34495e',
    marginBottom: '15px',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#7f8c8d',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default AboutUs;
