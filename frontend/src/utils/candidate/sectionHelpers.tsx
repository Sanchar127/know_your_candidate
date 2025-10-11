export const getEmptyItemForSection = (section: string) => {
  switch (section) {
    case "Political Experience":
      return { title: "", description: "", year: "" };
    case "Campaign Focus":
      return { title: "", description: "", priority: "" };
    case "Positive Contributions":
      return { title: "", description: "", impact: "", date: "" };
    case "Controversies":
      return { title: "", description: "", severity: "", date: "" };
    case "Achievements":
      return { description: "" };
    default:
      return { title: "", description: "" };
  }
};

export const getFieldLabels = (section: string) => {
  switch (section) {
    case "Political Experience":
      return ["Title", "Description", "Year"];
    case "Campaign Focus":
      return ["Title", "Description", "Priority"];
    case "Positive Contributions":
      return ["Title", "Description", "Impact", "Date"];
    case "Controversies":
      return ["Title", "Description", "Severity", "Date"];
    case "Achievements":
      return ["Description"];
    default:
      return ["Title", "Description"];
  }
};

export const getSectionIcon = (section: string) => {
  const icons = {
    "Political Experience": "BriefcaseIcon",
    "Campaign Focus": "TargetIcon", 
    "Positive Contributions": "ThumbsUpIcon",
    "Controversies": "ThumbsDownIcon",
    "Achievements": "StarIcon",
    "Social Media": "LinkIcon",
    "Past Elections": "CalendarIcon"
  };
  return icons[section as keyof typeof icons] || "UserGroupIcon";
};