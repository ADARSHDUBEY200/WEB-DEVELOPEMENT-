import  {render,screen}from "@testing-library/react"
import App from "./App"

test('NOW WE ARE GOING TO TEST THE APP COMPONENT ', () => { 
    render(<App/>);
    const element = screen.getByText(/ADARSH/i);
    expect(element).toBeInTheDocument();

 })

 test('CHECK IS THERE ARE THE INPUT BOX OR NOT ', () => { 
    render(<App/>);
    let InputBox = screen.getByRole("textbox");
    let checkPlaceholder = screen.getByPlaceholderText("ENTER THE NAME IN THE INPUT BOX");
    expect(InputBox).toBeInTheDocument();
    expect(checkPlaceholder).toBeInTheDocument();
    expect(InputBox).toHaveAttribute("name", "username");
    expect(InputBox).toHaveAttribute("id","userId");
    expect(InputBox).toHaveAttribute("type", "text");
    


 })