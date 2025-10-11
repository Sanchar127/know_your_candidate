"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useCandidatesData } from "./hooks/useCandidatesData";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/Pagination";
import GradientText from "@/components/ui/GradientText";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { setCandidates, selectCandidate } from "@/store/candidatesSlice";

// Types
interface FilterState {
  province: string;
  district: string;
  party: string;
}

interface FilterOptions {
  provinces: Array<{
    id: string;
    name: string;
    districts: Array<{ id: string; name: string }>;
  }>;
  parties: string[];
}

interface FilterSectionProps {
  filter: FilterState;
  filterOptions: FilterOptions;
  onFilterChange: (filter: FilterState) => void;
}

// Filter Section Component
const FilterSection = ({ filter, filterOptions, onFilterChange }: FilterSectionProps) => {
  const selectedProvince = filterOptions.provinces.find(
    (p) => p.name.trim().toLowerCase() === filter.province.trim().toLowerCase()
  );

  const districtsToShow = selectedProvince?.districts || [];

  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    onFilterChange({
      ...filter,
      [key]: value,
      ...(key === "province" ? { district: "" } : {}),
    });
  }, [filter, onFilterChange]);

  const selectClasses = `
    border border-gray-300 rounded-lg px-4 py-2.5 shadow-sm hover:shadow-md 
    transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    outline-none min-w-[180px] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed
    text-gray-700
  `;

  return (
    <div className="flex flex-wrap gap-4 mb-8" role="search" aria-label="Filter candidates">
      {/* Province Filter */}
      <div className="flex flex-col">
        <label htmlFor="province-filter" className="text-sm font-medium text-gray-700 mb-1">
          Province
        </label>
        <select
          id="province-filter"
          className={selectClasses}
          value={filter.province}
          onChange={(e) => handleFilterChange("province", e.target.value)}
          aria-label="Filter by province"
        >
          <option value="">All Provinces</option>
          {filterOptions.provinces.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* District Filter */}
      <div className="flex flex-col">
        <label htmlFor="district-filter" className="text-sm font-medium text-gray-700 mb-1">
          District
        </label>
        <select
          id="district-filter"
          className={selectClasses}
          value={filter.district}
          onChange={(e) => handleFilterChange("district", e.target.value)}
          disabled={!filter.province}
          aria-label="Filter by district"
          aria-disabled={!filter.province}
        >
          <option value="">All Districts</option>
          {districtsToShow.length > 0 ? (
            districtsToShow.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No districts available
            </option>
          )}
        </select>
      </div>

      {/* Party Filter */}
      <div className="flex flex-col">
        <label htmlFor="party-filter" className="text-sm font-medium text-gray-700 mb-1">
          Political Party
        </label>
        <select
          id="party-filter"
          className={selectClasses}
          value={filter.party}
          onChange={(e) => handleFilterChange("party", e.target.value)}
          aria-label="Filter by political party"
        >
          <option value="">All Parties</option>
          {filterOptions.parties.map((p, idx) => (
            <option key={`party-${idx}`} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Loading Component
const LoadingState = () => (
  <div className="flex justify-center items-center py-20" role="status" aria-label="Loading candidates">
    <div 
      className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      aria-hidden="true"
    ></div>
    <span className="sr-only">Loading candidates...</span>
  </div>
);

// Error Component
const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="text-center py-20" role="alert">
    <div className="text-red-600 mb-4 text-lg">⚠️ {message}</div>
    <Button 
      onClick={onRetry} 
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Try Again
    </Button>
  </div>
);

// Empty State Component
const EmptyState = ({ hasFilters }: { hasFilters: boolean }) => (
  <div className="text-center py-20">
    <div className="text-gray-500 text-lg mb-4">
      {hasFilters ? "No candidates match your filters" : "No candidates available"}
    </div>
    <p className="text-gray-400 max-w-md mx-auto">
      {hasFilters 
        ? "Try adjusting your filters to see more results." 
        : "Check back later for candidate updates."
      }
    </p>
  </div>
);

// Constants
const PAGE_SIZE = 8;

// Main Component
export default function CandidatesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { candidates, filterOptions, loading, error } = useCandidatesData();
  const [filter, setFilter] = useState<FilterState>({ 
    province: "", 
    district: "", 
    party: "" 
  });

  // Store candidates in Redux
  useEffect(() => {
    if (candidates.length > 0) {
      dispatch(setCandidates(candidates));
    }
  }, [candidates, dispatch]);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesProvince = !filter.province || 
        candidate.province?.name.trim().toLowerCase() === filter.province.trim().toLowerCase();
      
      const matchesDistrict = !filter.district || 
        candidate.district?.name.trim().toLowerCase() === filter.district.trim().toLowerCase();
      
      const matchesParty = !filter.party || candidate.party === filter.party;
      
      return matchesProvince && matchesDistrict && matchesParty;
    });
  }, [candidates, filter]);

  // Pagination
  const pagination = usePagination({
    totalItems: filteredCandidates.length,
    pageSize: PAGE_SIZE,
  });

  const paginatedCandidates = useMemo(() => {
    const start = pagination.offset;
    const end = start + pagination.pageSize;
    return filteredCandidates.slice(start, end);
  }, [filteredCandidates, pagination.offset, pagination.pageSize]);

  // Reset to first page when filters change
  useEffect(() => {
    pagination.setPage(1);
  }, [filter]);

  const handlePageChange = useCallback((page: number) => {
    pagination.setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pagination]);

  const handleCandidateClick = useCallback((candidateId: string) => {
    dispatch(selectCandidate(candidateId));
    router.push(`/candidates/${candidateId}`);
  }, [dispatch, router]);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  // Show loading state
  if (loading) return <LoadingState />;
  
  // Show error state
  if (error) return <ErrorState message={error} onRetry={handleRetry} />;

  const hasActiveFilters = filter.province !== "" || filter.district !== "" || filter.party !== "";
  const showEmptyState = filteredCandidates.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <GradientText>Meet the Candidates</GradientText>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Browse through the list of candidates, filter by location and party to find who represents you.
        </p>
      </header>

      {/* Filter Section */}
      <FilterSection 
        filter={filter} 
        filterOptions={filterOptions} 
        onFilterChange={setFilter} 
      />

      {/* Results Count */}
      <div className="mb-6 text-gray-600 flex justify-between items-center">
        <span>
          Showing{" "}
          <strong>
            {paginatedCandidates.length > 0 ? pagination.offset + 1 : 0}-
            {pagination.offset + paginatedCandidates.length}
          </strong>{" "}
          of <strong>{filteredCandidates.length}</strong> candidate
          {filteredCandidates.length !== 1 ? "s" : ""}
        </span>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={() => setFilter({ province: "", district: "", party: "" })}
            className="text-sm"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Candidates Grid */}
      {!showEmptyState ? (
        <>
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            role="list"
            aria-label="Candidates list"
          >
            {paginatedCandidates.map((candidate) => (
              <article 
                key={candidate.id}
                role="listitem"
                className="cursor-pointer transform transition-transform hover:scale-105 focus:scale-105"
                onClick={() => handleCandidateClick(candidate.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCandidateClick(candidate.id);
                  }
                }}
                tabIndex={0}
                aria-label={`View details for ${candidate.name}`}
              >
                <Card
                  title={candidate.name}
                  subtitle={candidate.party}
                  image={candidate.image}
                  footer={`${candidate.district?.name || "N/A"}, ${candidate.province?.name || "N/A"}`}
                />
              </article>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              className="mt-12"
            />
          )}
        </>
      ) : (
        <EmptyState hasFilters={hasActiveFilters} />
      )}
    </div>
  );
}