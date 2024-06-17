export interface ITrainingCenter {
  name: string;
  incepts_on: string;
  audit_renewal_on: string;
  flight_audit_on: string;
  platinum_center: boolean;
  phone: string;
  website: string;
  primary_contact: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  qualifications: string[];
  training_center_rtm_user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  shipping_address: {
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postal_code: string | null;
  };
  insurance: {
    company: string;
    notes: string | null;
    policy_end_on: string | null;
    policy_start_on: string | null;
    product_liability: number;
  };
  cirrus_bucks: {
    balance: number;
    customer_number: string | null;
  };
}
