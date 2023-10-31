import React, { useState } from 'react';

function AIDefinition() {
  const [section, setSection] = useState(0);

  const sections = [
    {
      title: "Introduction to Artificial Intelligence",
      content: (
        <div>
          <p className="text-gray-700 text-lg">
            Welcome to the world of Artificial Intelligence (AI). In this introductory section, we'll outline the learning goals and provide a comprehensive explanation of what AI is and what you can expect to learn.
          </p>
          {/* Learning goals here */}
        </div>
      ),
    },
    {
      title: "Learning Goals",
      content: (
        <ul className="list-disc ml-8 text-gray-700 text-lg">
          <li>Understand the fundamental concepts and history of AI.</li>
          <li>Discover the broad applications of AI in various fields.</li>
          <li>Gain insights into the types of AI, including narrow AI and general AI.</li>
        </ul>
      ),
    },
    {
      title: "Introduction to AI",
      content: (
        <div>
          <p className="text-gray-700 text-lg">
            Artificial Intelligence, or AI, is a fascinating field of computer science that revolves around creating intelligent systems capable of tasks typically requiring human intelligence. AI endeavors to develop machines and algorithms that can think, reason, and learn, just like humans.
          </p>
          <p className="text-gray-700 text-lg mt-4">
            In the subtopic "Introduction to AI," we will delve into the following key areas:
          </p>
          <ul className="list-disc ml-8 text-gray-700 text-lg">
            <li>Defining AI and its significance.</li>
            <li>Tracing the historical evolution of AI.</li>
            <li>Exploring practical applications of AI in our everyday lives.</li>
            <li>Distinguishing between narrow AI (Weak AI) and general AI (Strong AI).</li>
          </ul>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (section < sections.length - 1) {
      setSection(section + 1);
    }
  };

  const handleBack = () => {
    if (section > 0) {
      setSection(section - 1);
    }
  };

  return (
    <div className="bg-blue-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold text-blue-800 mb-4">{sections[section].title}</h1>
        {sections[section].content}
      </div>
      <div className="flex justify-between max-w-3xl mx-auto mt-6">
        <button
          onClick={handleBack}
          className={`text-blue-500 font-semibold ${
            section === 0 ? "invisible" : "visible"
          }`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={`text-blue-500 font-semibold ${
            section === sections.length - 1 ? "invisible" : "visible"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AIDefinition;
