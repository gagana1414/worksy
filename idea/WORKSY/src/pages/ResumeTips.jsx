import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, PenTool, Code, Briefcase, GraduationCap, Zap, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';

const ResumeTips = () => {
  const sections = [
    {
      id: 1,
      title: 'Choose the Right Format',
      icon: <FileText size={24} className="text-purple" />,
      points: [
        'Reverse chronological format (newest first)',
        'Keep it to exactly 1 page (ideal for students)',
        'Use clean fonts (Arial, Calibri) and generous spacing'
      ]
    },
    {
      id: 2,
      title: 'Add a Strong Header',
      icon: <PenTool size={24} className="text-navy" />,
      points: [
        'Include Name, Phone, Email, and LinkedIn profile link',
        'Make your name bold and prominent at the very top',
        'Ensure your email address is professional'
      ]
    },
    {
      id: 3,
      title: 'Write a Good Summary',
      icon: <CheckCircle size={24} className="text-purple" />,
      points: [
        'Write 2–3 lines about your skills and goals',
        'Tailor it specifically to the job role you want',
        'Avoid generic buzzwords like "hardworking team player"'
      ]
    },
    {
      id: 4,
      title: 'Highlight Skills',
      icon: <Code size={24} className="text-navy" />,
      points: [
        'List Technical skills (programming languages, tools, software)',
        'List Soft skills (communication, teamwork, leadership)',
        'Group skills logically (e.g., "Languages", "Frameworks")'
      ]
    },
    {
      id: 5,
      title: 'Projects & Experience',
      icon: <Briefcase size={24} className="text-purple" />,
      points: [
        'Focus on academic or personal projects if you lack work experience',
        'Mention the specific technologies used',
        'Highlight outcomes (e.g., "Improved performance by 20%")'
      ]
    },
    {
      id: 6,
      title: 'Education',
      icon: <GraduationCap size={24} className="text-navy" />,
      points: [
        'Include Degree, College name, and expected graduation year',
        'Add your CGPA if it is strong (e.g., > 3.0 or > 7.5)',
        'Mention relevant coursework or academic achievements'
      ]
    },
    {
      id: 7,
      title: 'Keep It ATS-Friendly',
      icon: <Zap size={24} className="text-purple" />,
      points: [
        'Avoid complex visual designs, charts, or images',
        'Use standard headings (Experience, Education, Skills)',
        'Incorporate keywords from the job description'
      ]
    },
    {
      id: 8,
      title: 'Common Mistakes to Avoid',
      icon: <AlertTriangle size={24} className="text-navy" />,
      points: [
        'Spelling and grammatical errors (always proofread!)',
        'Too much dense text or long paragraphs',
        'Including irrelevant hobbies or personal information'
      ]
    }
  ];

  return (
    <div className="container page-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#635BFF', fontWeight: '500' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ color: '#0A1F44', fontSize: '2.5rem', marginBottom: '1rem' }}>How to Build a Winning Resume</h1>
        <p style={{ color: '#666', fontSize: '1.25rem' }}>Simple tips to help students stand out to employers</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {sections.map(section => (
          <div key={section.id} style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: section.icon.props.className.includes('navy') ? 'rgba(10, 31, 68, 0.1)' : 'rgba(106, 13, 173, 0.1)' }}>
                {section.icon}
              </div>
              <h3 style={{ margin: 0, color: '#0A1F44', fontSize: '1.25rem' }}>{section.id}. {section.title}</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {section.points.map((point, idx) => (
                <li key={idx} style={{ lineHeight: '1.5' }}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', background: 'white', padding: '3rem 2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
        <h2 style={{ color: '#0A1F44', marginBottom: '1rem' }}>Ready to create your resume?</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Once your resume is ready, upload it to your Worksy profile to apply for jobs.</p>
        <Link to="/profile">
          <Button variant="primary" size="lg" style={{ background: 'linear-gradient(135deg, #0A1F44 0%, #6A0DAD 100%)', border: 'none' }}>
            Go to My Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResumeTips;
