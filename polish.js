const  readLine = require("readline").createInterface({
	input  : process.stdin,
	output : process.stdout
    });		
function start(){
    readLine.question("1.To exit please press Q." + "\n" + "2.What do u want to calculate? : ", expression =>{
	if(!bracesCheck(tokenization(expression)) || !checkOperator(tokenization(expression))){
	    console.log("Ops, something went wrong, please check your expression and try again.");
	}else{
	    console.log(calculate(toPolish(tokenization(expression))));
	}
	if(expression == "Q"){
    	    readLine.close();
	}else{
	    start();
	}
    });
}
function calculate(array){
	let stack = []
	for(let i = 0; i< array.length; i++){
		if(!isNaN(array[i])){
			stack.push(array[i]);
		}else{
			stack.push(calculateTwoElements(stack.pop(), stack.pop(), array[i]));
		}
	}
	return stack[0];
}
function calculateTwoElements(first, second, operand){
	if(operand == "-"){

		return first - second;
	}else if(operand == "+"){
		return Number(first) + Number(second);
	}else if(operand == "*"){
		return first * second;
	}else if(operand == "/"){
		return first / second;
	}
}

function tokenization (str){
    let temp = [];
    let numToRemember = '';
    str.split('').forEach(element => {
	if(!isNaN(element)){
	    numToRemember += element;
	}else if(toCheckOnOperator(element) || element == '(' || element == ')'){
	    if(numToRemember.length != 0){
		    temp.push(numToRemember);
		}
	    temp.push(element);
	    numToRemember = '';
	}
});
    return temp.concat(numToRemember);
}

function toCheckPriority(str){
    return str == '+' || str == '-'|| str == '(' ? 0 : 1;
}

function toPolish(array){
    let stack = [];
    let arrayToReturn = [];
    for(let i = 0; i < array.length; i++){
	if(!isNaN(array[i])){
	    arrayToReturn.push(array[i]);
	}else if(array[i] == ')'){
	    while(stack[stack.length -1] != "(" ){
		arrayToReturn.push(stack.pop());
	    };
	    stack.pop();
	}else if(array[i] == '+' ||array[i] == '-'){
	    stack.push(array[i]);
	}else if(array[i] == '/' ||array[i] == '*'){
	    if(toCheckPriority(stack[stack.length - 1]) > toCheckPriority(array[i])){
		while(stack[stack.length -1] == '(' || toCheckPriority(stack[stack.length - 1]) > toCheckPriority(array[i]) ){
		    arrayToReturn.push(stack.pop());
		}
	    }
		stack.push(array[i]);
	}else if(array[i] == '('){
	    stack.push(array[i]);
	}
    }
    return arrayToReturn.concat(stack);
}
function toCheckOnOperator(element){
    return element == '+' || element == '-' || element == '*' || element == '/';
}
function bracesCheck(str){
    let stack = [];
    str.forEach(element =>{
	if(element == "("){
	    stack.push(element);
	}else if(element == ")"){
	    stack.pop(element);
	}
});
    return stack.length == 0;
}
function checkOperator(str){
    let bool = true;
    for(let i = 0; i < str.length-2; i++){
	if(toCheckOnOperator(str[i])== true && toCheckOnOperator(str[i+1]) == true){
	    bool = false;
	    break;
	}else if(str[i+1] == ')' && toCheckOnOperator(str[i]) || str[i] == '(' && toCheckOnOperator(str[i+1]) || toCheckOnOperator(str[i-1]) &&  str[i] == '('){
	    bool = false;
	    break;
	}
    }
    return bool;
}
start();
