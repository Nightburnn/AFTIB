import React, { useState, useEffect } from 'react';
import './Faq.css';

const FaqSection = ({ searchTerm, faqData, sectionTitle }) => {
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  useEffect(() => {
    if (faqData.length > 0) {
      let filteredItems = faqData;

      if (searchTerm) {
        filteredItems = faqData.filter(item =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredFaqs(filteredItems);
    }
  }, [searchTerm, faqData]);

  if (!faqData || faqData.length === 0) {
    return <div>No FAQs available</div>;
  }

  return (
    <div className="container faq mt-3 mb-4">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2 className="text-center faq-title">{sectionTitle}</h2>
          <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt dolorum natus explicabo</p>
          <div className="accordion" id="faqAccordion">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, idx) => (
                <div key={idx} className="accordion-item">
                  <h2 className="accordion-header" id={`heading${idx}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${idx}`}
                      aria-expanded="false"
                      aria-controls={`collapse${idx}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${idx}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${idx}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
