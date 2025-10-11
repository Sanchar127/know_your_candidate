"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface District {
  id: number;
  name: string;
  area_sq_km: string;
  website: string;
  headquarter: string;
}

interface Province {
  id: number;
  name: string;
  area_sq_km: string;
  website: string;
  headquarter: string;
  districts: District[];
}

interface Candidate {
  id: number;
  name: string;
  party: string;
  image?: string;
  province?: Province | null;
  district?: District | null;
}

interface FilterOptions {
  provinces: Province[];
  districts: District[];
  parties: string[];
}

export const useCandidatesData = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    provinces: [],
    districts: [],
    parties: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [candidatesRes, provincesRes] = await Promise.all([
          axios.get<Candidate[]>(`${API_BASE_URL}/candidates`),
          axios.get<Province[]>(`${API_BASE_URL}/provinces`),
        ]);

        const candidatesData = candidatesRes.data;
        const provincesData = provincesRes.data;
        
        const districtsData = provincesData.flatMap((province) =>
          (province.districts || []).map((district) => ({
            ...district,
            province_id: province.id,
          }))
        );

        setCandidates(candidatesData);
        setFilterOptions({
          provinces: provincesData,
          districts: districtsData,
          parties: [...new Set(candidatesData.map((c) => c.party))],
        });
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load candidates data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [API_BASE_URL]);

  return { candidates, filterOptions, loading, error };
};