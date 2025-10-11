interface SocialLinkProps { 
  href: string; 
  icon: React.ComponentType<any>; 
  label: string; 
  color: string;
}

export default function SocialLink({ href, icon: Icon, label, color }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center space-x-3 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group ${color}`}
    >
      <Icon className="w-6 h-6" />
      <span className="font-semibold text-gray-800 group-hover:text-gray-900">{label}</span>
    </a>
  );
}