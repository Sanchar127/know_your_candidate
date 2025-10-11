import Button from "@/components/ui/Button";
import PlusIcon from "@/layout/icons/PlusIcon";

interface SectionCardProps {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  onAdd: () => void;
  addButtonText: string;
  isEmpty: boolean;
  emptyMessage: string;
  emptyIcon: React.ComponentType<any>;
}

export default function SectionCard({
  title,
  icon: Icon,
  children,
  onAdd,
  addButtonText,
  isEmpty,
  emptyMessage,
  emptyIcon: EmptyIcon
}: SectionCardProps) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-xl p-7 border border-white/70 backdrop-blur-md hover:shadow-2xl transition-all duration-500 group">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-violet-900 flex items-center group-hover:scale-105 transition-transform duration-300">
          <Icon className="w-6 h-6 mr-3 text-violet-700" />
          {title}
        </h3>
        <Button onClick={onAdd} size="sm">
          <PlusIcon className="w-4 h-4 mr-1" />
          {addButtonText}
        </Button>
      </div>
      
      {isEmpty ? (
        <div className="text-center py-8">
          <EmptyIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 italic">{emptyMessage}</p>
          <Button
            onClick={onAdd}
            variant="outline"
            size="sm"
            className="mt-3"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add First Item
          </Button>
        </div>
      ) : (
        children
      )}
    </div>
  );
}