const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
    // const value = key.dataset.key;
    //How is value variable accessible in the callback function? Because of closures. Closures help function remember context.


    //The CALLBACK is registered to each of the elements. When they will be clicked, this method will be called.   
    key.addEventListener('click', () => {
        const value = key.dataset.key;

        if (value == "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if (value == "backspace") {

            input = input.slice(0, -1);
            display_input.innerHTML = cleanInput(input);

        } else if (value == "=") {

            let result = eval(prepareInput(input));
            console.log(result, typeof result);
            display_output.innerHTML = cleanOutput(result);

        } else if (value == "brackets") {

            if (input.indexOf('(') == -1 ||
                input.indexOf('(') != -1 &&
                input.indexOf(')') != -1 &&
                input.lastIndexOf('(') < input.lastIndexOf(')')/*If the last bracket was closing bracket*/) {

                input = input + "(";

            } else if (input.indexOf('(') != -1 &&
                input.indexOf(')') == -1 ||
                input.indexOf('(') != -1 &&
                input.indexOf(')') != -1 &&
                input.lastIndexOf('(') > input.lastIndexOf(')')/*If the last bracket was opening bracket*/) {

                    input = input + ")";

            }
            display_input.innerHTML = cleanInput(input);

        } else {

            if(validateInput(value)){
                input = input + value;
                display_input.innerHTML = cleanInput(input);
            }

        }
    })
}

function cleanInput( input ){
    const inp_arr = input.split("");
    const inp_arr_length = inp_arr.length;

    for(let i = 0; i < inp_arr_length; i++){
        if(inp_arr[i] == '*'){

            inp_arr[i] = ' <span class="operator">x</span> '

        } else if(inp_arr[i] == '/'){

            inp_arr[i] = ` <span class="operator">÷</span> `

        } else if(inp_arr[i] == '+'){

            inp_arr[i] = ` <span class="operator">+</span> `

        } else if(inp_arr[i] == '-'){

            inp_arr[i] = ` <span class="operator">-</span> `

        } else if(inp_arr[i] == '('){

            inp_arr[i] = ` <span class="brackets">(</span> `

        } else if(inp_arr[i] == ')'){

            inp_arr[i] = ` <span class="brackets">)</span> `

        } else if(inp_arr[i] == '%'){

            inp_arr[i] = ` <span class="percent">%</span> `

        }
    }
    return inp_arr.join("");
}

function cleanOutput( output ){
    let output_string = output.toString();

    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];
    
    let output_arr = output_string.split("");
    if(output_arr.length > 3){
        for(i = output_arr.length - 3; i > 0; i -= 3){
            output_arr.splice(i, 0, ",");
        }
    }

    if(decimal){
        output_arr.push(".");
        output_arr.push(decimal);
    }

    return output_arr.join("");
}

function validateInput(value){
    let last_input = input.slice(-1);
    let operators = ["+", "-", "/", "*"];
    
    if(operators.includes(value)){
        if(operators.includes(last_input)){
            return false;
        }else{
            return true;
        }
    }
    if(value == "." && last_input == "."){
        return false;
    }
    return true;
}

function prepareInput( input ){
    let input_arr = input.split("");
    for(i = 0; i < input_arr.length; i++){
        if(input_arr[i] == "%"){
            input_arr[i] = "/100";
        }
    }
    return input_arr.join("");
}

