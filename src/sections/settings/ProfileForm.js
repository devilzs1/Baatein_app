// import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import { Stack, Button } from "@mui/material";
import { faker } from "@faker-js/faker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UpdateUserProfile } from "../../redux/slices/app";

const ProfileForm = () => {
  // const [file, setFile] = useState();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.app);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    about: Yup.string().required("About is required"),
    // avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    about: user?.about,
    // avatar: faker.image.avatar(),
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    // reset,
    // watch,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  // const values = watch();

  const onSubmit = async (data) => {
    try {
      //   Send API request
      // console.log("DATA", data);
      dispatch(UpdateUserProfile({
        firstName: data?.firstName,
        lastName: data?.lastName,
        about: data?.about,
      }))
    } catch (error) {
      console.error("Error updating user profile!!!", error);
    }
  };

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     setFile(file);

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue("avatar", newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField name="lastName" label="Last Name" />

        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save"}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
