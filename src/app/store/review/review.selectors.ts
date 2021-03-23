import { ReviewData } from './../../shared/reviewData';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { reviewsAdapter, reviewsFeatureKey, ReviewsState } from './review.reducer';
import { Review } from 'src/app/shared/review';
import { getSelectedStudentId } from '../students/students.selectors';


export const getReviewsFeatureState =  createFeatureSelector<ReviewsState>(reviewsFeatureKey);

export const getIsReviewsLoading = createSelector(getReviewsFeatureState, reviewsState => reviewsState.loading);
export const getIsReviewsLoaded = createSelector(getReviewsFeatureState, reviewsState => reviewsState.loaded);
export const getHasReviewAddFailed = createSelector(getReviewsFeatureState, reviewsState => reviewsState.hasReviewAddFailed);
export const getReviewsError = createSelector(getReviewsFeatureState, reviewsState => reviewsState.error);
export const {selectAll: selectReviews} = reviewsAdapter.getSelectors(getReviewsFeatureState);

export const getReviewData =  createSelector(selectReviews, getSelectedStudentId, (reviews, id) =>
   mapToReviewData(reviews.filter(review => review.studentId === id)));
export const isReviewDataInStore = createSelector(selectReviews, getSelectedStudentId, (reviews, id) =>
  reviews.some(review => review.studentId === id));


function average(list: number[]): number{
    let sum = 0;
    for (const item of list ){
      sum += item;
    }
    const avg = sum / list.length;
    return Number(avg.toFixed(2));
  }

function mapToReviewData( reviews: Review[]): ReviewData{
    const reviewData: ReviewData = {
        averages: [],
        data: {
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
        }
    };
    if (reviews.length > 0){
      reviews.map( review => {
        reviewData.data.overallGrade.push(review.overallGrade);
        reviewData.data.overallComment.push(review.overallComment);
        reviewData.data.abilityToLearnGrade.push(review.abilityToLearnGrade);
        if (review.abilityToLearnComment){reviewData.data.abilityToLearnComment.push(review.abilityToLearnComment); }
        reviewData.data.motivationGrade.push(review.motivationGrade);
        if (review.motivationComment){reviewData.data.motivationComment.push(review.motivationComment); }
        reviewData.data.extraMileGrade.push(review.extraMileGrade);
        if (review.extraMileComment){reviewData.data.extraMileComment.push(review.extraMileComment); }
        reviewData.data.communicationGrade.push(review.communicationGrade);
        if (review.communicationComment){reviewData.data.communicationComment.push(review.communicationComment); }
      });
    }
    reviewData.averages = [average(reviewData.data.overallGrade), average(reviewData.data.abilityToLearnGrade),
      average(reviewData.data.motivationGrade), average(reviewData.data.extraMileGrade), average(reviewData.data.communicationGrade)];
    return reviewData;
  }
