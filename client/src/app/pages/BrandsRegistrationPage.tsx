import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";

export default function BrandsRegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCancel = () => {
    navigate("/brands");
  };

  const handleCreate = async () => {
    try {
      if (!name.trim()) {
        setErrorMessage("Informe o nome da marca.");
        return;
      }

      setSaving(true);

      const payload = {
        name: name.trim()
      };

      const response = await fetch("http://localhost:8080/api/products/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro da API:", errorText);
        throw new Error("Erro ao cadastrar marca.");
      }

      setSuccessMessage("Marca cadastrada com sucesso!");

      setTimeout(() => {
        navigate("/brands");
      }, 1200);

    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível cadastrar a marca.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Cadastrar Marca
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome da Marca"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={handleCreate}
              disabled={saving}
            >
              {saving ? "Salvando..." : "Cadastrar"}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}