import AuthLayout from "../../../components/auth/authLayout";
import AuthFormWrapper from "../../../components/auth/AuthFormWrapper";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <AuthFormWrapper
        title="New Password"
        subtitle=""
        linkText=""
        linkTo=""
      >
        <ResetPasswordForm />
      </AuthFormWrapper>
    </AuthLayout>
  );
};

export default ResetPasswordPage;