import { IContact } from './INotification';

export interface IProduct {
  id: number;
  name: string;
  desc: string;
  course_type: number;
  created_at: Date;
  updated_at: Date;
  course_category_id: number;
  is_ecommerce_enabled: boolean;
  is_active: boolean;
  major_version: number;
  minor_version: number;
  sf_course_id: string;
  certificate_id: number;
  badge_id: number;
  created_by: string;
  nts_module_id: string;
  has_agreement: boolean;
  agreement_body: string;
  tax_code: string;
  overview: string;
  thumbnail_image_url: string;
  title: string;
  meta_tags: any[];
  stages_are_linear: boolean;
  list_price: string;
  fulfillment_part_number: string;
  shipping_price?: any;
  can_reenroll: boolean;
  subtitle?: any;
  mobile_hero_image_url?: any;
  completion_time?: any;
  minimum_flight_hours?: any;
  desktop_hero_image_url?: any;
}

export interface IOrderLineItem {
  id: number;
  order_id: number;
  line_item_status?: any;
  line_item_unit_price: string;
  line_item_shipping?: any;
  line_item_tax?: any;
  line_item_discount?: any;
  line_item_quantity: number;
  product_id: number;
  product: IProduct;
}

export interface IOrderUser {
  id: number;
  email: string;
  role: string;
  admin: boolean;
  deactivated: boolean;
  contact: IContact;
  salesforce_id: string;
  ctc_admin: boolean;
}

export interface IOrder {
  id: number;
  user_id: number;
  order_status: string;
  created_at: Date;
  completed_date?: any;
  order_total?: any;
  line_total?: any;
  shipping_amount?: any;
  order_tax_amount?: any;
  discount_amount?: any;
  refunded_date?: any;
  refunded_amount?: any;
  session?: any;
  order_line_items: IOrderLineItem[];
  order_bill_to?: any;
  payments: any[];
  user: IOrderUser;
}
