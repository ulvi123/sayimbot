import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email", { required: true })} type="email" className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input {...register("password", { required: true })} type="password" className="w-full p-2 border rounded" />
          {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
