import { Link } from "react-router-dom";
export default function NotAuthorizedPage() {
  return (
    <div>
      <h1>Error 403: User Not Authorized</h1>
      <Link to="/">Back to Login</Link>
    </div>
  );
}
