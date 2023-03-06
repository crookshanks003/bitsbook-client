import { CreateClubDto } from '@/types';
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
    FormControl,
    FormErrorMessage,
    Textarea,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';

export const AddClubModal = ({
    isOpen,
    onClose,
    handleSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (values: CreateClubDto, actions: FormikHelpers<CreateClubDto>) => void;
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
            <Formik
                initialValues={{ name: '', userName: '', password: '', description: '' }}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add Club</ModalHeader>
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
                                    name='userName'
                                    validate={(value: string) => {
                                        if (!value) return 'Username is required';
                                        if (value.length < 3)
                                            return 'Username must be atleast 3 characters long';
                                    }}
                                >
                                    {({ form, field }: FieldProps) => (
                                        <HStack
                                            mt={4}
                                            justifyContent='space-between'
                                            as={FormControl}
                                            isInvalid={
                                                form.errors.userName && form.touched.userName
                                            }
                                        >
                                            <Text flexBasis='25%'>Username</Text>
                                            <Box flexBasis='75%'>
                                                <Input {...field} placeholder='Username' />
                                                <FormErrorMessage>
                                                    {form.errors.userName as string}
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
                                <Field
                                    name='description'
                                    validate={(value: string) => {
                                        if (!value) return 'Description is required';
                                        if (value.length > 255) return 'Exceeds 255 characters';
                                    }}
                                >
                                    {({ form, field }: FieldProps) => (
                                        <HStack
                                            mt={4}
                                            justifyContent='space-between'
                                            as={FormControl}
                                            isInvalid={
                                                form.errors.description && form.touched.description
                                            }
                                        >
                                            <Text flexBasis='25%'>Description</Text>
                                            <Box flexBasis='75%'>
                                                <Textarea {...field} />
                                                <FormErrorMessage>
                                                    {form.errors.description as string}
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
