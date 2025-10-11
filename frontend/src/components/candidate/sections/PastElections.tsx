import CalendarIcon from "@/layout/icons/CalendarIcon";

interface PastElectionsProps {
  pastElections: any;
}

export default function PastElections({ pastElections }: PastElectionsProps) {
  return (
    <div className="bg-white/80 rounded-2xl shadow-xl p-7 border border-white/70 backdrop-blur-md hover:shadow-2xl transition-all duration-500">
      <h3 className="text-xl font-bold text-violet-900 mb-6 flex items-center">
        <CalendarIcon className="w-6 h-6 mr-3 text-violet-700" />
        Past Elections Contested
      </h3>
      {pastElections && Object.keys(pastElections).length > 0 ? (
        <ul className="space-y-4">
          {Object.entries(pastElections).map(([year, election]: [string, any]) => (
            <li 
              key={year} 
              className="p-4 bg-gradient-to-r from-orange-50/80 to-amber-50/80 rounded-xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <p className="font-bold text-violet-800 text-lg">
                {year} — {election.position || "Unknown Position"}
              </p>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                Result: <span className={`font-bold ${election.result?.toLowerCase().includes('won') ? 'text-green-600' : election.result?.toLowerCase().includes('lost') ? 'text-red-600' : 'text-blue-600'}`}>
                  {election.result || "Unknown"}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 italic">No past election data available.</p>
      )}
    </div>
  );
}