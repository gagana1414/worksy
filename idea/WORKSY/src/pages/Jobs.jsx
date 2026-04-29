import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import JobCard from '../components/JobCard';
import FilterPanel from '../components/FilterPanel';
import Button from '../components/Button';
import './Jobs.css';

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialLocParams = searchParams.get('location') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [jobs, setJobs] = useState([]);

  // States for filtering
  const [pendingFilters, setPendingFilters] = useState({ type: [], location: [], salary: 'any' });
  const [appliedFilters, setAppliedFilters] = useState({ type: [], location: [], salary: 'any' });

  // Add the free text location as a separate state so it doesn't break the checkbox logic
  const [freeTextLocation] = useState(initialLocParams);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setJobs(data.data);
        }
      })
      .catch(err => console.error("Error fetching jobs from backend:", err));
  }, []);

  // Filter Configuration
  const filterConfig = [
    {
      id: 'type',
      title: 'Job Type',
      type: 'checkbox',
      options: [
        { label: 'Part-Time', value: 'Part-Time', checked: pendingFilters.type.includes('Part-Time') },
        { label: 'Internship', value: 'Internship', checked: pendingFilters.type.includes('Internship') },
        { label: 'Freelance', value: 'Freelance', checked: pendingFilters.type.includes('Freelance') }
      ]
    },
    {
      id: 'location',
      title: 'Location',
      type: 'checkbox',
      options: [
        { label: 'Remote', value: 'Remote', checked: pendingFilters.location.includes('Remote') },
        { label: 'In-Office', value: 'In-Office', checked: pendingFilters.location.includes('In-Office') },
        { label: 'Hybrid', value: 'Hybrid', checked: pendingFilters.location.includes('Hybrid') }
      ]
    },
    {
      id: 'salary',
      title: 'Expected Salary',
      type: 'select',
      options: [
        { label: 'Any', value: 'any' },
        { label: 'Under ₹5,000', value: '<5k' },
        { label: '₹5,000 - ₹10,000', value: '5k-10k' },
        { label: 'Above ₹10,000', value: '>10k' }
      ]
    }
  ];

  const handleFilterChange = (groupId, value) => {
    setPendingFilters(prev => {
      if (groupId === 'salary') return { ...prev, salary: value };

      const list = prev[groupId];
      if (list.includes(value)) {
        return { ...prev, [groupId]: list.filter(v => v !== value) };
      } else {
        return { ...prev, [groupId]: [...list, value] };
      }
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters(pendingFilters);
  };

  // Run the filtering logic
  const filteredJobs = jobs.filter(job => {
    // 1. Keyword search
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. Free Text Location (from URL)
    const matchesFreeTextLoc = !freeTextLocation || job.location.toLowerCase().includes(freeTextLocation.toLowerCase());

    // 3. Type filter
    const matchesType = appliedFilters.type.length === 0 || appliedFilters.type.includes(job.type);

    // 4. Location filter (from checkboxes)
    const matchesLocation = appliedFilters.location.length === 0 || appliedFilters.location.some(loc => job.location.toLowerCase().includes(loc.toLowerCase()));

    return matchesSearch && matchesFreeTextLoc && matchesType && matchesLocation;
  });

  return (
    <div className="jobs-page bg-light animate-fade-in">
      <div className="container page-container">

        {/* Sidebar Filters Component */}
        <aside className="filters-sidebar">
          <FilterPanel
            filters={filterConfig}
            onFilterChange={handleFilterChange}
            onApply={handleApplyFilters}
          />
        </aside>

        {/* Main Content */}
        <main className="listings-content">
          <div className="search-header">
            <h1 className="page-title">Find Part-Time Jobs</h1>

            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search by job title, company, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="results-meta">
              <span>Showing <strong>{filteredJobs.length}</strong> jobs</span>
              <div className="sort-by">
                <span>Sort by:</span>
                <select>
                  <option>Most Recent</option>
                  <option>Highest Salary</option>
                </select>
              </div>
            </div>
          </div>

          <div className="jobs-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="no-results">
                <h3>No jobs found matching your criteria.</h3>
                <p>Try adjusting your search terms or filters.</p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>Clear Search</Button>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Jobs;
