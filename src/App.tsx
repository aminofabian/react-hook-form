import { ZodType, z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


function App() {
  type formData = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
  };
  const schema: ZodType<formData> = z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    email: z.string().email(),
    age: z.number().min(18).max(79),
    password: z.string().min(5).max(15),
    confirmPassword: z.string().min(5).max(15)
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm<formData>({ resolver: zodResolver(schema) });
  const submitData = (data: formData) => {
    console.log("It Worked", data)
    
  }
  
  
  return (
    <>
    <div className="App w-4xl h-screen flex justify-center">
    <form className="form flex flex-col justify-center" onSubmit={handleSubmit(submitData)}>
    <label className='form-label'>First Name: </label>
    <input type='text' className="input" {...register('firstName')}></input>
    {errors.firstName && <span className="error">{errors.firstName.message}</span>}
    
    <label className='form-label'>Last Name: </label>
    <input type='text' className="input" {...register('lastName')}></input>
    {errors.lastName && <span className="error">{errors.lasttName.message}</span>}
    
    
    <label className='form-label'>Email: </label>
    <input type='email' className="input" {...register('email')}></input>
    {errors.email && <span className="error">{errors.email.message}</span>}
    
    
    <label className='form-label'>Age: </label>
    <input type='number' className="input" {...register('age', { valueAsNumber: true })}></input>
    {errors.age && <span className="error">{errors.age.message}</span>}
    
    
    <label className='form-label'>Password: </label>
    <input type='password' className="input" {...register('password')}></input>
    {errors.password && <span className="error">{errors.password.message}</span>}
    
    
    <label className='form-label'>Confirm Password: </label>
    <input type='password' className="input" {...register('confirmPassword')}></input>  
    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
    
    
    <input type='submit' value='Submit'></input>
    </form>
    </div>
    
    </>
    )
  }
  
  export default App
  