import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
 
export const samePasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
 
    const password = control.get('password');
    const password_confirmation = control.get('password_confirmation');
 
    // // Set the error in the specific control
    // if ((password != null || password_confirmation) && password?.value !== password_confirmation?.value) {
    //     password_confirmation?.setErrors({
    //         differentPasswords: false,
    //         msg: 'The passwords must be the same'
    //     })
    // }

    // Set the error in the global form
    return ( (password != null || password_confirmation) && password?.value !== password_confirmation?.value) ? {
        differentPasswords: true,
        msg: 'The passwords must be the sames'
    } : null;
}