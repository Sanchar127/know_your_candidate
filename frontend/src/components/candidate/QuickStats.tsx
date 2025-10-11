import StarIcon from "@/layout/icons/StarIcon";

interface QuickStatsProps {
  candidateDetails: any;
}

export default function QuickStats({ candidateDetails }: QuickStatsProps) {
  const averageRating = candidateDetails?.overall_rating || 0;
  const totalRatings = candidateDetails?.total_ratings || 0;

  return (
    <div className="bg-white/80 rounded-2xl shadow-xl p-6 border border-white/60 backdrop-blur-md hover:shadow-2xl transition-all duration-500">
      <h3 className="text-xl font-bold text-violet-900 mb-4 flex items-center">
        <StarIcon className="w-5 h-5 mr-2" />
        Quick Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl p-4 text-center border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-bold text-violet-700">{averageRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Avg Rating</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-bold text-blue-700">{totalRatings}</div>
          <div className="text-sm text-gray-600">Total Ratings</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-bold text-green-700">
            {candidateDetails?.political_experiences?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Experiences</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-bold text-amber-700">
            {candidateDetails?.achievements?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Achievements</div>
        </div>
      </div>
    </div>
  );
}