import { Button, Card, LoadingOverlay, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate, useNavigate } from 'react-router-dom'
import { LoginDto, loginSchema } from './login.schema'
import { useAuth } from '../../providers'
import { notification } from '../../lib'

export const Login = () => {
  const { onLogin, user, isLoadingUser } = useAuth()
  const navigate = useNavigate()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit((data) => {
    onLogin(data.email, data.password)
      .then(() => navigate('/'))
      .catch((err) =>
        notification.error({ message: err?.message || 'Not Authorized!' })
      )
  })

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoadingOverlay
        visible={isLoadingUser}
        loaderProps={{ type: 'bars' }}
        bg="black"
      />

      {user && !isLoadingUser && <Navigate to="/" />}

      <Card withBorder radius="md" shadow="sm" className="w-[550px]">
        <Card.Section className="flex flex-col items-center p-6">
          <h2 className="text-3xl font-semibold">UHive Admin</h2>
        </Card.Section>

        <Card.Section className="p-6">
          <form onSubmit={onSubmit}>
            <TextInput
              label="Email"
              {...register('email')}
              error={errors.email?.message}
            />

            <TextInput
              label="Password"
              type="password"
              className="my-4"
              {...register('password')}
              error={errors.password?.message}
            />

            <Button fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Card.Section>
      </Card>
    </div>
  )
}
