import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import UserGroupIcon from "@/layout/icons/UserGroupIcon";

interface CandidateHeaderProps {
  candidate: any;
  onBack: () => void;
}

export default function CandidateHeader({ candidate, onBack }: CandidateHeaderProps) {
  return (
    <div className="text-center mb-12">
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-6"
      >
        ← Back to Candidates
      </Button>

      <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
        <GradientText className="bg-gradient-to-r from-violet-600 via-pink-500 to-blue-600 animate-gradient">
          {candidate.name}
        </GradientText>
      </h1>

      <div className="inline-flex items-center px-6 py-3 bg-violet-100/80 text-violet-800 rounded-full text-lg font-semibold shadow-lg backdrop-blur-md border border-violet-200/40 hover:shadow-xl transition-all duration-300">
        <UserGroupIcon className="w-5 h-5 mr-3" />
        {candidate.party || "Independent"}
      </div>
    </div>
  );
}