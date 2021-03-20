import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mapToReviewData } from 'src/app/shared/review';
import { reviewsAdapter, reviewsFeatureKey, ReviewsState } from './review.reducer';


export const getReviewsFeatureState =  createFeatureSelector<ReviewsState>(reviewsFeatureKey);
export const getIsReviewsLoading = createSelector(getReviewsFeatureState, reviewsState => reviewsState.loading);
export const getIsReviewsLoaded = createSelector(getReviewsFeatureState, reviewsState => reviewsState.loaded);
export const getReviewsError = createSelector(getReviewsFeatureState, reviewsState => reviewsState.error);
export const {selectAll: selectReviews} = reviewsAdapter.getSelectors(getReviewsFeatureState);
export const getReviewData =  createSelector(selectReviews, (reviews) =>  mapToReviewData(reviews));
