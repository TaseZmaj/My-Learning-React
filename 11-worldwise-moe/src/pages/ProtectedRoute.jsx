import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  //Pretstavuva vid na SECURITY:
  // Komponent koj ako ne e authenticated userot, odnosno ako
  //ne e logiran, avtomatski da go vrati na "/".
  //NO PAZI: ako se napravi refresh na /app -> ke ne vrati na "/"
  //NO PAZI: ako se dodade rachno na url-to /app -> ke ne vrati na "/"

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  //ima mili sekunda kade probuva da gi renderne children, t.e. <User/>, t.e.
  //user objektot, no toj e null i dava error.  Za da ne se slucuva ova:
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
