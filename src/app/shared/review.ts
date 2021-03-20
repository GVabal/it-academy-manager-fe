import { ReviewData } from './reviewData';
export interface Review {
    id: number;
    studentId: number;
    streamId?: number;
    overallGrade: number;
    overallComment: string;
    abilityToLearnGrade: number;
    abilityToLearnComment?: string;
    motivationGrade: number;
    motivationComment?: string;
    extraMileGrade: number;
    extraMileComment?: string;
    communicationGrade: number;
    communicationComment?: string;
  }

export function mapToReviewData( reviews: Review[]): ReviewData{
  const reviewData: ReviewData = {
    overallGrade: [],
    overallComment: [],
    abilityToLearnGrade: [],
    abilityToLearnComment: [],
    motivationGrade: [],
    motivationComment: [],
    extraMileGrade: [],
    extraMileComment: [],
    communicationGrade: [],
    communicationComment: []
  };

  if (reviews.length > 0){
    reviews.map( review => {
      reviewData.overallGrade.push(review.overallGrade);
      reviewData.overallComment.push(review.overallComment);
      reviewData.abilityToLearnGrade.push(review.abilityToLearnGrade);
      if (review.abilityToLearnComment){reviewData.abilityToLearnComment.push(review.abilityToLearnComment); }
      reviewData.motivationGrade.push(review.motivationGrade);
      if (review.motivationComment){reviewData.motivationComment.push(review.motivationComment); }
      reviewData.extraMileGrade.push(review.extraMileGrade);
      if (review.extraMileComment){reviewData.extraMileComment.push(review.extraMileComment); }
      reviewData.communicationGrade.push(review.communicationGrade);
      if (review.communicationComment){reviewData.communicationComment.push(review.communicationComment); }
    });
  }
  return reviewData;
}
