import { useDisclosure } from '@mantine/hooks'
import { AddStudentDto, addStudentSchema } from './students.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notification, queryClient } from '../../lib'
import { Button, Modal, TextInput } from '@mantine/core'
import { CiCirclePlus } from 'react-icons/ci'
import { useAddStudent } from './api/add-student'

export const StudentForm = () => {
  const [opened, { open, close }] = useDisclosure()

  const { mutate: addStudent, isPending } = useAddStudent()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddStudentDto>({
    resolver: zodResolver(addStudentSchema),
  })

  const onSubmit = handleSubmit((data) => {
    addStudent(data, {
      onSuccess: () => {
        notification.success({ message: 'Student added successfully' })
        onCancel()
      },
      onError: (error) => {
        notification.error({
          message: error.message || 'Something went wrong',
          error,
        })
      },
    })
  })

  const onCancel = () => {
    close()
    reset()
    queryClient.invalidateQueries({ queryKey: ['students'] })
  }

  return (
    <>
      <Button
        leftSection={<CiCirclePlus className="w-5 h-5 text-black" />}
        onClick={() => open()}
        className="cursor-pointer"
      >
        Add Student
      </Button>

      <Modal
        opened={opened}
        onClose={onCancel}
        title="Add Student"
        centered
        size="lg"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextInput
            label="Name"
            {...register('name')}
            error={errors?.name?.message}
          />

          <TextInput
            label="Email"
            {...register('email')}
            error={errors?.email?.message}
          />

          <TextInput
            label="Password"
            type="password"
            {...register('password')}
            error={errors?.password?.message}
          />

          <div className="flex justify-end">
            <Button variant="outline" onClick={onCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
