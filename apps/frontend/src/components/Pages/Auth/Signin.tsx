import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import {
  getUser,
  login,
  setAccessToken,
  setRefreshToken,
} from "../../../services/AuthService";
import { useAppDispatch } from "../../../redux-store/hooks";
import { setUser } from "../../../redux-store/slices/UserSlice";

export default function Signin() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor ingrese usuario y contraseña.");
      return;
    }

    setLoading(true);

    const tokens = await login(email, password);

    if (!tokens) {
      alert("E-mail y/o contraseña incorrecto.");

      return;
    }

    setAccessToken(tokens.access_token);
    setRefreshToken(tokens.refresh_token);

    const user = await getUser();

    if (!user) {
      location.reload();
    }

    dispatch(setUser(user));

    setLoading(false);
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="E-mail"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Contraseña"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={handleLogin}
      >
        Ingresar
      </LoadingButton>
    </Stack>
  );
}
