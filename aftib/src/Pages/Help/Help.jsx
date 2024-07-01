import React, { useState, useEffect } from "react";
import "./Help.css";
import help1 from "../../assets/images/help1.png";
import help2 from "../../assets/images/help2.png";
import help3 from "../../assets/images/help3.png";
import { Link } from "react-router-dom";
import FaqSection from "./FaqSection";

const Help = ({ faqData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [showFaqSection, setShowFaqSection] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");

  useEffect(() => {
    if (searchTerm && faqData) {
      const suggestions = [];
      const results = [];

      faqData.forEach((section) => {
        section.faqs.forEach((faq) => {
          if (faq.question.toLowerCase().includes(searchTerm.toLowerCase())) {
            suggestions.push(faq.question);
            results.push(faq);
          }
        });
      });

      setAutocompleteSuggestions(suggestions.slice(0, 5));
      setFilteredFaqs(results);
      setShowFaqSection(true);
    } else {
      setAutocompleteSuggestions([]);
      setFilteredFaqs([]);
      setShowFaqSection(false);
    }
  }, [searchTerm, faqData]);

  const handleSearch = (event) => {
    event.preventDefault();
    setShowFaqSection(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setAutocompleteSuggestions([]);
    setShowFaqSection(true);
  };

  const handleLinkClick = (sectionIndex) => {
    setFilteredFaqs(faqData[sectionIndex].faqs);
    setSectionTitle(faqData[sectionIndex].title);
    setShowFaqSection(true);
  };

  const helpItems = [
    {
      title: "Getting started",
      description: "Get your account set up in just 5 simple steps",
      image: help1,
    },
    {
      title: "Account Management",
      description: "Manage your Account",
      image: help2,
    },
    {
      title: "Reporting",
      description: "Reporting issues",
      image: help3,
    },
  ];

  return (
    <main>
      <section className="hero-bg">
        <div className="hero">
          <div className="container">
            <div className="row">
              <div className="hero-title">
                <h2>Hi! How can we help?</h2>
                <div className="form-container">
                  <form onSubmit={handleSearch}>
                    <div className="form-item">
                      <label htmlFor="search-input" className="visually-hidden">
                        Search
                      </label>
                      <input
                        type="text"
                        id="search-input"
                        placeholder="How can we help?"
                        className="me-5"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button type="submit" className="custom-btn">
                        Search
                      </button>
                    </div>
                    {autocompleteSuggestions.length > 0 && (
                      <ul className="autocomplete-suggestions">
                        {autocompleteSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showFaqSection && filteredFaqs.length > 0 ? (
        <FaqSection
          searchTerm={searchTerm}
          faqData={filteredFaqs}
          sectionTitle={sectionTitle}
        />
      ) : (
        <section className="help mt-5">
          <div className="container">
            <div className="row">
              {helpItems.map((item, index) => (
                <div className="col-lg-4" key={index}>
                  <div className="demo-item">
                    <img src={item.image} alt="help" className="resize" />
                    <div className="topics">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <Link to="#" onClick={() => handleLinkClick(index)}>
                        {faqData[index].faqs.length} articles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Help;
