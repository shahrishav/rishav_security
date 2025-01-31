//importing
import { render, fireEvent, waitFor,screen } from "@testing-library/react";
import Login from "./Login"; //Component to be tested
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";

//Mocking API js (No sending request to real backend)
jest.mock("../../apis/Api")

//Making test case
describe('Login Component Test' , () => {

    //Clear all the mock data
    afterEach(() => {
        jest.clearAllMocks();
    })

    //Defining test 1
    it ('Should show error message on failed login', async () => {
        //remdering Login Components
        render(<Login/>) //Built Screen

        // Mocking login fail response
        const mockResponse = {
            data: {
                'success' : false,
                'message' : 'Password not matched!'
            }
        }
        // config mock resolved value
        loginUserApi.mockResolvedValue(mockResponse)

        // Config that toast error message as a test function
        toast.error = jest.fn()

        // Testing real UI Components
        // 1. Finding email, password and Login button
        const email = screen.findAllByPlaceholderText('Enter your email')
        const password = screen.findAllByPlaceholderText('Enter your password')
        const loginBtn = screen.findByText('Login')

        // 2. Simulating the email, password and login
        fireEvent.change(email, {target: {value: "test@gmail.com"}})
        fireEvent.change(password, {target: {value: "test123"}})
        fireEvent.click(loginBtn)

        // We have done all setup above
        waitFor(() => {
            expect(loginUserApi).toHaveBeenCalledWith({
                email: "test@gmail.com",
                password: "test123"
            })
        })
    })
})