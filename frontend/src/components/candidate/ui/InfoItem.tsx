interface InfoItemProps {
  icon: React.ComponentType<any>;
  label: string;
  value: string | number;
}

export default function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white/70 rounded-lg shadow-sm border border-white/50 backdrop-blur-md hover:bg-white/90 transition-all duration-300 hover:shadow-md">
      <Icon className="w-5 h-5 text-violet-700" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-violet-900">{value || "N/A"}</p>
      </div>
    </div>
  );
}