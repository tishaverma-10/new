import React, { useState, useEffect } from 'react';
import { formatDate } from '../utilis/formatDate';

const JOBS_PER_PAGE = 6;

const JobBoard = () => {
  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  // Fetch job IDs
  useEffect(() => {
    const fetchJobIds = async () => {
      const res = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
      const ids = await res.json();
      setJobIds(ids);
    };

    fetchJobIds();
  }, []);

  // Fetch job details
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const nextIds = jobIds.slice(jobs.length, visibleCount);
      const jobPromises = nextIds.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
      );
      const newJobs = await Promise.all(jobPromises);
      setJobs(prev => [...prev, ...newJobs]);
      setLoading(false);
    };

    if (jobIds.length > 0 && jobs.length < visibleCount) {
      fetchJobs();
    }
  }, [visibleCount, jobIds]);

  const loadMore = () => {
    setVisibleCount(prev => prev + JOBS_PER_PAGE);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Hacker News Job Board</h1>

      {jobs.map(job => (
        <div key={job.id} className="bg-white shadow-md rounded-md p-4 mb-4 border">
          <h3 className="text-xl font-semibold text-blue-600">
            {job.url ? (
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                {job.title}
              </a>
            ) : (
              job.title
            )}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Posted by:</span> {job.by}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Posted on:</span> {formatDate(job.time)}
          </p>
        </div>
      ))}

      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {!loading && jobs.length < jobIds.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default JobBoard;
