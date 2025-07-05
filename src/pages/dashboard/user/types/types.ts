export interface UserDataType {
  key: string;
  sno: string;
  userName: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  country: string;
  profile?: UserProfile;
  contact: string;
  gender: string;
  dateOfBirth: string;
  location: string;
  postcode: string;
  city: string;
}

export interface UserDetailsProps {
  name: string;
  email: string;
  contact: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
}
export interface doctorDetails {
  name: string;
  email: string;
  contactNumber: string;
  gender: string;
  address: string;
  type: string;
}

export interface pharmacy {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}

export interface UserProfile {
  // You may need to define the properties of UserProfile interface
}
