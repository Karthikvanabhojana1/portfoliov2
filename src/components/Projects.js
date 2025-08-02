import React from 'react';

const Projects = ({ projects }) => (
  <section className="my-8">
    <h2 className="text-2xl font-semibold mb-4">Projects</h2>
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map(p => (
        <div key={p.id} className="border p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-1">{p.title}</h3>
          <p className="text-gray-700 mb-2">{p.description}</p>
          <a className="text-indigo-500" href={p.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
