interface InquiryValues {
  type: string;
  email: string;
  title: string;
  desc: string;
}

interface FormState {
  success: boolean | null;
  message: string | null;
  returnUrl: string | null;
}
