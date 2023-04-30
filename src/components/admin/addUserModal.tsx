import { CreateUserDto } from '@/types';
import {
    Box,
    Input,
    HStack,
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Select,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';

export const AddUserModal = ({
    isOpen,
    onClose,
    handleSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (values: CreateUserDto, actions: FormikHelpers<CreateUserDto>) => void;
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
            <Formik
                initialValues={{ email: '', name: '', password: '', role: 'user' }}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add User</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb='6'>
                                <Field
                                    name='name'
                                    validate={(value: string) => {
                                        if (!value) return 'Name is required';
                                    }}
                                >
                                    {({ form, field }: FieldProps) => (
                                        <HStack
                                            as={FormControl}
                                            mt={4}
                                            justifyContent='space-between'
                                            isInvalid={form.errors.name && form.touched.name}
                                        >
                                            <Text flexBasis='25%'>Name</Text>
                                            <Box flexBasis='75%'>
                                                <Input placeholder='Name' {...field} />
                                                <FormErrorMessage>
                                                    {form.errors.name as string}
                                                </FormErrorMessage>
                                            </Box>
                                        </HStack>
                                    )}
                                </Field>
                                <Field
                                    name='email'
                                    validate={(value: string) => {
                                        if (!value) return 'Email is required';
                                    }}
                                >
                                    {({ form, field }: FieldProps) => (
                                        <HStack
                                            mt={4}
                                            justifyContent='space-between'
                                            as={FormControl}
                                            isInvalid={form.errors.email && form.touched.email}
                                        >
                                            <Text flexBasis='25%'>Email</Text>
                                            <Box flexBasis='75%'>
                                                <Input
                                                    {...field}
                                                    placeholder='Email'
                                                    type='email'
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.email as string}
                                                </FormErrorMessage>
                                            </Box>
                                        </HStack>
                                    )}
                                </Field>

                                <Field
                                    name='password'
                                    validate={(value: string) => {
                                        if (!value) return 'Password is required';
                                        if (value.length < 6)
                                            return 'Password must be 6 characters long';
                                    }}
                                >
                                    {({ form, field }: FieldProps) => (
                                        <HStack
                                            mt={4}
                                            justifyContent='space-between'
                                            as={FormControl}
                                            isInvalid={
                                                form.errors.password && form.touched.password
                                            }
                                        >
                                            <Text flexBasis='25%'>Password</Text>
                                            <Box flexBasis='75%'>
                                                <Input placeholder='Password' {...field} />
                                                <FormErrorMessage>
                                                    {form.errors.password as string}
                                                </FormErrorMessage>
                                            </Box>
                                        </HStack>
                                    )}
                                </Field>
                                <Field name='role'>
                                    {({ form, field }: FieldProps) => (
                                        <HStack
                                            mt={4}
                                            justifyContent='space-between'
                                            as={FormControl}
                                            isInvalid={form.errors.role && form.touched.role}
                                        >
                                            <Text flexBasis='25%'>Role</Text>
                                            <Box flexBasis='75%'>
                                                <Select {...field}>
                                                    <option value='user'>User</option>
                                                    <option value='admin'>Admin</option>
                                                </Select>
                                                <FormErrorMessage>
                                                    {form.errors.role as string}
                                                </FormErrorMessage>
                                            </Box>
                                        </HStack>
                                    )}
                                </Field>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme='green'
                                    variant='solid'
                                    isLoading={props.isSubmitting}
                                    width='full'
                                    type='submit'
                                >
                                    Add
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
