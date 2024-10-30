"use client";
import {
  Stack,
  Fade,
  Button,
  InputLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  useTheme,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import SignUpStepper from "@/app/components/SignUpStepper";

export interface PersonalDetailsData {
  fullName: string;
  dateOfBirth: any;
  sex: string;
  referral: string;
  otherReferral?: string;
}

export default function PersonalDetails() {
  const router = useRouter();
  const theme = useTheme();

  const referralItems = [
    "Facebook",
    "Website",
    "Referral from a friend or family members",
    "Doctor's recommendation",
    "Pharmacy Visit",
    "Other (please specify)",
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PersonalDetailsData>();

  const selectedReferral = watch("referral");

  useEffect(() => {
    const existingData: PersonalDetailsData = JSON.parse(
      sessionStorage.getItem("signUpPersonalDetails") || "{}"
    );

    if (existingData) {
      setValue("fullName", existingData.fullName);
      if (existingData.dateOfBirth) {
        setValue(
          "dateOfBirth",
          parse(existingData.dateOfBirth, "dd/MM/yyyy", new Date())
        );
      }
      setValue("sex", existingData.sex);
      setValue("referral", existingData.referral);
    }
  }, [setValue]);
  const onSubmit = (formData: PersonalDetailsData) => {
    if (formData.dateOfBirth) {
      formData.dateOfBirth = format(
        new Date(formData.dateOfBirth),
        "dd/MM/yyyy"
      );
    }
    formData.fullName = formData.fullName.toUpperCase();
    if (formData.otherReferral) {
      formData.referral = formData.otherReferral;
    }
    sessionStorage.setItem("signUpPersonalDetails", JSON.stringify(formData));
    router.push("/sign-up/address");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack alignItems="center" marginTop={5}>
        <SignUpStepper activeStep={0} />
        <Fade in timeout={300}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ padding: { xs: 2, sm: 6 } }}
            >
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="fullName" required margin="dense">
                  Full Name
                </InputLabel>
                <TextField
                  id="fullName"
                  fullWidth
                  required
                  {...register("fullName", {
                    required: true,
                  })}
                  error={!!errors.fullName}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="dateOfBirth" required margin="dense">
                  Date of Birth
                </InputLabel>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DateField
                      fullWidth
                      clearable
                      required
                      format="dd/MM/yyyy"
                      slotProps={{
                        input: { startAdornment: <CalendarTodayIcon /> },
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="sex" required margin="dense">
                  Sex at birth
                </InputLabel>
                <Controller
                  name="sex"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={getValues("sex") ?? ""}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.sex?.type === "required" && (
                  <FormHelperText sx={{ color: theme.palette.error.main }}>
                    Please select an option
                  </FormHelperText>
                )}
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InputLabel htmlFor="referral" required margin="dense">
                  How did you hear about us?
                </InputLabel>
                <Select
                  fullWidth
                  id="referral"
                  value={getValues("referral")}
                  {...register("referral", {
                    required: true,
                  })}
                  required
                >
                  {referralItems.map((item, key) => (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              {selectedReferral === "Other (please specify)" ? (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    {...register("otherReferral", {
                      required: true,
                    })}
                  />
                </Grid>
              ) : null}
              <Grid
                container
                size={{ xs: 12 }}
                spacing={2}
                direction={{ xs: "row-reverse" }}
                marginTop={3}
              >
                <Grid size={{ md: 6, xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    endIcon={<EastRoundedIcon />}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Fade>
      </Stack>
    </LocalizationProvider>
  );
}