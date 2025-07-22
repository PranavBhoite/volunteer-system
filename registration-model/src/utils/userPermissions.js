// Utility functions for user permissions
export const getUserStatus = () => {
  // Check localStorage first, then sessionStorage
  return localStorage.getItem("userStatus") || sessionStorage.getItem("userStatus") || "approved";
};

export const isPendingUser = () => {
  return getUserStatus() === "pending";
};

export const canCreateEvents = () => {
  return !isPendingUser();
};

export const canRegisterForEvents = () => {
  return !isPendingUser();
};

export const canEditProfile = () => {
  return !isPendingUser();
};

export const isReadOnlyMode = () => {
  return isPendingUser();
};
