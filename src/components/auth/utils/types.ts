
export type SignupStep = 'email' | 'otp' | 'business' | 'manualEntry';

export type BusinessData = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  placeId?: string;
};

export type UserData = {
  email: string;
  firstName: string;
  lastName: string;
};
