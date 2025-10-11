import Button from "@/components/ui/Button";
import PlusIcon from "@/layout/icons/PlusIcon";
import StarIcon from "@/layout/icons/StarIcon";

interface AchievementsProps {
  achievements: any[];
  onAddAchievement: () => void;
}

export default function Achievements({ achievements, onAddAchievement }: AchievementsProps) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-xl p-7 border border-white/70 md:col-span-2 backdrop-blur-md hover:shadow-2xl transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-violet-900 flex items-center">
          <StarIcon className="w-6 h-6 mr-3 text-violet-700" />
          Notable Achievements
        </h3>
        <Button
          onClick={onAddAchievement}
          size="sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Achievement
        </Button>
      </div>
      {achievements?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-5 bg-gradient-to-br from-blue-50/90 to-violet-100/90 rounded-xl border border-white/70 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 group"
            >
              <div className="flex items-start">
                <StarIcon className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-violet-800 font-medium group-hover:text-violet-900 transition-colors duration-300">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <StarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 italic">No achievements listed yet.</p>
          <Button
            onClick={onAddAchievement}
            variant="outline"
            size="sm"
            className="mt-3"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add First Achievement
          </Button>
        </div>
      )}
    </div>
  );
}