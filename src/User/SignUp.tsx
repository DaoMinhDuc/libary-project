import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, number, string, ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';

interface Profile {
  name: string;
  age: number | undefined;
  gender: 'male' | 'female' | 'other' | null;
  username: string;
  password: string;
  address: string;
}

const schema: ObjectSchema<Profile> = object({
  name: string().required('Vui lòng nhập tên.'),
  age: number()
    .optional()
    .integer('Tuổi phải là số nguyên.')
    .positive('Tuổi phải là số dương.')
    .min(1, 'Tuổi phải lớn hơn hoặc bằng 1.')
    .max(100, 'Tuổi phải nhỏ hơn hoặc bằng 100.'),
  gender: string<'male' | 'female' | 'other'>()
    .nullable()
    .required('Vui lòng chọn giới tính.'),
  username: string()
    .required('Vui lòng nhập tên đăng nhập.')
    .min(10, 'Tên đăng nhập phải có ít nhất 10 ký tự.'),
  password: string()
    .required('Vui lòng nhập mật khẩu.')
    .min(10, 'Mật khẩu phải có ít nhất 10 ký tự.'),
  address: string().required('Vui lòng nhập địa chỉ.'),
});

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Profile>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Profile> = (data) => {
     axios.post('https://6477745a9233e82dd53bb1e7.mockapi.io/UserAccount', data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <>
    
    <Box
  component="form"
  className="form-signup"
  noValidate
  autoComplete="off"
  onSubmit={handleSubmit(onSubmit)}
>
  <h1>Đăng kí thành viên</h1>

  <div className="form-group">
    <TextField
      required
      label="Tên"
      {...register('name')}
    />
    {errors.name && <p>{errors.name.message}</p>}
  </div>

  <div className="form-group">
    <TextField
      required
      type="number"
      label="Tuổi"
      {...register('age')}
    />
    {errors.age && <p>{errors.age.message}</p>}
  </div>

  <div className="form-group">
    <TextField
      select
      label="Giới tính"
      {...register('gender')}
    >
      <option value="female">Nữ</option>
      <option value="male">Nam</option>
      <option value="other">Khác</option>
    </TextField>
    {errors.gender && <p>{errors.gender.message}</p>}
  </div>

  <div className="form-group">
    <TextField
      label="Địa chỉ"
      {...register('address')}
    />
    {errors.address && <p>{errors.address.message}</p>}
  </div>

  <div className="form-group">
    <TextField
      label="Tên đăng nhập"
      {...register('username')}
    />
    {errors.username && <p>{errors.username.message}</p>}
  </div>

  <div className="form-group">
    <TextField
      type="password"
      label="Mật khẩu"
      {...register('password')}
    />
    {errors.password && <p>{errors.password.message}</p>}
  </div>

  <Link to="/login">
    <Button className="SignUp" type="submit">Đăng kí</Button>
  </Link>
</Box>

    </>
  );
};

export default SignUp;
