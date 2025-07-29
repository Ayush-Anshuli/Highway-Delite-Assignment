import React from 'react'
import { logo } from '../../icons'

const Dashboard = () => {
  // Inline styles
  const styles = {
    dashboard: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e5e5e5',
      backgroundColor: '#ffffff'
    },
    icon: {
      color: '#3b82f6',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1f2937',
      margin: 0
    },
    signOut: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '0.9rem'
    },
    mainContent: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    },
    welcomeBox: {
      backgroundColor: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    welcomeText: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1f2937',
      margin: '0 0 0.5rem 0'
    },
    emailText: {
      fontSize: '1rem',
      color: '#6b7280',
      margin: 0
    },
    createNoteBtn: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
      marginBottom: '2rem'
    },
    notesSection: {
      marginTop: '1rem'
    },
    notesTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1f2937',
      margin: '0 0 1rem 0'
    }
  }

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <div style={styles.icon}><img src={logo} height={30}/></div>
        </div>
        <div>
          <h1 style={styles.headerTitle}>Dashboard</h1>
        </div>
        <div>
          <a href="#" style={styles.signOut}>Sign Out</a>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Welcome Box */}
        <div style={styles.welcomeBox}>
          <h2 style={styles.welcomeText}>Welcome, wer!</h2>
          <p style={styles.emailText}>Email: ayushanshuli89@gmail.com</p>
        </div>

        {/* Create Note Button */}
        <button style={styles.createNoteBtn}>Create Note</button>

        {/* Notes Section */}
        <div style={styles.notesSection}>
          <h3 style={styles.notesTitle}>Notes</h3>
          {/* Notes will be displayed here */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
