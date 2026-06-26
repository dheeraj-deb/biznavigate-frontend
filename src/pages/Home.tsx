import React, { useEffect } from 'react';
import './home.css';

const Home: React.FC = () => {
  useEffect(() => {
    const nav = document.getElementById('biz-nav') as HTMLElement | null;
    const handleScroll = () => {
      nav?.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.home-root .reveal').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div className="home-root">

      {/* NAV */}
      <header className="nav" id="biz-nav">
        <div className="wrap nav-in">
 