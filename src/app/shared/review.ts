export interface Review {
    id: number;
    studentId: number;
    streamId: number;
    overallGrade: number;
    overallComment: string;
    abilityToLearnGrade: number;
    abilityToLearnComment: string;
    motivationGrade: number;
    motivationComment: string;
    extraMileGrade: number;
    extraMileComment: string;
    communicationGrade: number;
    communicationComment: string;
  }
