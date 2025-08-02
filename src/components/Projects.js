import React from 'react';

const Projects = ({ projects }) => (
  <section id="projects" className="py-16 px-4 max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Projects</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map(p => (
        <article key={p.id} className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">{p.title}</h3>
          <p className="text-gray-700 mb-4">{p.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {p.tags.map(tag => (
              <span key={tag} className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
          <a href={p.github} className="text-sm text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">Source Code</a>
        </article>
      ))}
    </div>
  </section>
);

export default Projects;
