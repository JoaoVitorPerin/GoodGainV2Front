import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatorSenhaForte(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regexSenhaForte = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[0-9a-zA-Z\W_]{8,}$/;
      const valid = regexSenhaForte.test(control.value);
      return !valid ? { strongPassword: true } : null;
    };
}

export const confirmPasswordValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
    return null; // Retorna null se os controles não existirem
  }

  const password = passwordControl.value;
  const confirmPassword = confirmPasswordControl.value;

  if (password !== confirmPassword) {
    confirmPasswordControl.setErrors({ notSame: true }); // Define o erro no controle
    return { notSame: true }; // Retorna o erro no nível do grupo, se necessário
  } else {
    confirmPasswordControl.setErrors(null); // Remove o erro se as senhas coincidirem
  }

  return null; // Retorna null, pois o erro foi tratado no controle
};
