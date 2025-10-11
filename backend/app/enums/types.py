import enum

class GenderEnum(enum.Enum):
    Male = "Male"
    Female = "Female"
    Other = "Other"

class MediaTypeEnum(enum.Enum):
    image = "image"
    video = "video"
    document = "document"
