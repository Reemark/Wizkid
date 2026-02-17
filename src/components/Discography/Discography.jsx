import { useState } from 'react';
import { albums, singles, collaborations } from '../../data/discography';
import AlbumCard from './AlbumCard';
import './Discography.css';

export default function Discography() {
  const [activeTab, setActiveTab] = useState('albums');
  const [sortBy, setSortBy] = useState('year-desc');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'albums':
        return albums;
      case 'singles':
        return singles;
      case 'collaborations':
        return collaborations;
      default:
        return albums;
    }
  };

  const sortedData = [...getCurrentData()].sort((a, b) => {
    if (sortBy === 'year-desc') return b.year - a.year;
    if (sortBy === 'year-asc') return a.year - b.year;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <section className="discography-section">
      <div className="discography-header glass-card-premium">
        <h2 className="discography-title">Discographie</h2>
        <p className="discography-subtitle">L'évolution musicale de Wizkid</p>

        <div className="discography-tabs">
          <button
            className={`tab-btn glass-button ${activeTab === 'albums' ? 'active' : ''}`}
            onClick={() => setActiveTab('albums')}
          >
            📀 Albums ({albums.length})
          </button>
          <button
            className={`tab-btn glass-button ${activeTab === 'singles' ? 'active' : ''}`}
            onClick={() => setActiveTab('singles')}
          >
            🎵 Singles ({singles.length})
          </button>
          <button
            className={`tab-btn glass-button ${activeTab === 'collaborations' ? 'active' : ''}`}
            onClick={() => setActiveTab('collaborations')}
          >
            🤝 Collaborations ({collaborations.length})
          </button>
        </div>

        <div className="sort-container">
          <label htmlFor="sort-select" className="sort-label">
            Trier par:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select glass-card"
          >
            <option value="year-desc">Plus récent</option>
            <option value="year-asc">Plus ancien</option>
            <option value="title">Titre (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="discography-grid">
        {sortedData.map((item, index) => (
          <AlbumCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
