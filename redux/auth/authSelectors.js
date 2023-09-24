export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefresher;
export const selectAuth = (state) => state.auth;
export const getUser = ({ auth }) => auth.user;
