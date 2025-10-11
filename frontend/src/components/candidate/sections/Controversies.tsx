import Button from "@/components/ui/Button";
import PlusIcon from "@/layout/icons/PlusIcon";
import ThumbsDownIcon from "@/layout/icons/ThumbsDownIcon";

interface ControversiesProps {
  controversies: any[];
  onAddControversy: () => void;
}

export default function Controversies({ controversies, onAddControversy }: ControversiesProps) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-xl p-7 border border-white/70 backdrop-blur-md hover:shadow-2xl transition-all duration-500">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-violet-900 flex items-center">
          <ThumbsDownIcon className="w-6 h-6 mr-3 text-red-600" />
          Controversies & Concerns
        </h3>
        <Button
          onClick={onAddControversy}
          size="sm"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Controversy
        </Button>
      </div>
      {controversies?.length ? (
        <div className="space-y-4">
          {controversies.map((controversy, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-red-50/80 to-rose-50/80 rounded-xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-red-800 font-medium">{controversy.title}</p>
              {controversy.description && (
                <p className="text-gray-600 text-sm mt-1">{controversy.description}</p>
              )}
              {controversy.severity && (
                <p className="text-red-600 text-sm mt-1">Severity: {controversy.severity}</p>
              )}
              {controversy.date && (
                <p className="text-sm text-red-600 mt-2">{new Date(controversy.date).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <ThumbsDownIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 italic">No controversies or concerns recorded yet.</p>
          <Button
            onClick={onAddControversy}
            variant="outline"
            size="sm"
            className="mt-3"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add First Controversy
          </Button>
        </div>
      )}
    </div>
  );
}