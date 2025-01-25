import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Navbar/Header";
import SearchBar from "./components/Navbar/Header/SearchBar";
import JobCard from "./components/Navbar/Header/SearchBar/JobCard";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async () => {
    try {
      setCustomSearch(false);
      setLoading(true);
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      const q = query(jobsRef, orderBy("postedOn", "desc"));
      const req = await getDocs(q);

      req.forEach((doc) => {
        const data = doc.data();
        tempJobs.push({
          ...data,
          id: doc.id,
          postedOn: data.postedOn ? data.postedOn.toDate() : null, // Convert to Date
        });
      });

      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsCustom = async (jobCriteria) => {
    try {
      setCustomSearch(true);
      setLoading(true);
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      const q = query(
        jobsRef,
        where("type", "==", jobCriteria.type),
        where("title", "==", jobCriteria.title),
        where("experience", "==", jobCriteria.experience),
        where("location", "==", jobCriteria.location),
        orderBy("postedOn", "desc")
      );
      const req = await getDocs(q);

      req.forEach((doc) => {
        const data = doc.data();
        tempJobs.push({
          ...data,
          id: doc.id,
          postedOn: data.postedOn ? data.postedOn.toDate() : null,
        });
      });

      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching custom jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />
      {customSearch && (
        <div className="flex justify-end mb-2">
          <button
            onClick={fetchJobs}
            className="bg-blue-500 px-10 py-2 rounded-md text-white hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} {...job} />)
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default App;
