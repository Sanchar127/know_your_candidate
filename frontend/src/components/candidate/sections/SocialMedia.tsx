import LinkIcon from "@/layout/icons/LinkIcon";
import FacebookIcon from "@/layout/icons/FacebookIcon";
import InstagramIcon from "@/layout/icons/InstagramIcon";
import XIcon from "@/layout/icons/XIcon";
import SocialLink from "../ui/SocialLink";

interface SocialMediaProps {
  candidate: any;
  socialLinks: any;
}

export default function SocialMedia({ candidate, socialLinks }: SocialMediaProps) {
  return (
    <div className="bg-white/80 rounded-2xl shadow-xl p-7 border border-white/70 backdrop-blur-md hover:shadow-2xl transition-all duration-500">
      <h3 className="text-xl font-bold text-violet-900 mb-6 flex items-center">
        <LinkIcon className="w-6 h-6 mr-3 text-violet-700" />
        Connect with {candidate.name.split(" ")[0]}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {socialLinks.facebook && (
          <SocialLink
            href={socialLinks.facebook}
            icon={FacebookIcon}
            label="Facebook"
            color="hover:text-blue-600"
          />
        )}
        {socialLinks.X && (
          <SocialLink
            href={socialLinks.X}
            icon={XIcon}
            label="X"
            color="hover:text-blue-400"
          />
        )}
        {socialLinks.instagram && (
          <SocialLink
            href={socialLinks.instagram}
            icon={InstagramIcon}
            label="Instagram"
            color="hover:text-pink-600"
          />
        )}
        {!socialLinks.facebook && !socialLinks.X && !socialLinks.instagram && (
          <p className="text-gray-400 italic col-span-3 text-center py-4">
            No social media links available
          </p>
        )}
      </div>
    </div>
  );
}