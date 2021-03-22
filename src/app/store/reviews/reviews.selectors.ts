import { createFeatureSelector, createSelector } from '@ngrx/store';
import { reviewsAdapter, reviewsFeatureKey, ReviewsState } from './reviews.reducer';

export const getReviewsFeatureState = createFeatureSelector<ReviewsState>(reviewsFeatureKey);

export const getIsReviewsLoading = createSelector(getReviewsFeatureState, reviewsState => reviewsState.loading);
export const getIsReviewsLoaded = createSelector(getReviewsFeatureState, reviewsState => reviewsState.loaded);
export const getHasReviewAddFailed = createSelector(getReviewsFeatureState, reviewsState => reviewsState.hasReviewAddFailed);
export const getreviewsError = createSelector(getReviewsFeatureState, reviewsState => reviewsState.error);

export const { selectAll: selectReviews} = reviewsAdapter.getSelectors(getReviewsFeatureState);
