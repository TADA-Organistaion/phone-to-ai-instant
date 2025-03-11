
export type SignupStep = 'email' | 'otp' | 'business' | 'manualEntry';

export type BusinessData = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  placeId?: string;
  website?: string; // Adding website URL field
};

export type UserData = {
  email: string;
  firstName: string;
  lastName: string;
};
