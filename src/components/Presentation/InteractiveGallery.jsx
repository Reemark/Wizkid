import { useState } from 'react';
import { assetUrl } from '../../utils/assetUrl';

const galleryItems = [
  { src: assetUrl('Wizkid.webp'), title: 'Performance Energy' },
  { src: assetUrl('Wizkid.webp'), title: 'Global Stage Presence' },
  { src: assetUrl('Wizkid.webp'), title: 'African Excellence' },
  { src: assetUrl('Wizkid.webp'), title: 'Fashion and Identity' },
];

export default function InteractiveGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            className="gallery-item"
            onClick={() => setSelected(item)}
          >
            <img src={item.src} alt={item.title} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div className="gallery-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={selected.src} alt={selected.title} />
            <p>{selected.title}</p>
            <button type="button" className="close-lightbox" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
