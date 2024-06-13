import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Formik, Field, Form } from 'formik';
import toast from "react-hot-toast";
import { BsTwitter } from 'react-icons/bs';
import { registerReq } from '../api/users';

import Loader from '../components/Loader';

const Register = () => {
    const navigate = useNavigate();

    const registerMutation = useMutation({
      mutationFn: registerReq,
      onSuccess: () => {
        navigate("/");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });

    if (registerMutation.isLoading) return <Loader />

    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className='m-5 p-10 bg-grey-3'>
          <div className="w-[300px]  max-w-md space-y-8 md:w-[400px] lg:w-[400px]">
            <div >
              <BsTwitter className="mx-auto text-sky-500 h-12 w-12" />
              <h2 className="mt-6 text-center text-3xl text-grey">
                Join Twitter today
              </h2>
            </div>
            <Formik
              initialValues={{
                email: '',
                name: '',
                username: '',
                password: '',
              }}
              onSubmit={(values) => {
                registerMutation.mutate(values)
              }}
            >
              <Form>
                <Field id='email' name='email' placeholder='Email' className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800" />
                <Field id='name' name='name' placeholder='Name' className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800" />
                <Field id='username' name='username' placeholder='Username' className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800" />
                <Field type='password' id='password' name='password' placeholder='*******'className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800" />
                <button type='submit' className="bg-sky-400 my-2 w-full hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
                  Sign up
                </button>
              </Form>
            </Formik>
  
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to={'/login'}>
                  Already have an account?
                  <span className='hover:text-sky-500 ml-2 transition-colors'>
                    Sign in
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;