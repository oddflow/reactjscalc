import React from 'react';
import './Main.css';

export default function Main() {
    const [input, setInput] = React.useState("0");
    const [firstValue, setFirstValue] = React.useState("");
    const [operator, setOperator] = React.useState("");
    

    function clear() {
        setInput("0");
        setFirstValue("");
        setOperator("");
    }

    function click(value) {
        // Check if 0 is default, if so remove 0 before appending numbers
        if(input === "0"){
            setInput("");
        }

        setInput((prevVal) => {
            // Check to not keep appending decimals
            if(value === "."){
                if(input.includes(".")){
                    return prevVal;
                }
            }

            // Update operator if operator button is pressed
            if(["+", "-", "*", "/"].includes(value)){
                setFirstValue(input);
                setOperator(value);
                setInput("");
            }

            if(input.length > 8){
                return input
            }

            return prevVal + value;
        });
    }


    // Use this instead of eval as was getting error for being unsafe
    function evaluate(expression) { 
        try{
            return new Function(`return ${expression}`)();
        }
        catch {
            return "Error";
        }
    }

    function equals() {
        try{
            const result = evaluate(`${firstValue}${operator}${input}`)
            // Check for length of input is less than 9 chars
            if(result.toString().length > 8){
                setInput("Exceed")
            }else{
                setInput(result.toString()); // convert the above result back to a string
                setOperator("")
                setFirstValue("")
            }
        }
        catch{
            setInput("Error");
        }
    }

    return (
        <>
            <div className="main">
            <p>My ReactJS Calculator</p>
                <div className="calculator">
                    <div className="display">
                        <input value={input} maxLength="9" readOnly/>
                    </div>
                    <div className="buttons">

                        <button onClick={() => click("7")}>7</button>
                        <button onClick={() => click("8")}>8</button>
                        <button onClick={() => click("9")}>9</button>
                        <button className="operator" onClick={() => click("/")}>/</button>

                        <button onClick={() => click("4")}>4</button>
                        <button onClick={() => click("5")}>5</button>
                        <button onClick={() => click("6")}>6</button>
                        <button className="operator" onClick={() => click("*")}>*</button>

                        <button onClick={() => click("1")}>1</button>
                        <button onClick={() => click("2")}>2</button>
                        <button onClick={() => click("3")}>3</button>
                        <button className="operator" onClick={() => click("+")}>+</button>

                        <button onClick={() => click(".")}>.</button>
                        <button onClick={() => click("0")}>0</button>
                        <button className="clear" onClick={clear}>C</button>
                        <button className="operator" onClick={() => click("-")}>-</button>

                        <button className="equals" onClick={equals}>=</button>

                    </div>
                </div>
            </div>
        </>
    )
}