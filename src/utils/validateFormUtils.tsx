export const validateUsername = (username: string): string | null => {
    if (!username) {
      return "Username is required";
    }
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 4) {
      return "Password must be at least 4 characters long";
    }
    return null;
  };
  
  export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Email is not valid";
    }
    return null;
  };
  
  export const validateForm = (data: { username: string; password: string; email?: string }) => {
    const errors: { username?: string; password?: string; email?: string } = {};
    
    const usernameError = validateUsername(data.username);
    if (usernameError) {
      errors.username = usernameError;
    }
  
    const passwordError = validatePassword(data.password);
    if (passwordError) {
      errors.password = passwordError;
    }
  
    if (data.email) {
      const emailError = validateEmail(data.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
  
    return errors;
  };
  
  export const validateMealsName = (mealsName: string): string | null => {
    if (!mealsName) {
      return "Meal name is required.";
    }
    if (mealsName.length < 3) {
      return "Meal name must be at least 3 characters long.";
    }
    return null;
  };
  
  export const validateMealsFoto = (mealsFoto: string): string | null => {
    const urlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
    if (!mealsFoto) {
      return "Meal photo URL is required.";
    }
    if (!urlRegex.test(mealsFoto)) {
      return "Meal photo must be a valid URL (jpg, jpeg, png).";
    }
    return null;
  };
  
  export const validateMealsDescription = (mealsDescription: string): string | null => {
    if (!mealsDescription) {
      return "Meal description is required.";
    }
    if (mealsDescription.length < 10) {
      return "Meal description must be at least 10 characters long.";
    }
    return null;
  };
  
  interface FormDataMeals {
    mealsName: string;
    mealsFoto: string;
    mealsDescription: string;
  }
  
  export const validateFormAddMeals = (data: FormDataMeals): { [key: string]: string | null } => {
    const errors: { [key: string]: string | null } = {};
  
    const nameError = validateMealsName(data.mealsName);
    if (nameError) {
      errors.mealsName = nameError;
    }
  
    const fotoError = validateMealsFoto(data.mealsFoto);
    if (fotoError) {
      errors.mealsFoto = fotoError;
    }
  
    const descriptionError = validateMealsDescription(data.mealsDescription);
    if (descriptionError) {
      errors.mealsDescription = descriptionError;
    }
  
    return errors;
  };
  