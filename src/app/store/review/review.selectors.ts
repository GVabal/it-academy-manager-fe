import { createFeatureSelector, createSelector } from '@ngrx/store';
import { reviewsAdapter, reviewsFeatureKey, ReviewsState } from './review.reducer';


export const getReviewsFeatureState =  createFeatureSelector<ReviewsState>(reviewsFeatureKey);
export const getIsReviewsLoading = createSelector(getReviewsFeatureState, ReviewsState => ReviewsState.loading);
export const getIsReviewsLoaded = createSelector(getReviewsFeatureState, ReviewsState => ReviewsState.loaded);
export const getReviewsError = createSelector(getReviewsFeatureState, ReviewsState => ReviewsState.error);
export const {selectAll: selectReviewss} = reviewsAdapter.getSelectors(getReviewsFeatureState);
