import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from 'react-toastify';
import { registerUserApi } from "../../apis/Api";
import RegisterPopup from "./Registerpage";


// import browser router
import { BrowserRouter } from "react-router-dom";

// Mock API js (No sending request to real backend)
jest.mock('../../apis/Api');

// Making test case
describe('Register Component Tes', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('Should show error message on failed register', async () => {
        // rendering Rgister Components
        render(<BrowserRouter>
            <RegisterPopup />
        </BrowserRouter>) //Built Screen

        // Mocking login fail response 
        const mockResponse = {
            data: {
                'success': false,
                'message': 'User already exists!'
            }
        }

        //Config mock resolved value 
        registerUserApi.mockResolvedValue(mockResponse)

        // Config that toast error message as a test function
        toast.error = jest.fn()

        // Testing real UI Components
        // 1. Finding email, password and Login button
        const fullName = await screen.getByPlaceholderText('Enter your full name')
        const phone = await screen.getByPlaceholderText('Enter your phone number')
        const email = await screen.getByPlaceholderText('Enter your email')
        const password = await screen.getByPlaceholderText('Enter your password')
        const confirmpassword = await screen.getByPlaceholderText('Confirm your password')
        const registerbtn = screen.getByText('Register')

        // 2.Simulating the email, password and login
        fireEvent.change(fullName, { target: { value: "test" } })
        fireEvent.change(phone, { target: { value: 1234567890 } })
        fireEvent.change(email, { target: { value: "test@gmail.com" } })
        fireEvent.change(password, { target: { value: "test123" } })
        fireEvent.change(confirmpassword, { target: { value: "test123" } })
        fireEvent.click(registerbtn)

        // We have done all setup above
        waitFor(() => {
            expect(registerUserApi).toHaveBeenCalledWith({
                fullName: 'test',
                phone: 1234567890,
                email: "test@gmail.com",
                password: "test123",
                confirmpassword: "test123"
            })
        })


    })

})