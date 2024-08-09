import { AuthGuard } from "../authGuard";

export const withAuthGuard = (Component: any) => (props: any) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);

 