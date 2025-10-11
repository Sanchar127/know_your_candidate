import Button from "@/components/ui/Button";
import PlusIcon from "@/layout/icons/PlusIcon";
import ThumbsUpIcon from "@/layout/icons/ThumbsUpIcon";

interface PositiveContributionsProps {
  contributions: any[];
  onAddContribution: () => void;
}

export default function PositiveContributions({ contributions, onAddContribution }: PositiveContributionsProps) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-xl p-7 border border-white/70 backdrop-blur-md hover:shadow-2xl transition-all duration-500">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-violet-900 flex items-center">
          <ThumbsUpIcon className="w-6 h-6 mr-3 text-green-600" />
          Positive Contributions
        </h3>
        <Button
          onClick={onAddContribution}
          size="sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Contribution
        </Button>
      </div>
      {contributions?.length ? (
        <div className="space-y-4">
          {contributions.map((contribution, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-green-800 font-medium">{contribution.title}</p>
              {contribution.description && (
                <p className="text-gray-600 text-sm mt-1">{contribution.description}</p>
              )}
              {contribution.impact && (
                <p className="text-green-600 text-sm mt-1">Impact: {contribution.impact}</p>
              )}
              {contribution.date && (
                <p className="text-sm text-green-600 mt-2">{new Date(contribution.date).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <ThumbsUpIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 italic">No positive contributions recorded yet.</p>
          <Button
            onClick={onAddContribution}
            variant="outline"
            size="sm"
            className="mt-3"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add First Contribution
          </Button>
        </div>
      )}
    </div>
  );
}