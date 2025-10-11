import { useState, useEffect } from "react";
import { Candidate, CandidateDetails } from "@/types/candidate";

export function useCandidateDetails(candidateId: string, candidates: Candidate[]) {
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);
  const [candidateDetails, setCandidateDetails] = useState<CandidateDetails | null>(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [addModal, setAddModal] = useState({ isOpen: false, section: "" });
  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const candidate = candidates.find((c: Candidate) => c.id.toString() === candidateId);

  // Fetch all candidate sections
useEffect(() => {
  const fetchCandidateDetails = async () => {
    if (!candidate) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/candidate-details/${candidate.id}`);
      if (response.ok) {
        const details = await response.json();
        setCandidateDetails(details);
      } else if (response.status === 404) {
        console.warn("No candidate details found, setting default");
        setCandidateDetails({
          candidate_id: candidate.id,
          overall_rating: 0,
          total_ratings: 0,
          past_elections: {},
          social_links: {},
          political_experiences: [],
          campaign_focuses: [],
          contributions: [],
          controversies: [],
          achievements: []
        });
      } else {
        console.error("Failed to fetch candidate details");
      }
    } catch (error) {
      console.error("Error fetching candidate details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (candidate) {
    setActiveCandidate(candidate);
    fetchCandidateDetails();
  }
}, [candidate]);


  const handleSaveSection = async (section: string, data: any[]) => {
    if (!activeCandidate) return;

    try {
      setSaving(true);

      // Determine endpoint and prepare payload
      let endpoint = "";
      const payload: CandidateDetails = {
        candidate_id: activeCandidate.id,
        political_experiences: candidateDetails?.political_experiences || [],
        campaign_focuses: candidateDetails?.campaign_focuses || [],
        contributions: candidateDetails?.contributions || [],
        controversies: candidateDetails?.controversies || [],
        achievements: candidateDetails?.achievements || [],
      };

      switch (section) {
        case "Political Experience":
          endpoint = "political-experience";
          payload.political_experiences = data;
          break;
        case "Campaign Focus":
          endpoint = "campaign-focus";
          payload.campaign_focuses = data;
          break;
        case "Positive Contributions":
          endpoint = "contributions";
          payload.contributions = data;
          break;
        case "Controversies":
          endpoint = "controversies";
          payload.controversies = data;
          break;
        case "Achievements":
          endpoint = "achievements";
          payload.achievements = data;
          break;
        default:
          throw new Error("Invalid section");
      }

      // POST to section endpoint
      const response = await fetch(`http://localhost:8000/candidate-details/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const savedDetails = await response.json();
        setCandidateDetails(savedDetails);
        setAddModal({ isOpen: false, section: "" });
        alert(`${section} saved successfully!`);
      } else if (response.status === 404) {
        // Create candidate details if not exist
        const createResponse = await fetch("http://localhost:8000/candidate-details/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (createResponse.ok) {
          const createdDetails = await createResponse.json();
          setCandidateDetails(createdDetails);
          setAddModal({ isOpen: false, section: "" });
          alert(`${section} created and saved successfully!`);
        } else {
          const err = await createResponse.json();
          console.error(err);
          alert("Failed to create candidate details");
        }
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert("Failed to save candidate details");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving candidate details");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveImage = async (imageFile: File) => {
    if (!activeCandidate) return;

    try {
      setImageLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("candidate_id", activeCandidate.id.toString());
      formData.append("bucket_name", "candidate");

      const response = await fetch("http://localhost:8000/upload-candidate-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setActiveCandidate({ ...activeCandidate, image: result.image_url });
        alert("Image uploaded successfully!");
        setImageModal(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to upload image:", errorData);
        alert(`Failed to upload image: ${errorData.detail || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!activeCandidate || !activeCandidate.image) return;

    try {
      setImageLoading(true);

      const response = await fetch("http://localhost:8000/remove-candidate-image", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidate_id: activeCandidate.id,
          image_url: activeCandidate.image,
          bucket_name: "candidate",
        }),
      });

      if (response.ok) {
        setActiveCandidate({ ...activeCandidate, image: undefined });
        alert("Image removed successfully!");
        setImageModal(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to remove image:", errorData);
        alert(`Failed to remove image: ${errorData.detail || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error removing image:", error);
      alert("Error removing image");
    } finally {
      setImageLoading(false);
    }
  };

  const handleAddReview = (review: { rating: number; comment: string }) => {
    console.log("Adding review:", review);
    alert("Review submitted! (This should be saved to backend in real app)");
  };

  return {
    activeCandidate,
    candidateDetails,
    loading,
    saving,
    imageLoading,
    reviewModal,
    addModal,
    imageModal,
    setReviewModal,
    setAddModal,
    setImageModal,
    handleSaveSection,
    handleSaveImage,
    handleRemoveImage,
    handleAddReview,
  };
}
