"use client";
import { Stack, Fade, Button, Typography, Box, useTheme } from "@mui/material";
import ConsultationStepper from "../components/ConsultationStepper";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();
  const theme = useTheme();

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    sessionStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.clear();
      router.push("/");
    }, 60000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Stack alignItems="center" marginTop={5}>
      <ConsultationStepper activeStep={3} />
      <Fade in timeout={300}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            sx={{ padding: { xs: 2, sm: 6 } }}
          >
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
              <Box
                component="img"
                src="https://i.imgur.com/QRVEoaF.png"
                alt="KinWell logo"
                width={300}
                sx={{ [theme.breakpoints.down("sm")]: { width: 200 } }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography textAlign="center" variant="h4" component="h2">
                Thanks for using <i>Quick</i> Care! 😊
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography textAlign="center" variant="h4" component="h2">
                The Pharmacist will now assess your symptoms and call your name
                when ready. 📣
              </Typography>
            </Grid>
            <Grid
              container
              size={{ xs: 12 }}
              spacing={2}
              direction={{ xs: "row-reverse" }}
            >
              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                >
                  New Consultation
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Fade>
    </Stack>
  );
}
